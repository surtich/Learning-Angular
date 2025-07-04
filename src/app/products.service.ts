import { inject, Injectable, Signal, signal } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';
import { Product } from './product';
import { APP_SETTINGS } from './app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = inject(APP_SETTINGS).apiUrl + '/products';
  private products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  getProducts(): Signal<Product[]> {
    const options = {
      params: new HttpParams().set('limit', 10),
    };
    this.http
      .get<Product[]>(this.productsUrl, options)
      .subscribe((products) => this.products.set(products));

    return this.products.asReadonly();
  }

  getProduct(id: number): Product {
    return this.products().find((p) => p.id === id)!;
  }

  addProduct(newProduct: Partial<Product>): Promise<Product> {
    return firstValueFrom(
      this.http.post<Product>(this.productsUrl, newProduct).pipe(
        tap((product) => {
          this.products.update((current) => [...current, product]);
        }),
      ),
    );
  }

  updateProduct(id: number, price: number): Promise<Product> {
    return firstValueFrom(
      this.http.patch<Product>(`${this.productsUrl}/${id}`, { price }),
    ).then((product) => {
      this.products.update((current) => {
        const index = current.findIndex((p) => p.id === id);
        product = { ...current[index], ...product };
        return [
          ...current.slice(0, index),
          product,
          ...current.slice(index + 1),
        ];
      });
      return product;
    });
  }

  deleteProduct(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.productsUrl}/${id}`),
    ).then(() => {
      this.products.update((current) =>
        current.filter((product) => product.id !== id),
      );
    });
  }
}

import { inject, Injectable } from '@angular/core';
import { concatMap, delay, from, map, Observable, of } from 'rxjs';
import { Product } from './product';
import { APP_SETTINGS } from './app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = inject(APP_SETTINGS).apiUrl + '/products';
  private products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    const options = new HttpParams().set('limit', 10);
    return this.http
      .get<Product[]>(this.productsUrl, {
        params: options,
      })
      .pipe(
        map((products) => {
          this.products = products;
          return products;
        }),
      );
  }

  getProduct(id: number): Observable<Product> {
    // En una API real, usaríamos una caché. Si el producto no ha sido recuperado, haríamos un GET
    const product = this.products.find((p) => p.id === id);
    return of(product!);
  }

  addProduct(newProduct: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, newProduct).pipe(
      map((product) => {
        this.products.push(product);
        return product;
      }),
    );
  }
}

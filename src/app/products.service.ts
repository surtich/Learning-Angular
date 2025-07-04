import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  delay,
  first,
  from,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { Product } from './product';
import { APP_SETTINGS } from './app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = inject(APP_SETTINGS).apiUrl + '/products';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    const options = new HttpParams().set('limit', 10);
    this.http
      .get<Product[]>(this.productsUrl, {
        params: options,
      })
      .subscribe((products) => this.productsSubject.next(products));

    return this.productsSubject.asObservable();
  }

  getProduct(id: number): Observable<Product> {
    return this.productsSubject.asObservable().pipe(
      map((products) => products.find((p) => p.id === id)!),
    );
  }

  addProduct(newProduct: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, newProduct).pipe(
      tap((product) => {
        const currentProducts = this.productsSubject.value;
        const updatedProducts = [...currentProducts, product];
        this.productsSubject.next(updatedProducts);
      }),
      map((product) => {
        return product;
      }),
    );
  }

  updateProduct(id: number, price: number): Observable<Product> {
    const currentProducts = this.productsSubject.value;
    const productIndex = currentProducts.findIndex((p) => p.id === id);

    // Crear el producto actualizado
    const updatedProduct: Product = {
      ...currentProducts[productIndex],
      price,
    };

    // Crear un nuevo array con el producto actualizado
    const updatedProducts = [
      ...currentProducts.slice(0, productIndex),
      updatedProduct,
      ...currentProducts.slice(productIndex + 1),
    ];

    // Emitir el nuevo array
    this.productsSubject.next(updatedProducts);

    // Retornar el producto actualizado como observable
    return of(updatedProduct);
  }

  deleteProduct(id: number): Observable<void> {
    const currentProducts = this.productsSubject.value;
    const productIndex = currentProducts.findIndex((p) => p.id === id);

    // Crear un nuevo array sin el producto eliminado
    const updatedProducts = [
      ...currentProducts.slice(0, productIndex),
      ...currentProducts.slice(productIndex + 1),
    ];

    // Emitir el nuevo array
    this.productsSubject.next(updatedProducts);

    // Retornar un observable que emite void
    return of(void 0);
  }
}

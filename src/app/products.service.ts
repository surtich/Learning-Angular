import { inject, Injectable } from '@angular/core';
import { concatMap, delay, from, Observable, of } from 'rxjs';
import { Product } from './product';
import { APP_SETTINGS } from './app.settings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = inject(APP_SETTINGS).apiUrl + '/products';
  
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }
}

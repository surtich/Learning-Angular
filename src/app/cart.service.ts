import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, defer, tap } from 'rxjs';
import { Cart } from './cart';
import { APP_SETTINGS } from './app.settings';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Cart | undefined;
  private cartUrl = inject(APP_SETTINGS).apiUrl + '/carts';

  constructor(private http: HttpClient) {}

  addProduct(id: number): Observable<Cart> {
    const cartProduct = { productId: id, quantity: 1 };

    /*
    El operador `defer` funciona como una declaración `if/else` para los observables.
    Permite crear el observable a partir de una condición.
    Si la propiedad `cart` no ha sido inicializada, lo que significa que nuestro carrito
    está actualmente vacío, se inicia una solicitud POST a la API pasando
    la variable `cartProduct` como parámetro.
    De lo contrario, se inicia una solicitud PUT pasando el
    `cartProduct` junto con los productos existentes del carrito.
    */
    return defer(() =>
      !this.cart
        ? this.http.post<Cart>(this.cartUrl, { products: [cartProduct] })
        : this.http.put<Cart>(`${this.cartUrl}/${this.cart.id}`, {
            products: [...this.cart.products, cartProduct],
          }),
    ).pipe(tap((cart) => (this.cart = cart)));
  }
}

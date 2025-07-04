import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { authGuard } from './auth.guard';
import { checkoutGuard } from './checkout.guard';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  /*
  Cuando intentas acceder al carrito de compra desde la lista de productos sin autentificación,
  siempre permaneces en la misma página. Esto se debe a que la redirección que ocurre debido al
`guard` de autenticación no tiene ningún efecto cuando ya estás en la ruta redirigida.
*/
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
    /*
    La propiedad `canDeactivate` es un `array` porque múltiples `guards` pueden controlar la desactivación de rutas.
El orden de los `guards` en el `array` es importante. Si uno de los `guards` no pasa,
Angular evitará que el usuario abandone la ruta.
*/
    canDeactivate: [
      () =>
        confirm(
          'You have pending items in your cart. Do you want to continue?',
        ),
    ],
  },
  { path: 'products/new', component: ProductCreateComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  // le decimos al router que redirija a la ruta `products` cuando la aplicación navegue a la ruta por defecto.
  // Una ruta con una cadena de ruta vacía es la ruta por defecto de la aplicación Angular.
  // La propiedad `pathMatch` le dice al router cómo hacer coincidir la URL con la propiedad de ruta raíz. En este caso, el router redirige a la ruta `products` solo cuando la URL coincide con la ruta raíz, que es la cadena vacía.
  // Añadimos la ruta por defecto después de todas las demás rutas porque el orden de las rutas es importante. El router selecciona las rutas con una estrategia de "la primera que coincide, gana". Las rutas más específicas deben definirse antes que las menos específicas.
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  // La ruta comodín debe ser la última entrada en la lista de rutas porque la aplicación solo debe alcanzarla si no hay rutas coincidentes.
  { path: '**', redirectTo: 'products' },
];

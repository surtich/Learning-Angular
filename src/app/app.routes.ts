import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products/new', component: ProductCreateComponent },
  // le decimos al router que redirija a la ruta `products` cuando la aplicación navegue a la ruta por defecto.
  // Una ruta con una cadena de ruta vacía es la ruta por defecto de la aplicación Angular.
  // La propiedad `pathMatch` le dice al router cómo hacer coincidir la URL con la propiedad de ruta raíz. En este caso, el router redirige a la ruta `products` solo cuando la URL coincide con la ruta raíz, que es la cadena vacía.
  // Añadimos la ruta por defecto después de todas las demás rutas porque el orden de las rutas es importante. El router selecciona las rutas con una estrategia de "la primera que coincide, gana". Las rutas más específicas deben definirse antes que las menos específicas.
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  // La ruta comodín debe ser la última entrada en la lista de rutas porque la aplicación solo debe alcanzarla si no hay rutas coincidentes.
  { path: '**', redirectTo: 'products' },
];

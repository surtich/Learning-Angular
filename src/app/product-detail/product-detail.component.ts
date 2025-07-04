import { CommonModule } from '@angular/common';
import { Component, OnInit, output } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  added = output();
  deleted = output();

  constructor(
    private productService: ProductsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  /*
  Cuando seleccionamos un producto de la lista, el componente de lista de productos
  se elimina del árbol DOM y se añade el componente de detalles del producto.
  Para elegir un producto diferente, necesitamos hacer clic en el enlace de Productos
  o en el botón de retroceso de nuestro navegador.
  Consecuentemente, el componente de detalles del producto es reemplazado por el componente
  de lista de productos en el DOM.
  Así, nos encontramos en una situación en la que solo se muestra un componente en la pantalla
  en un momento dado.

  Cuando el componente de detalles del producto se destruye,
  también lo hacen su método `ngOnInit` y la suscripción al observable `paramMap`.
  Por lo tanto, no nos beneficiamos del uso de observables en este punto.
  Alternativamente, podríamos usar la propiedad `snapshot` del servicio `ActivatedRoute`
  para obtener valores para los parámetros de ruta, de la siguiente manera:
  */
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.product = this.productService.getProduct(Number(id));
  }

  addToCart() {
    // Esto lo dejamos para el capítulo 10
  }

  async changePrice(product: Product, price: string) {
    this.product = await this.productService.updateProduct(
      product.id,
      Number(price),
    );
    this.router.navigate(['/products']);
  }

  async remove(product: Product) {
    await this.productService.deleteProduct(product.id);
    this.router.navigate(['/products']);
  }
}

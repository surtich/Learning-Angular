import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent {
  productForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
    }),
    category: new FormControl('', { nonNullable: true }),
  });

  constructor(
    private productsService: ProductsService,
    private router: Router,
  ) {}

  createProduct() {
    /*
    La propiedad `this.productForm.value` no incluye valores de campos deshabilitados de un formulario.
    En su lugar, se puede utilizar el método `getRawValue` para devolver valores de todos los campos.
    */
    this.productsService.addProduct(this.productForm.value).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent implements OnInit {
  productForm:
    | FormGroup<{
        title: FormControl<string>;
        price: FormControl<number | undefined>;
        category: FormControl<string>;
      }>
    | undefined;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private builder: FormBuilder,
  ) {}

  private buildForm() {
    /*
    Se utiliza la propiedad `nonNullable` de la clase `FormBuilder` para crear un grupo de formulario que no puede ser nulo.
      El método `group` se utiliza para agrupar controles de formulario.
      Los controles de formulario `title` y `category` se crean usando una cadena vacía como valor predeterminado.
      El control de formulario `price` sigue un enfoque diferente al resto porque no se puede asignar un valor predeterminado de `undefined` debido a las limitaciones del lenguaje TypeScript.
      En este caso, se utiliza el método `control` de la propiedad `nonNullable` para definir el control de formulario.
    */
    this.productForm = this.builder.nonNullable.group({
      title: [''],
      price: this.builder.nonNullable.control<number | undefined>(undefined),
      category: [''],
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  createProduct() {
    /*
    La propiedad `this.productForm.value` no incluye valores de campos deshabilitados de un formulario.
    En su lugar, se puede utilizar el método `getRawValue` para devolver valores de todos los campos.
    */
    this.productsService.addProduct(this.productForm!.value).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}

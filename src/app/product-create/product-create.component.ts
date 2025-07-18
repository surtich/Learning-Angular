import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { priceMaximumValidator } from '../price-maximum.validator';
import { Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-product-create',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  productForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        priceMaximumValidator(1000),
      ],
    }),
    category: new FormControl('', { nonNullable: true }),
  });

  categorySubscription: Subscription | undefined;

  constructor(
    private productsService: ProductsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categorySubscription =
      this.productForm.controls.category.valueChanges.subscribe(() => {
        this.productForm.controls.price.reset();
      });
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }

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

import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { Observable, switchMap } from 'rxjs';
import { ProductsService } from '../products.service';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    MatChip,
    MatChipSet,
    MatError,
    MatFormField,
    MatIconButton,
    MatInput,
    MatIcon,
    MatSnackBarModule,
    MatSuffix,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  id = input<number>();
  product$: Observable<Product> | undefined;
  price: number | undefined;

  constructor(
    private productService: ProductsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private snackbar: MatSnackBar,
  ) {}

  addToCart(id: number) {
    this.cartService.addProduct(id).subscribe(() => {
      this.snackbar.open('Product added to cart!', undefined, {
        duration: 1000,
      });
    });
  }

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.productService.getProduct(Number(params.get('id')));
      }),
    );
  }

  changePrice(product: Product) {
    this.productService
      .updateProduct(product.id, this.price!)
      .subscribe(() => this.router.navigate(['/products']));
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}

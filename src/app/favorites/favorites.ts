import { Component, Host, OnInit, Optional } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {
  products: Product[] = [];
  constructor(@Optional() @Host() private productService: ProductsService) {}
  ngOnInit(): void {
    this.products = this.productService ? this.productService.getProducts() : [];
  }
}

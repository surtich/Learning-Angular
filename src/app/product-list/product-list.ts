import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductDetail } from '../product-detail/product-detail';
import { SortPipe } from '../sort-pipe';
import { ProductsService } from '../products';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetail, SortPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  private productService: ProductsService;
  selectedProduct: Product | undefined;

  constructor() {
    this.productService = new ProductsService();
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  onAdded() {
    alert(`${this.selectedProduct?.title} added to the cart!`);
  }
}

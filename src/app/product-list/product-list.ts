import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductDetail } from '../product-detail/product-detail';
import { SortPipe } from '../sort-pipe';
import { ProductsService } from '../products';
import { Favorites } from '../favorites/favorites';
import { ProductView } from '../product-view/product-view';

@Component({
  selector: 'app-product-list',
  imports: [Favorites, ProductDetail, ProductView, SortPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  providers: [ProductsService],
})
export class ProductList implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | undefined;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  onAdded() {
    alert(`${this.selectedProduct?.title} added to the cart!`);
  }
}

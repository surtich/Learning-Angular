import { Component, OnInit, Signal } from '@angular/core';
import { Product } from '../product';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, RouterOutlet, SortPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Signal<Product[]> | undefined;
  selectedProduct: Product | undefined;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.products = this.productService.getProducts();
  }
}

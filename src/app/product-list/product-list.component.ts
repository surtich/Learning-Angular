import { Component, OnInit, Signal } from '@angular/core';
import { Product } from '../product';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, SortPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Signal<Product[]> | undefined;
  selectedProduct: Product | undefined;

  constructor(private productService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.route.queryParamMap.subscribe(params => {
      const limit = Number(params.get('limit'));
      this.products = this.productService.getProducts(limit);
    });
  }
}

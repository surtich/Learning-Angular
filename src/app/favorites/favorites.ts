import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-favorites',
  imports: [],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
  providers: [{ provide: ProductsService, useClass: FavoritesService }],
})
export class Favorites implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductsService) {}
  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
}

import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Product } from '../product';
import { SortPipe } from '../sort.pipe';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';

@Component({
  selector: 'app-product-list',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatCardModule,
    MatIcon,
    MatMiniFabButton,
    MatTableModule,
    RouterLink,
    SortPipe,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  columnNames = ['title', 'price']; // El nombre de cada columna coincide con una propiedad de la interfaz `Product`.

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.products$ = this.route.data.pipe(map((data) => data['products']));
  }
}

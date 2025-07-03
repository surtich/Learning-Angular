import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { CopyrightDirective } from './copyright';

@Component({
  selector: 'app-root',
  imports: [CopyrightDirective, RouterOutlet, ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'World';
}

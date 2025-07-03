import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { CopyrightDirective } from './copyright';
import { APP_SETTINGS, appSettings } from './app.settings';

@Component({
  selector: 'app-root',
  imports: [CopyrightDirective, RouterOutlet, ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [{ provide: APP_SETTINGS, useValue: appSettings }],
})
export class App {
  protected title = 'World';
  settings = inject(APP_SETTINGS);
}

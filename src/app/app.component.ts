import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CopyrightDirective } from './copyright.directive';
import { APP_SETTINGS, appSettings } from './app.settings';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductListComponent, CopyrightDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: APP_SETTINGS, useValue: appSettings }],
})
export class AppComponent {
  title = 'World';
  settings = inject(APP_SETTINGS);

  private onComplete() {
    return new Promise<void>((resolve) => {
      setInterval(() => {
        resolve();
      }, 2000);
    });
  }

  private setTitle = () => {
    const timestamp = new Date();
    this.title = `${this.settings.title} (${timestamp})`;
  };

  constructor() {
    this.onComplete().then(this.setTitle);
  }
}

import { ChangeDetectionStrategy, Component, computed, inject, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CopyrightDirective } from './copyright.directive';
import { APP_SETTINGS, appSettings } from './app.settings';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductListComponent, CopyrightDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: APP_SETTINGS, useValue: appSettings }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  settings = inject(APP_SETTINGS);
  title: Signal<string> = signal('');
  currentDate = signal(new Date());

  title$ = timer(2000, 2000);

  private setTitle = () => {
    this.currentDate.set(new Date());
  };

  constructor() {
    this.title$.subscribe(this.setTitle);
    this.title = computed(() => {
      return `${this.settings.title} (${this.currentDate()})`;
    });
  }
}

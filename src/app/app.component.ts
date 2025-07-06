import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CopyrightDirective } from './copyright.directive';
import { APP_SETTINGS } from './app.settings';
import { AuthComponent } from './auth/auth.component';
import { MatButton } from '@angular/material/button';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatBadge } from '@angular/material/badge';
import { CartService } from './cart.service';
import { FeaturedComponent } from './featured/featured.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [
    AuthComponent,
    CopyrightDirective,
    FeaturedComponent,
    MatBadge,
    MatButton,
    MatProgressSpinner,
    MatToolbar,
    MatToolbarRow,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = '';
  settings = inject(APP_SETTINGS);
  cartService = inject(CartService);
}

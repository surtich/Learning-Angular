import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CopyrightDirective } from './copyright.directive';
import { APP_SETTINGS } from './app.settings';
import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-root',
  imports: [
    AuthComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CopyrightDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = ''
  settings = inject(APP_SETTINGS);

  ngAfterViewInit(): void {
    // en la consola de desarrollador se muestra un error
    this.title = this.settings.title;
  }
}

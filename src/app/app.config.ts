import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { APP_SETTINGS, appSettings } from './app.settings';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { AppErrorHandler } from './app-error-handler';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    { provide: APP_SETTINGS, useValue: appSettings },
    /*
    El método `withFetch` se utiliza para configurar el cliente HTTP de Angular de modo
    que utilice la `fetch API` nativa para realizar solicitudes. Se recomienda
    habilitar `fetch` para las aplicaciones que utilizan SSR para un mejor rendimiento y
    compatibilidad.
    */
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    { provide: ErrorHandler, useClass: AppErrorHandler },
    provideClientHydration(withEventReplay()),
  ],
};

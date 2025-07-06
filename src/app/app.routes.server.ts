import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:id',
    // Esta ruta se renderiza en el servidor por ser dinámica. Da un error al ejecutar ng build si se prerenderiza
    renderMode: RenderMode.Server, // o RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
];

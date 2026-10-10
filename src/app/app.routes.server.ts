import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Los datos se guardan en localStorage (solo existe en el navegador),
 * por eso toda la app se renderiza en el cliente.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];

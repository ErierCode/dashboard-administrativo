import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'estudiantes/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'estudiantes/:id/editar',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

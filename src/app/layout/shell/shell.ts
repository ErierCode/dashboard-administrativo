import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  private readonly router = inject(Router);

  private readonly urlActual = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly titulo = computed(() => {
    const url = this.urlActual();

    if (url.includes('/estudiantes/nuevo')) {
      return 'Nuevo estudiante';
    }

    if (url.includes('/editar')) {
      return 'Editar estudiante';
    }

    if (/\/estudiantes\/[^/]+$/.test(url.split('?')[0])) {
      return 'Detalle del estudiante';
    }

    if (url.startsWith('/estudiantes')) {
      return 'Estudiantes';
    }

    return 'Inicio';
  });
}

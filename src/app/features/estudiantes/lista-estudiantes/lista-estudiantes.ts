import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EstadoEstudiante } from '../../../core/models/estudiante.model';
import { EstudianteService } from '../../../core/services/estudiante';
import { EstudianteFila } from '../estudiante-fila/estudiante-fila';

@Component({
  selector: 'app-lista-estudiantes',
  imports: [FormsModule, RouterLink, EstudianteFila],
  templateUrl: './lista-estudiantes.html',
  styleUrl: './lista-estudiantes.css',
})
export class ListaEstudiantes {
  private readonly estudianteService = inject(EstudianteService);

  protected readonly busqueda = signal('');
  protected readonly filtroEstado = signal<EstadoEstudiante | 'todos'>('todos');

  protected readonly filtrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const estado = this.filtroEstado();

    return this.estudianteService.estudiantes().filter((estudiante) => {
      const coincideTexto =
        !texto ||
        estudiante.nombre.toLowerCase().includes(texto) ||
        estudiante.correo.toLowerCase().includes(texto);

      const coincideEstado = estado === 'todos' || estudiante.estado === estado;

      return coincideTexto && coincideEstado;
    });
  });

  protected eliminar(id: string): void {
    const estudiante = this.estudianteService.obtenerPorId(id);
    if (!estudiante) {
      return;
    }

    const confirmar = confirm(`¿Eliminar a ${estudiante.nombre}?`);
    if (confirmar) {
      this.estudianteService.eliminar(id);
    }
  }
}

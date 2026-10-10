import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Estudiante } from '../../../core/models/estudiante.model';
import { EstadoPipe } from '../../../core/pipes/estado-pipe';

@Component({
  selector: 'tr[app-estudiante-fila]',
  imports: [RouterLink, DatePipe, DecimalPipe, EstadoPipe],
  templateUrl: './estudiante-fila.html',
  styleUrl: './estudiante-fila.css',
})
export class EstudianteFila {
  readonly estudiante = input.required<Estudiante>();
  readonly eliminar = output<string>();

  protected solicitarEliminar(): void {
    this.eliminar.emit(this.estudiante().id);
  }

  protected claseEstado(): string {
    switch (this.estudiante().estado) {
      case 'activo':
        return 'bg-emerald-100 text-emerald-800';
      case 'inactivo':
        return 'bg-amber-100 text-amber-800';
      case 'egresado':
        return 'bg-sky-100 text-sky-800';
    }
  }
}

import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EstadoPipe } from '../../../core/pipes/estado-pipe';
import { EstudianteService } from '../../../core/services/estudiante';

@Component({
  selector: 'app-detalle-estudiante',
  imports: [RouterLink, DatePipe, DecimalPipe, EstadoPipe],
  templateUrl: './detalle-estudiante.html',
  styleUrl: './detalle-estudiante.css',
})
export class DetalleEstudiante {
  private readonly estudianteService = inject(EstudianteService);

  /** Parámetro de ruta :id enlazado con withComponentInputBinding */
  readonly id = input.required<string>();

  protected readonly estudiante = computed(() => this.estudianteService.obtenerPorId(this.id()));
}

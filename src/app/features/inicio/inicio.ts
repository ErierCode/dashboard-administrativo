import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EstudianteService } from '../../core/services/estudiante';
import { EstadoPipe } from '../../core/pipes/estado-pipe';
import { StatCard } from './stat-card/stat-card';

@Component({
  selector: 'app-inicio',
  imports: [StatCard, RouterLink, DatePipe, EstadoPipe],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  private readonly estudianteService = inject(EstudianteService);

  protected readonly estudiantes = this.estudianteService.estudiantes;

  protected readonly total = computed(() => this.estudiantes().length);

  protected readonly activos = computed(
    () => this.estudiantes().filter((estudiante) => estudiante.estado === 'activo').length,
  );

  protected readonly egresados = computed(
    () => this.estudiantes().filter((estudiante) => estudiante.estado === 'egresado').length,
  );

  protected readonly promedioGeneral = computed(() => {
    const lista = this.estudiantes();
    if (lista.length === 0) {
      return '0.0';
    }

    const suma = lista.reduce((acumulado, estudiante) => acumulado + estudiante.promedio, 0);
    return (suma / lista.length).toFixed(1);
  });

  protected readonly recientes = computed(() =>
    [...this.estudiantes()]
      .sort((a, b) => b.fechaIngreso.localeCompare(a.fechaIngreso))
      .slice(0, 5),
  );
}

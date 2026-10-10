import { Pipe, PipeTransform } from '@angular/core';
import { EstadoEstudiante } from '../models/estudiante.model';

@Pipe({
  name: 'estado',
})
export class EstadoPipe implements PipeTransform {
  private readonly etiquetas: Record<EstadoEstudiante, string> = {
    activo: 'Activo',
    inactivo: 'Inactivo',
    egresado: 'Egresado',
  };

  transform(value: EstadoEstudiante | string): string {
    return this.etiquetas[value as EstadoEstudiante] ?? value;
  }
}

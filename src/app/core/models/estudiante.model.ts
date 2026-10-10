export type EstadoEstudiante = 'activo' | 'inactivo' | 'egresado';

export interface Estudiante {
  id: string;
  nombre: string;
  correo: string;
  carrera: string;
  estado: EstadoEstudiante;
  fechaIngreso: string;
  promedio: number;
}

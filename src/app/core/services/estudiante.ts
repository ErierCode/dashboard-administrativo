import { Injectable, signal } from '@angular/core';
import { Estudiante } from '../models/estudiante.model';
import { cargar, guardar } from '../utils/almacenamiento';

const CLAVE_ESTUDIANTES = 'dashboard.estudiantes';

const ESTUDIANTES_INICIALES: Estudiante[] = [
  {
    id: '1',
    nombre: 'Ana García',
    correo: 'ana.garcia@universidad.edu',
    carrera: 'Ingeniería de Software',
    estado: 'activo',
    fechaIngreso: '2024-08-15',
    promedio: 9.2,
  },
  {
    id: '2',
    nombre: 'Luis Hernández',
    correo: 'luis.hernandez@universidad.edu',
    carrera: 'Administración',
    estado: 'activo',
    fechaIngreso: '2023-01-20',
    promedio: 8.5,
  },
  {
    id: '3',
    nombre: 'María López',
    correo: 'maria.lopez@universidad.edu',
    carrera: 'Diseño Gráfico',
    estado: 'egresado',
    fechaIngreso: '2020-08-10',
    promedio: 9.0,
  },
  {
    id: '4',
    nombre: 'Carlos Ruiz',
    correo: 'carlos.ruiz@universidad.edu',
    carrera: 'Ingeniería de Software',
    estado: 'inactivo',
    fechaIngreso: '2022-08-22',
    promedio: 7.1,
  },
  {
    id: '5',
    nombre: 'Sofía Martínez',
    correo: 'sofia.martinez@universidad.edu',
    carrera: 'Psicología',
    estado: 'activo',
    fechaIngreso: '2025-01-12',
    promedio: 8.8,
  },
  {
    id: '6',
    nombre: 'Diego Torres',
    correo: 'diego.torres@universidad.edu',
    carrera: 'Contaduría',
    estado: 'activo',
    fechaIngreso: '2024-01-08',
    promedio: 7.9,
  },
  {
    id: '7',
    nombre: 'Valentina Rojas',
    correo: 'valentina.rojas@universidad.edu',
    carrera: 'Derecho',
    estado: 'egresado',
    fechaIngreso: '2019-08-05',
    promedio: 9.4,
  },
  {
    id: '8',
    nombre: 'Andrés Morales',
    correo: 'andres.morales@universidad.edu',
    carrera: 'Medicina',
    estado: 'activo',
    fechaIngreso: '2025-08-18',
    promedio: 8.2,
  },
];

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private readonly estudiantesSignal = signal<Estudiante[]>(
    cargar(CLAVE_ESTUDIANTES, [...ESTUDIANTES_INICIALES]),
  );

  readonly estudiantes = this.estudiantesSignal.asReadonly();

  obtenerPorId(id: string): Estudiante | undefined {
    return this.estudiantesSignal().find((estudiante) => estudiante.id === id);
  }

  agregar(estudiante: Omit<Estudiante, 'id'> & { id?: string }): Estudiante {
    const nuevo: Estudiante = {
      ...estudiante,
      id: estudiante.id ?? crypto.randomUUID(),
    };

    this.estudiantesSignal.update((lista) => [...lista, nuevo]);
    this.persistir();
    return nuevo;
  }

  actualizar(id: string, cambios: Partial<Omit<Estudiante, 'id'>>): Estudiante | undefined {
    let actualizado: Estudiante | undefined;

    this.estudiantesSignal.update((lista) =>
      lista.map((estudiante) => {
        if (estudiante.id !== id) {
          return estudiante;
        }

        actualizado = { ...estudiante, ...cambios };
        return actualizado;
      }),
    );

    this.persistir();
    return actualizado;
  }

  eliminar(id: string): void {
    this.estudiantesSignal.update((lista) => lista.filter((estudiante) => estudiante.id !== id));
    this.persistir();
  }

  private persistir(): void {
    guardar(CLAVE_ESTUDIANTES, this.estudiantesSignal());
  }
}

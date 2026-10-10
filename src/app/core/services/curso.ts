import { Injectable, signal } from '@angular/core';
import { Curso } from '../models/curso.model';
import { cargar, guardar } from '../utils/almacenamiento';

const CLAVE_CURSOS = 'dashboard.cursos';

const CURSOS_INICIALES: Curso[] = [
  {
    id: '1',
    codigo: 'SIS-101',
    nombre: 'Programación Web',
    docente: 'Ing. Roberto Pérez',
    creditos: 5,
    carrera: 'Ingeniería de Software',
  },
  {
    id: '2',
    codigo: 'SIS-205',
    nombre: 'Bases de Datos',
    docente: 'Ing. Laura Gómez',
    creditos: 4,
    carrera: 'Ingeniería de Software',
  },
  {
    id: '3',
    codigo: 'ADM-110',
    nombre: 'Fundamentos de Administración',
    docente: 'Lic. Marcos Díaz',
    creditos: 3,
    carrera: 'Administración',
  },
  {
    id: '4',
    codigo: 'DIS-120',
    nombre: 'Teoría del Color',
    docente: 'Lic. Elena Castillo',
    creditos: 3,
    carrera: 'Diseño Gráfico',
  },
  {
    id: '5',
    codigo: 'PSI-130',
    nombre: 'Psicología del Desarrollo',
    docente: 'Dra. Carolina Reyes',
    creditos: 4,
    carrera: 'Psicología',
  },
  {
    id: '6',
    codigo: 'CON-140',
    nombre: 'Contabilidad General',
    docente: 'Lic. Hugo Navarro',
    creditos: 5,
    carrera: 'Contaduría',
  },
];

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private readonly cursosSignal = signal<Curso[]>(cargar(CLAVE_CURSOS, [...CURSOS_INICIALES]));

  readonly cursos = this.cursosSignal.asReadonly();

  obtenerPorId(id: string): Curso | undefined {
    return this.cursosSignal().find((curso) => curso.id === id);
  }

  agregar(curso: Omit<Curso, 'id'> & { id?: string }): Curso {
    const nuevo: Curso = {
      ...curso,
      id: curso.id ?? crypto.randomUUID(),
    };

    this.cursosSignal.update((lista) => [...lista, nuevo]);
    this.persistir();
    return nuevo;
  }

  actualizar(id: string, cambios: Partial<Omit<Curso, 'id'>>): Curso | undefined {
    let actualizado: Curso | undefined;

    this.cursosSignal.update((lista) =>
      lista.map((curso) => {
        if (curso.id !== id) {
          return curso;
        }

        actualizado = { ...curso, ...cambios };
        return actualizado;
      }),
    );

    this.persistir();
    return actualizado;
  }

  eliminar(id: string): void {
    this.cursosSignal.update((lista) => lista.filter((curso) => curso.id !== id));
    this.persistir();
  }

  private persistir(): void {
    guardar(CLAVE_CURSOS, this.cursosSignal());
  }
}

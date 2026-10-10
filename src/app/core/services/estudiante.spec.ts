import { TestBed } from '@angular/core/testing';
import { EstudianteService } from './estudiante';

describe('EstudianteService', () => {
  let service: EstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debe agregar un estudiante', () => {
    const totalInicial = service.estudiantes().length;

    const nuevo = service.agregar({
      nombre: 'Prueba Test',
      correo: 'prueba@universidad.edu',
      carrera: 'Ingeniería de Software',
      estado: 'activo',
      fechaIngreso: '2026-01-01',
      promedio: 8,
    });

    expect(nuevo.id).toBeTruthy();
    expect(service.estudiantes().length).toBe(totalInicial + 1);
    expect(service.obtenerPorId(nuevo.id)?.nombre).toBe('Prueba Test');
  });

  it('debe obtener un estudiante por id', () => {
    const estudiante = service.obtenerPorId('1');
    expect(estudiante?.nombre).toBe('Ana García');
  });

  it('debe eliminar un estudiante', () => {
    service.eliminar('1');
    expect(service.obtenerPorId('1')).toBeUndefined();
  });
});

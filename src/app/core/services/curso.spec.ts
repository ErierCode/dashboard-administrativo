import { TestBed } from '@angular/core/testing';
import { CursoService } from './curso';

describe('CursoService', () => {
  let service: CursoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoService);
  });

  it('carga los cursos base', () => {
    expect(service.cursos().length).toBeGreaterThan(0);
    expect(service.obtenerPorId('1')?.nombre).toBe('Programación Web');
  });

  it('agrega un curso y lo guarda en localStorage', () => {
    const nuevo = service.agregar({
      codigo: 'TST-001',
      nombre: 'Curso de prueba',
      docente: 'Docente Test',
      creditos: 3,
      carrera: 'Ingeniería de Software',
    });

    const guardado = JSON.parse(localStorage.getItem('dashboard.cursos') ?? '[]');
    expect(guardado.some((c: { id: string }) => c.id === nuevo.id)).toBe(true);
  });

  it('elimina un curso', () => {
    service.eliminar('1');
    expect(service.obtenerPorId('1')).toBeUndefined();
  });
});

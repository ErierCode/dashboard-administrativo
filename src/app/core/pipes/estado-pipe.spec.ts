import { EstadoPipe } from './estado-pipe';

describe('EstadoPipe', () => {
  it('crea una instancia', () => {
    const pipe = new EstadoPipe();
    expect(pipe).toBeTruthy();
  });

  it('traduce los estados', () => {
    const pipe = new EstadoPipe();
    expect(pipe.transform('activo')).toBe('Activo');
    expect(pipe.transform('inactivo')).toBe('Inactivo');
    expect(pipe.transform('egresado')).toBe('Egresado');
  });
});

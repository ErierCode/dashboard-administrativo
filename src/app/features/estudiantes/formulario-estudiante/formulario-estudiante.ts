import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EstadoEstudiante } from '../../../core/models/estudiante.model';
import { EstudianteService } from '../../../core/services/estudiante';

@Component({
  selector: 'app-formulario-estudiante',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-estudiante.html',
  styleUrl: './formulario-estudiante.css',
})
export class FormularioEstudiante implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly estudianteService = inject(EstudianteService);
  private readonly router = inject(Router);

  /** Llega desde la ruta gracias a withComponentInputBinding */
  readonly id = input<string>();

  protected readonly esEdicion = computed(() => !!this.id());

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    carrera: ['', Validators.required],
    estado: ['activo' as EstadoEstudiante, Validators.required],
    fechaIngreso: [new Date().toISOString().slice(0, 10), Validators.required],
    promedio: [8, [Validators.required, Validators.min(0), Validators.max(10)]],
  });

  protected noEncontrado = false;

  ngOnInit(): void {
    const id = this.id();
    if (!id) {
      return;
    }

    const estudiante = this.estudianteService.obtenerPorId(id);
    if (!estudiante) {
      this.noEncontrado = true;
      return;
    }

    this.form.patchValue({
      nombre: estudiante.nombre,
      correo: estudiante.correo,
      carrera: estudiante.carrera,
      estado: estudiante.estado,
      fechaIngreso: estudiante.fechaIngreso,
      promedio: estudiante.promedio,
    });
  }

  protected guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const valores = this.form.getRawValue();
    const id = this.id();

    if (id) {
      this.estudianteService.actualizar(id, valores);
    } else {
      this.estudianteService.agregar({
        ...valores,
        id: crypto.randomUUID(),
      });
    }

    void this.router.navigate(['/estudiantes']);
  }

  protected campoInvalido(nombre: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[nombre];
    return control.invalid && control.touched;
  }
}

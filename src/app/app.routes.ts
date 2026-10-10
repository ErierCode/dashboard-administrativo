import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';
import { Inicio } from './features/inicio/inicio';
import { ListaEstudiantes } from './features/estudiantes/lista-estudiantes/lista-estudiantes';
import { FormularioEstudiante } from './features/estudiantes/formulario-estudiante/formulario-estudiante';
import { DetalleEstudiante } from './features/estudiantes/detalle-estudiante/detalle-estudiante';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', component: Inicio },
      { path: 'estudiantes', component: ListaEstudiantes },
      { path: 'estudiantes/nuevo', component: FormularioEstudiante },
      { path: 'estudiantes/:id/editar', component: FormularioEstudiante },
      { path: 'estudiantes/:id', component: DetalleEstudiante },
    ],
  },
  { path: '**', redirectTo: '' },
];

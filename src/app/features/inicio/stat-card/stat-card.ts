import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  readonly titulo = input.required<string>();
  readonly valor = input.required<string | number>();
  readonly descripcion = input('');
}

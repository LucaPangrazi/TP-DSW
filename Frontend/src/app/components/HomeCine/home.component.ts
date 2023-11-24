// home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div>
      <button (click)="navigateToMovies()">Películas</button>
      <button (click)="navigateToSalas()">Salas</button>
       <button (click)="navigateToSalas()">Sucursales</button>
    </div>
  `,
  styles: [
    `
      div {
        text-align: center;
        margin-top: 20px;
      }
      button {
        margin: 0 10px;
      }
    `,
  ],
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToMovies() {
    this.router.navigate(['/movies']);
  }

  navigateToSalas() {
    this.router.navigate(['/salas']);
  }

   navigateToSucursales() {
    this.router.navigate(['/sucursales']);
  }
}

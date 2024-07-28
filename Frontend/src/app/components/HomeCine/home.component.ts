// home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div>
      <button (click)="navigateToCartelera()">Cartelera</button>
      <button (click)="navigateToMovies()">Películas</button>
      <button (click)="navigateToSalas()">Salas</button>
      <button (click)="navigateToSucursales()">Sucursales</button>
      <button (click)="navigateToUsers()">Usuarios</button>
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

 navigateToCartelera() {
    this.router.navigate(['/cartelera']);
  }

  navigateToMovies() {
    this.router.navigate(['/movies']);
  }

  navigateToSalas() {
    this.router.navigate(['/salas']);
  }

   navigateToSucursales() {
    this.router.navigate(['/sucursales']);
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }
}

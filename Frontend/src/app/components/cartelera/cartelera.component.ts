// cartelera.component.ts

import { Component, OnInit } from '@angular/core';
import { CarteleraService } from '../../services/cartelera.service';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css'],
})
export class CarteleraComponent implements OnInit {
  apiUrl = 'http://localhost:3000/api/obtenerPeliculas'; // Ajusta según tu configuración
  peliculas: any[] = [];

  constructor(private carteleraService: CarteleraService) {}

  ngOnInit(): void {
    this.carteleraService.obtenerPeliculas().subscribe(
      (data) => {
        this.peliculas = data;
      },
      (error) => {
        console.error('Error al obtener películas:', error);
      }
    );
  }
}

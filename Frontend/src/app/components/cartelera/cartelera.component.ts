import { Component, OnInit } from '@angular/core';
import { CarteleraService } from '../../services/cartelera.service';
import { AsientosService } from '../../shared/asientos.service'; // Importa el servicio

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {
  images: string[] = [];
  peliculas: string[] = ['Película 1', 'Película 2', 'Película 3', 'Película 4','Película 5','Película 6', 'Película 7'];

  constructor(
    private carteleraService: CarteleraService,
    private asientosService: AsientosService // Inyecta el servicio
  ) {}

  ngOnInit(): void {
    this.carteleraService.getImages().subscribe(
      (data: string[]) => {
        this.images = data.map(image => `http://localhost:3000${image}`);
      },
      (error) => {
        console.error('Error al cargar imágenes:', error);
      }
    );
  }

  seleccionarPelicula(index: number): void {
    const peliculaSeleccionada = this.peliculas[index];
    this.asientosService.setDatosPelicula({ pelicula: peliculaSeleccionada, fecha: '2024-12-30' });
    console.log('Película seleccionada:', peliculaSeleccionada); // Actualiza la fecha si es necesario
  }
}

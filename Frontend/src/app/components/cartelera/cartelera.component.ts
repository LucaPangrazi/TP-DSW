import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarteleraService } from '../../services/cartelera.service';
import { AsientosService } from '../../shared/asientos.service';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {
  images: string[] = [];
  peliculas: string[] = ['Spiderman 2', 'Intensamente 2', 'Rey León', 'Mulan', 'Encanto', 'Rápidos y furiosos', 'Wish'];
  fechas: string[] = ['2024-12-30', '2024-12-31', '2024-12-29', '2024-12-28', '2024-12-27', '2024-12-26', '2024-12-25'];

  constructor(
    private router: Router,
    private carteleraService: CarteleraService,
    private asientosService: AsientosService
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
    if (index < this.peliculas.length) {
      const pelicula = this.peliculas[index];
      const fecha = this.fechas[index];
      const peliculaObj = { id: index, nombre: pelicula }; // 🎯

      console.log('Datos enviados al servicio:', { pelicula: peliculaObj, fecha });
      this.asientosService.setDatosPelicula({ pelicula: peliculaObj, fecha });

      this.router.navigate(['/seleccion-funcion']);
    }
  }
}

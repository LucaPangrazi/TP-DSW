
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Movie } from '../../interfaces/movie';
import { Router } from '@angular/router';
import { AsientosService } from '../../shared/asientos.service';

@Component({
  selector: 'app-detalles-pelicula',
  templateUrl: './detalles-pelicula.component.html',
  styleUrls: ['./detalles-pelicula.component.css']
})
export class DetallesPeliculaComponent implements OnInit {
  movie: Movie | undefined;
  imageUrl: SafeUrl | undefined;

  constructor(
    private route: ActivatedRoute,
    private MovieService: MovieService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private asientosService: AsientosService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.MovieService.getPeliculaById(parseInt(id)).subscribe(
        (movie: Movie) => {
          this.movie = movie;
          if (this.movie.image) {
            const imgStr = this.movie.image as unknown as string;
            // El backend devuelve la URL completa en getMovie.
            // Si tiene espacios, probablemente el backend no la codificó.
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(imgStr);
          }
        },
        (error) => {
          console.error('Error al obtener detalles de la película:', error);
        }
      );
    }
  }
  comprarEntrada() {
    if (this.movie?.id_movie) {
      this.asientosService.setDatosPelicula({
        pelicula: { id: this.movie.id_movie, nombre: this.movie.title },
        fecha: '' // Fecha se selecciona en el siguiente paso
      });
      this.router.navigate(['/seleccion-funcion']);
    }
  }
}

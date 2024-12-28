
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetallePeliculaService } from '../../services/detalle-pelicula.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Movie } from '../../interfaces/movie';
import { Router } from '@angular/router';

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
    private detallePeliculaService: DetallePeliculaService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.detallePeliculaService.getPeliculaById(parseInt(id)).subscribe(
        (movie: Movie) => {
          this.movie = movie;
          if (this.movie.image) {
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000/uploads/${this.movie.image}`);
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
      this.router.navigate(['/seleccion-asientos', this.movie.id_movie]);
    }
  
}
}

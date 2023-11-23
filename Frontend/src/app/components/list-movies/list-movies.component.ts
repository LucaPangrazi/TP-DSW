import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/interfaces/movies';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router'; // Importamos el Router para la navegación

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  listMovies: Movie[] = [];
  loading: boolean = false;

  constructor(
    private _movieService: MovieService,
    private toastr: ToastrService,
    private router: Router // Inyectamos el Router
  ) {}

  ngOnInit(): void {
    this.getListMovies();
  }

  getListMovies() {
    this.loading = true;
    this._movieService.getListMovies().subscribe(
      (data: Movie[]) => {
        this.listMovies = data;
        this.loading = false;
      },
      error => {
        console.error('Error al obtener la lista de películas', error);
        this.loading = false;
      }
    );
  }

  deleteMovie(id_movie: number) {
    this.loading = true;
    this._movieService.deleteMovie(id_movie).subscribe(
      () => {
        this.getListMovies();
        this.toastr.warning('La película fue eliminada correctamente', 'Película eliminada');
      },
      error => {
        console.error('Error al eliminar la película', error);
        this.loading = false;
      }
    );
  }

  navigateToAddMovie() {
    this.router.navigate(['/movies/add']); // Navegamos hacia la ruta de agregar película
  }
}

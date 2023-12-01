import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent  implements OnInit {
  searchTerm: string = '';
  listMovies: Movie[] = []
  loading: boolean = false;
  filteredMovies: Movie[] = [];
 
  constructor(private _movieService: MovieService,
    private toastr: ToastrService,
    private searchService: SearchService) {}

  ngOnInit(): void {
      this.getListMovies();

      this.searchService.searchTerm$.subscribe((term: string) => {
        console.log('Término de búsqueda recibido:', term);
        this.searchTerm = term;
        this.searchMovies();
      });
    }

    getListMovies(){
      this.loading = true;
      this._movieService.getListMovies().subscribe((data: Movie[]) => { 
      this.listMovies = data;
      this.filteredMovies = [...this.listMovies];
      this.loading = false;
      })
    }
 
  
    searchMovies(): void {
      // Filtrar la lista de películas según el término de búsqueda
      this.filteredMovies = this.listMovies.filter((movie) =>
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    deleteMovie(id_movie: number) {
      console.log(id_movie);
      this.loading = true;
      this._movieService.deleteMovie(id_movie).subscribe(() => {
        this.getListMovies();
        this.toastr.warning('La pelicula fue eiminada correctamente', 'Pelicula eliminada');
      },
        (error: any) => {
        console.error('Error al eliminar la película', error);
      }
  );}
}

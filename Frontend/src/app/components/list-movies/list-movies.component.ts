import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent  implements OnInit {
  listMovies: Movie[] = []
  loading: boolean = false;

 
  constructor(private _movieService: MovieService, private toastr: ToastrService) {}

  ngOnInit(): void {
      this.getListMovies();
    }

    getListMovies(){
      this.loading = true;
      this._movieService.getListMovies().subscribe((data: Movie[]) => { 
      this.listMovies = data;
      this.loading = false;
      })
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


import { Component, OnInit } from '@angular/core';
import { FuncionesService } from '../../services/funciones.service';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';
import { ToastrService } from 'ngx-toastr';
import { Funcion } from '../../interfaces/funcion';

@Component({
    selector: 'app-list-funciones',
    templateUrl: './list-funciones.component.html',
    styles: []
})
export class ListFuncionesComponent implements OnInit {
    listFunciones: Funcion[] = [];
    loading: boolean = false;

    constructor(
        private _funcionesService: FuncionesService,
        private _movieService: MovieService,
        private toastr: ToastrService
    ) { }

    movieMap: Record<number, string> = {};

    ngOnInit(): void {
        this.getListFunciones();
    }

    getListFunciones() {
        this.loading = true;
        this._funcionesService.getFunciones().subscribe(data => {
            this.listFunciones = data;
            this.loading = false;
            // After loading funciones, also load movies to map ids->titles
            this._movieService.getListMovies().subscribe((movies: Movie[]) => {
                this.movieMap = {};
                movies.forEach(m => {
                    if (m.id_movie != null) {
                        this.movieMap[m.id_movie] = m.title;
                    }
                });
            }, () => {});
        }, error => {
            console.log(error);
            this.loading = false;
        });
    }

    deleteFuncion(id: number) {
        this.loading = true;
        this._funcionesService.deleteFuncion(id).subscribe(() => {
            this.toastr.warning('La función fue eliminada con éxito', 'Función eliminada');
            this.getListFunciones();
        }, error => {
            this.loading = false;
            this.toastr.error('Ocurrió un error al eliminar la función', 'Error');
        });
    }
}

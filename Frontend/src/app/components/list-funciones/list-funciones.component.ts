
import { Component, OnInit } from '@angular/core';
import { FuncionesService } from '../../services/funciones.service';
import { MovieService } from '../../services/movie.service';
import { SearchService } from '../../shared/search.service';
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
    filteredFunciones: Funcion[] = [];
    loading: boolean = false;
    movieMap: Record<number, string> = {};
    currentSearchTerm: string = '';

    constructor(
        private _funcionesService: FuncionesService,
        private _movieService: MovieService,
        private searchService: SearchService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getListFunciones();

        this.searchService.searchTerm$.subscribe(term => {
            this.currentSearchTerm = term;
            this.filterFunciones(term);
        });
    }

    getListFunciones() {
        this.loading = true;
        this._funcionesService.getFunciones().subscribe(data => {
            this.listFunciones = data;
            this.filteredFunciones = [...this.listFunciones];
            this.loading = false;
            // Después de cargar las funciones,buscar las películas por id para traer los títulos
            this._movieService.getListMovies().subscribe((movies: Movie[]) => {
                this.movieMap = {};
                movies.forEach(m => {
                    if (m.id_movie != null) {
                        this.movieMap[m.id_movie] = m.title;
                    }
                });

                // Vuelvo a aplicar el filtro por si las películas se terminan de cargar después de haber buscado
                this.filterFunciones(this.currentSearchTerm);
            }, () => { });
        }, error => {
            console.log(error);
            this.loading = false;
        });
    }

    filterFunciones(term: string) {
        if (!term || !term.trim()) {
            this.filteredFunciones = [...this.listFunciones];
            return;
        }

        const lowerTerm = term.toLowerCase();
        this.filteredFunciones = this.listFunciones.filter(funcion => {
            const movieTitle = this.movieMap[funcion.movie_id] || String(funcion.movie_id);
            return movieTitle.toLowerCase().includes(lowerTerm);
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

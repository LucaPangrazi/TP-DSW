
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FuncionesService } from '../../services/funciones.service';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';
import { Funcion } from '../../interfaces/funcion';

@Component({
    selector: 'app-add-edit-funcion',
    templateUrl: './add-edit-funcion.component.html',
    styles: []
})
export class AddEditFuncionComponent implements OnInit {
    form: FormGroup;
    loading: boolean = false;
    id: number;
    operacion: string = 'Agregar ';

    constructor(
        private fb: FormBuilder,
        private _funcionesService: FuncionesService,
        private _movieService: MovieService,
        private router: Router,
        private toastr: ToastrService,
        private aRouter: ActivatedRoute
    ) {
        this.form = this.fb.group({
            movie_id: [null, Validators.required],
            sala_id: ['', Validators.required],
            sucursal_id: ['', Validators.required],
            fecha_funcion: ['', Validators.required],
            hora_funcion: ['', Validators.required]
        });
        this.id = Number(aRouter.snapshot.paramMap.get('id'));
    }

    movies: Movie[] = [];
    movieSearch: string = '';

    ngOnInit(): void {
        if (this.id != 0) {
            this.operacion = 'Editar ';
            this.getFuncion(this.id);
        }

        // Cargar lista de películas para el selector/autocomplete
        this._movieService.getListMovies().subscribe((data: Movie[]) => {
            this.movies = data;
        }, err => {
            console.error('Error loading movies', err);
        });

        // Registro de depuración para la validez del formulario
        this.form.valueChanges.subscribe(val => {
            console.log('Form Value:', val);
            console.log('Form Valid:', this.form.valid);
            Object.keys(this.form.controls).forEach(key => {
                const control = this.form.get(key);
                if (control?.invalid) {
                    console.log(`Control ${key} is invalid. Errors:`, control.errors);
                }
            });
        });
    }

    getFuncion(id: number) {
        this.loading = true;
        this._funcionesService.getFuncion(id).subscribe((data: Funcion) => {
            this.loading = false;
            console.log('Datos de la función editada:', data);

            // Asegurar que los IDs sean números y asignarlos al formulario
            this.form.patchValue({
                movie_id: Number(data.movie_id),
                sala_id: Number(data.sala_id),
                sucursal_id: Number(data.sucursal_id),
                fecha_funcion: data.fecha_funcion,
                hora_funcion: data.hora_funcion
            });

            // Establecer movieSearch para mostrar el título de la película en el input
            if (this.movies && this.movies.length > 0) {
                const m = this.movies.find(x => Number(x.id_movie) === Number(data.movie_id));
                if (m) {
                    this.movieSearch = m.title;
                }
            }

            // Si no se encuentra en la lista actual, intento obtener la película específica
            if (!this.movieSearch) {
                this._movieService.getMovie(data.movie_id).subscribe(mv => {
                    this.movieSearch = mv.title;
                }, err => console.error('Error fetching movie details', err));
            }
        });
    }

    onMovieSearch() {
        const searchValue = this.movieSearch?.trim();

        if (!searchValue) {
            this.form.patchValue({ movie_id: null });
            return;
        }

        // Buscar coincidencia exacta o parcial
        const found = this.movies.find(m => m.title.toLowerCase() === searchValue.toLowerCase());

        if (found && found.id_movie) {
            this.form.patchValue({ movie_id: Number(found.id_movie) });
        } else {
            // Si el usuario sigue escribiendo y no hay match exacto, reseteamos el ID
            // para obligarlo a seleccionar o escribir el nombre completo correcto.
            // PERO: Si borramos el ID mientras escribe, puede ser molesto. 
            // Mejor lo validamos en (blur) o al enviar.
            // Para "Add Function" flow, es mejor ser estricto:
            this.form.patchValue({ movie_id: null });
        }
    }

    checkMovieSelection() {
        const searchValue = this.movieSearch?.trim();
        if (!searchValue) {
            this.form.patchValue({ movie_id: null });
            return;
        }

        const found = this.movies.find(m => m.title.toLowerCase() === searchValue.toLowerCase());

        if (found && found.id_movie) {
            this.form.patchValue({ movie_id: Number(found.id_movie) });
        } else {
            this.movieSearch = ''; // Limpiar input si no es válido
            this.form.patchValue({ movie_id: null });
            this.toastr.warning('Debe seleccionar una película válida de la lista', 'Película no válida');
        }
    }

    addFuncion() {
        console.log('Attempting to submit form. Valid:', this.form.valid, 'Value:', this.form.value);

        if (this.form.invalid) {
            // Mark all controls as touched to trigger validation messages in UI
            Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
            });
            this.toastr.error('Por favor complete todos los campos requeridos', 'Formulario inválido');
            return;
        }

        const funcion: Funcion = {
            movie_id: Number(this.form.value.movie_id),
            sala_id: Number(this.form.value.sala_id),
            sucursal_id: Number(this.form.value.sucursal_id),
            fecha_funcion: this.form.value.fecha_funcion,
            hora_funcion: this.form.value.hora_funcion
        };

        console.log('Sending payload:', funcion);

        if (this.id !== 0) {
            this._funcionesService.updateFuncion(this.id, funcion).subscribe(() => {
                this.toastr.info(`La función fue actualizada con éxito`, 'Función actualizada');
                this.router.navigate(['/funciones']);
            }, error => {
                console.error('Error updating funcion:', error);
                this.toastr.error('Error al actualizar la función', 'Error');
            });
        } else {
            this._funcionesService.saveFuncion(funcion).subscribe(() => {
                this.toastr.success(`La función fue registrada con éxito`, 'Función registrada');
                this.router.navigate(['/funciones']);
            }, error => {
                console.error('Error saving funcion:', error);
                this.toastr.error('Error al registrar la función', 'Error');
            });
        }
    }
}

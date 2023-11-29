import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})
export class AddEditMovieComponent implements OnInit{
  form: FormGroup;
  loading: boolean = false;
  id_movie: number;
  operacion: string = 'Agregar ';

  constructor(
    private fb: FormBuilder,
    private _movieService: MovieService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      format: ['', Validators.required],
      description: ['', Validators.required],
      clasification: ['', Validators.required],
      durationMin: [''],
    });
    this.id_movie = Number(aRouter.snapshot.paramMap.get('id_movie'));
    console.log(this.id_movie);
  }

  ngOnInit(): void {
    if (this.id_movie !== 0) {
      this.operacion = 'Editar ';
      this.getMovie(this.id_movie);
    }
  }

  getMovie(id_movie: number) {
    this.loading = true;
    this._movieService.getMovie(id_movie).subscribe((data: Movie) => {
      this.loading = false;
      this.form.setValue({
        id_movie: data.id_movie,
        title: data.title,
        genre: data.genre,
        format: data.format,
        description: data.description,
        clasification: data.clasification,
        durationMin: data.durationMin
      });
    });
  }

  addMovie() {
    console.log(this.form);
    if (this.form.valid) {
      const newMovie: Movie = {
        title: this.form.get('title')?.value || '',
        genre: this.form.get('genre')?.value || '',
        format: this.form.get('format')?.value || '',
        description: this.form.get('description')?.value || '',
        clasification: this.form.get('clasification')?.value || '',
        durationMin: this.form.get('durationMin')?.value || 0 
      };

      this.loading = true;
      if (this.id_movie !== 0) {
        newMovie.id_movie = this.id_movie;
        this._movieService.updateMovie(this.id_movie, newMovie).subscribe(() => {
          this.toastr.info(`La película ${newMovie.title} fue actualizada correctamente`, 'Película actualizada');
          this.loading = false;
          this.router.navigate(['/']);
        });
      } else {
        this._movieService.saveMovie(newMovie).subscribe(() => {
          this.toastr.success(`La película ${newMovie.title} fue registrada correctamente`, 'Película registrada'); //msj,titulo
          this.loading = false;
          this.router.navigate(['/']);
        });
      }
      console.log(newMovie);
    }
  } 
}

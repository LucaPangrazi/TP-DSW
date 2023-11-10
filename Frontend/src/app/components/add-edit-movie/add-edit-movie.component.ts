import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Movie } from 'src/app/interfaces/movies';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})
export class AddEditMovieComponent {
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
      id_movie: [''],
      title: ['', Validators.required],
      genre: ['', Validators.required],
      clasification: ['', Validators.required],
      format: ['', Validators.required],
      description: ['', Validators.required],
      durationMin: [''],
      imageUri: [null as File | null, Validators.required]
    });
    this.id_movie = Number(aRouter.snapshot.paramMap.get('id_movie'));
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
        clasification: data.clasification,
        format: data.format,
        description: data.description,
        durationMin: data.durationMin,
        imageUri: data.imageUri
      });
    });
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.form.get('imageUri')?.setValue(inputElement.files[0]);
    }
  }

  addMovie() {
    if (this.form) {
      const newMovie: Movie = {
        title: this.form.get('title')?.value || '',
        genre: this.form.get('genre')?.value || '',
        clasification: this.form.get('clasification')?.value || '',
        format: this.form.get('format')?.value || '',
        description: this.form.get('description')?.value || '',
        durationMin: this.form.get('durationMin')?.value || '',
        imageUri: this.form.get('imageUri')?.value || null
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
          this.toastr.success(`La película ${newMovie.title} fue registrada correctamente`, 'Película registrada');
          this.loading = false;
          this.router.navigate(['/']);
        });
      }
    }
  }
}
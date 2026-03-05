import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})
export class AddEditMovieComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  images = '';
  imgURL = '/assets/noimage.png';
  multipleImages = [];
  imagenes: any = [];
  id_movie: number;
  operacion: string = 'Agregar ';

  currentImageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private _movieService: MovieService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.id_movie = Number(aRouter.snapshot.paramMap.get('id_movie'));
    console.log(this.id_movie);
    this.form = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      format: ['', Validators.required],
      description: ['', Validators.required],
      clasification: ['', Validators.required],
      durationMin: [''],
      image: [null, this.id_movie === 0 ? Validators.required : null]
    });
  }

  ngOnInit(): void {
    if (this.id_movie !== 0) {
      this.operacion = 'Editar ';
      this.getMovie(this.id_movie);
    }
  }

  getMovie(id_movie: number) {
    this.loading = true;
    this._movieService.getPeliculaById(id_movie).subscribe((data: Movie) => {
      this.loading = false;
      this.currentImageUrl = data.image as string;
      this.form.patchValue({
        title: data.title,
        genre: data.genre,
        format: data.format,
        description: data.description,
        clasification: data.clasification,
        durationMin: data.durationMin
      });
    });
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.form.get('image')?.setValue(inputElement.files[0]);
    }
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
        durationMin: this.form.get('durationMin')?.value || 0,
        image: this.form.get('image')?.value || '',
        // image: this.form.get('image')?.value?.name || '',
      };

      this.loading = true;
      if (this.id_movie !== 0) {
        newMovie.id_movie = this.id_movie;
        this._movieService.updateMovie(this.id_movie, newMovie).subscribe(() => {
          this.toastr.info(`La película ${newMovie.title} fue actualizada correctamente`, 'Película actualizada');
          this.loading = false;
          this.navigateToMovies();
        }, error => {
          console.error(error);
          this.loading = false;
          this.toastr.error('Error al actualizar la película', 'Error');
        });
      } else {
        this._movieService.saveMovie(newMovie).subscribe(() => {
          this.toastr.success(`La película ${newMovie.title} fue registrada correctamente`, 'Película registrada'); //msj,titulo
          this.loading = false;
          this.navigateToMovies();
        }, error => {
          console.error(error);
          this.loading = false;
          this.toastr.error('Error al registrar la película', 'Error');
        });
      }
      console.log(newMovie);
    }

  }
  navigateToMovies() {
    this.router.navigate(['/movies']);
  }
}
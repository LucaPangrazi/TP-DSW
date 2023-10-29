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
  
  constructor(private fb:FormBuilder, private _movieService: MovieService,
    private router: Router, private toastr: ToastrService,
    private aRouter: ActivatedRoute){    
    this.form = this.fb.group({
      title: ['', Validators.required], genre:  ['', Validators.required], 
      clasification:  ['', Validators.required], format:  ['', Validators.required], 
      description:  ['', Validators.required], durationMin: ['', Validators],
      imageUri:  ['', Validators.required]
    });
    this.id_movie = Number(aRouter.snapshot.paramMap.get('id_movie'));
  }

  ngOnInit():void {
 if (this.id_movie != 0) {
//       // Es editar
       this.operacion = 'Editar ';
       this.getMovie(this.id_movie);
     }
  }

  getMovie(id_movie: number){
    this.loading = true;
    this._movieService.getMovie(id_movie).subscribe((data: Movie) => {
    this.loading = false;
    this.form.setValue({
      title: data.title, genre:  data.genre, 
      clasification: data.clasification, format: data.format, 
      description: data.description, durationMin: data.durationMin, imageUri: data.imageUri
    })
   /* this.form.patchValue({
      title: data.title
    }) */
    })
  }

  addMovie(){
    /*console.log(this.form.value.title);*/
    
    const newMovie: Movie = {
      title: this.form.value.title,
      genre: this.form.value.genre,
      clasification: this.form.value.clasification,
      format: this.form.value.format,
      description: this.form.value.description,
      durationMin: this.form.value.duration,
      imageUri: this.form.value.image//como hago para no pasar un id porque es autoincremental en la bd
    }
    this.loading = true;
    if(this.id_movie !== 0){
      //editar      
      newMovie.id_movie = this.id_movie;
      this._movieService.updateMovie(this.id_movie, newMovie).subscribe(() => {      
      this.toastr.info(`La pelicula ${newMovie.title} fue actualizada correctamente`, 'Pelicula acutualizada');
      this.loading = false;  
      this.router.navigate(['/']);
      })
    }
    else{
      //agrego
    this._movieService.saveMovie(newMovie).subscribe(() => {
      this.toastr.success(`La pelicula ${newMovie.title} fue registrada correctamente`, 'Pelicula registrada'); 
      this.loading = false;  
      this.router.navigate(['/']);     
    })

}
}
}
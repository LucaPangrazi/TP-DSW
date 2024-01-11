import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie } from '../interfaces/movie';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
 private myAppUrl:string;
private myApiUrl:string;

  constructor(private http: HttpClient, private router: Router) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl =  'api/movies/' //'http://localhost:3000/api/movies/';
   }
   getListMovies(): Observable <Movie[]> {
    return this.http.get<Movie[]>(this.myAppUrl + this.myApiUrl);
    // return this.http.get<Movie[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

   deleteMovie(id_movie: number): Observable<void> {
     return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_movie}`)
  }

    saveMovie(movie: Movie): Observable<void> {
      console.log('Movie object before save:', movie);
      const formData: FormData = new FormData();

  formData.append('title', movie.title);
  formData.append('genre', movie.genre);
  formData.append('format', movie.format);
  formData.append('description', movie.description);
  formData.append('clasification', movie.clasification);
  formData.append('durationMin', movie.durationMin.toString());

  if (movie.image instanceof File) {
    formData.append('image', movie.image, movie.image.name);
  }
  else {
    formData.append('image', movie.image);
  }

     return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,formData)
   }

   getMovie(id_movie: number): Observable <Movie>{
    return this.http.get <Movie>(`${this.myAppUrl}${this.myApiUrl}${id_movie}`)
   }
   updateMovie(id_movie: number, movie: Movie): Observable <void>{
    console.log('Movie object before update:', movie);
    const formData: FormData = new FormData();

  formData.append('title', movie.title);
  formData.append('genre', movie.genre);
  formData.append('format', movie.format);
  formData.append('description', movie.description);
  formData.append('clasification', movie.clasification);
  formData.append('durationMin', movie.durationMin.toString());

  if (movie.image instanceof File) {
    formData.append('image', movie.image, movie.image.name);
  }
  else {
    formData.append('image', movie.image);
  }
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id_movie}`, formData);
   }
  }
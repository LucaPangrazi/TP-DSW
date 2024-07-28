import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class DetallePeliculaService {
  private apiUrl = 'http://localhost:3000/api/movies'; // URL del backend

  constructor(private http: HttpClient) { }

  getPeliculaById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }
}

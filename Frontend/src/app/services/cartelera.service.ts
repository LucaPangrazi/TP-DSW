import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie'; 

@Injectable({
  providedIn: 'root'
})
export class CarteleraService {
  private baseUrl = 'http://localhost:3000/api/cartelera';

  constructor(private http: HttpClient) {}

  getImages(): Observable<string[]> {
    // Devuelve una lista de URLs de imágenes
    return this.http.get<string[]>(`${this.baseUrl}/images`);
  }

  getPeliculaById(id: number): Observable<Movie> {
    // Devuelve los detalles de la película por ID
    return this.http.get<Movie>(`${this.baseUrl}/movies/${id}`);
  }
}

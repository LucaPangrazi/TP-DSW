// cartelera.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarteleraService {
  private myAppUrl: string;
  private myApiUrl: string;
  private imagesEndpoint: string = 'uploads/';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/movies';
  }

  obtenerPeliculas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  obtenerImagen(nombreImagen: string): string {
    return `${this.myAppUrl}${this.imagesEndpoint}${nombreImagen}`;
  }
}

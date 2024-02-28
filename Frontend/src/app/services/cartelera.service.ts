// cartelera.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarteleraService {
  private apiUrl = 'http://tu-backend.com/obtenerPeliculas'; // Reemplaza con tu URL del backend

  constructor(private http: HttpClient) {}

  obtenerPeliculas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

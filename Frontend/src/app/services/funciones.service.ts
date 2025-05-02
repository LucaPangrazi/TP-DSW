import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuncionesService {
  private apiUrl = 'http://localhost:3000/api/funciones'; 

  constructor(private http: HttpClient) {}

  obtenerHorarios(peliculaId: number, fecha: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}?peliculaId=${peliculaId}&fecha=${fecha}`);
  }

  obtenerAsientos(peliculaId: number, fecha: string, hora: string): Observable<{ estado: 'disponible' | 'ocupado' }[][]> {
    return this.http.get<{ estado: 'disponible' | 'ocupado' }[][]>(`/api/asientos?peliculaId=${peliculaId}&fecha=${fecha}&hora=${hora}`);
  }

  obtenerFuncionPorDatos(peliculaId: number, fecha: string, hora: string): Observable<{ id_funcion: number }> {
    return this.http.get<{ id_funcion: number }>(`${this.apiUrl}/buscar?peliculaId=${peliculaId}&fecha=${fecha}&hora=${hora}`);
  }
}

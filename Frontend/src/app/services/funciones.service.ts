import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuncionesService {
  // URL de producción en Render
  private apiUrl = 'https://tp-dsw-0wfq.onrender.com/api/funciones';

  constructor(private http: HttpClient) { }

  obtenerHorarios(peliculaId: number, fecha: string, sucursalId?: number): Observable<string[]> {
    let url = `${this.apiUrl}?peliculaId=${peliculaId}&fecha=${fecha}`;
    if (sucursalId) {
      url += `&sucursalId=${sucursalId}`;
    }
    return this.http.get<string[]>(url);
  }

  obtenerAsientos(peliculaId: number, fecha: string, hora: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/asientos?peliculaId=${peliculaId}&fecha=${fecha}&hora=${hora}`);
  }

  obtenerFuncionPorDatos(peliculaId: number, fecha: string, hora: string): Observable<{ id_funcion: number }> {
    return this.http.get<{ id_funcion: number }>(`${this.apiUrl}/buscar?peliculaId=${peliculaId}&fecha=${fecha}&hora=${hora}`);
  }

  // CRUD Methods
  getFunciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getFuncion(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  saveFuncion(funcion: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, funcion);
  }

  updateFuncion(id: number, funcion: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, funcion);
  }

  deleteFuncion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
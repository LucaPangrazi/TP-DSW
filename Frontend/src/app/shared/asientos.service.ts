import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AsientosService {
  private asientosSeleccionados: { fila: number; columna: number }[] = [];
  private apiUrl = environment.endpoint + 'api/funciones';

  private datosPeliculaSubject = new BehaviorSubject<{
    pelicula: { id: number; nombre: string };
    fecha: string;
    hora?: string;
  }>({
    pelicula: { id: 0, nombre: '' },
    fecha: '',
    hora: '',
  });

  obtenerDatosPelicula$ = this.datosPeliculaSubject.asObservable();

  constructor(private http: HttpClient) {}

  setAsientosSeleccionados(asientos: { fila: number; columna: number }[]): void {
    this.asientosSeleccionados = asientos;
  }

  obtenerAsientosSeleccionados(): { fila: number; columna: number }[] {
    return this.asientosSeleccionados;
  }

  setDatosPelicula(datos: { pelicula: { id: number; nombre: string }; fecha: string; hora?: string }): void {
    console.log('Antes de actualizar datos de película:', this.datosPeliculaSubject.getValue());
    this.datosPeliculaSubject.next(datos);
    console.log('Datos de la película actualizados:', datos);
  }

  obtenerDatosPelicula(): { pelicula: { id: number; nombre: string }; fecha: string; hora?: string } {
    return this.datosPeliculaSubject.getValue();
  }

  // Guardar asientos ocupados en el backend
  guardarAsientos(funtion_id: number, seat_codes: string[]): Observable<any> {
    console.log('Saving seats:', { funtion_id, seat_codes });
    return this.http.post(`${this.apiUrl}/guardar-asientos`, {
      funtion_id,
      seat_codes
    });
  }
}
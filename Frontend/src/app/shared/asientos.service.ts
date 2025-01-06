import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsientosService {
  private asientosSeleccionados: { fila: number; columna: number }[] = [];

  // Inicializar BehaviorSubject con un valor predeterminado
  private datosPeliculaSubject = new BehaviorSubject<{ pelicula: string; fecha: string }>({
    pelicula: '',
    fecha: '',
  });

  obtenerDatosPelicula$ = this.datosPeliculaSubject.asObservable();

  constructor() {}

  setAsientosSeleccionados(asientos: { fila: number; columna: number }[]): void {
    this.asientosSeleccionados = asientos;
  }

  obtenerAsientosSeleccionados(): { fila: number; columna: number }[] {
    return this.asientosSeleccionados;
  }

  setDatosPelicula(datos: { pelicula: string; fecha: string }): void {
    console.log('Antes de actualizar datos de película:', this.datosPeliculaSubject.getValue());
    this.datosPeliculaSubject.next(datos); 
    console.log('Datos de la película actualizados:', datos);
  }

  obtenerDatosPelicula(): { pelicula: string; fecha: string } {
    return this.datosPeliculaSubject.getValue();
  }
}

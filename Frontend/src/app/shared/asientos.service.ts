import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsientosService {
  private asientosSeleccionados: { fila: number; columna: number }[] = [];
  private datosPelicula: { pelicula: string; fecha: string } = {
    pelicula: 'Película predeterminada', // Valor predeterminado
    fecha: '2024-01-01' // Valor predeterminado
  };

  constructor() {}

  // Guardar los asientos seleccionados
  setAsientosSeleccionados(asientos: { fila: number; columna: number }[]): void {
    this.asientosSeleccionados = asientos;
  }

  // Recuperar los asientos seleccionados
  obtenerAsientosSeleccionados(): { fila: number; columna: number }[] {
    return this.asientosSeleccionados;
  }

  obtenerDatosCompra() {
    return {
      pelicula: this.datosPelicula.pelicula,
      fecha: this.datosPelicula.fecha,
      asientos: this.asientosSeleccionados
    };
  }
  

  // Guardar los datos de la película seleccionada
  setDatosPelicula(datos: { pelicula: string; fecha: string }): void {
    this.datosPelicula = datos;
    console.log('Datos de la película actualizados:', this.datosPelicula);
  }

  // Recuperar los datos de la película seleccionada
  obtenerDatosPelicula(): { pelicula: string; fecha: string } {
    return this.datosPelicula;
  }
}

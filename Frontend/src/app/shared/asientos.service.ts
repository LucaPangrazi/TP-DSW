import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsientosService {
  private asientosSeleccionados: { fila: number; columna: number }[] = [];

  constructor() {}

  // Guardar los asientos seleccionados
  setAsientosSeleccionados(asientos: { fila: number; columna: number }[]): void {
    this.asientosSeleccionados = asientos;
  }

  // Recuperar los asientos seleccionados
  obtenerAsientosSeleccionados(): { fila: number; columna: number }[] {
    return this.asientosSeleccionados;
  }
}

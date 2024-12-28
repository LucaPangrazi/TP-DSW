import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seleccion-asientos',
  templateUrl: './seleccion-asientos.component.html',
  styleUrls: ['./seleccion-asientos.component.css']
})
export class SeleccionAsientosComponent implements OnInit {
  // Matriz que representa los asientos de la sala
  asientos: { estado: 'disponible' | 'ocupado' | 'seleccionado' }[][] = [];

  // Filas y columnas de la sala
  filas = 5;
  columnas = 8;

  constructor() {}

  ngOnInit(): void {
    // Inicializar la matriz de asientos
    this.generarAsientos();
  }

  // Generar asientos con estado "disponible" y algunos ocupados aleatoriamente
  generarAsientos() {
    for (let i = 0; i < this.filas; i++) {
      const fila: { estado: 'disponible' | 'ocupado' | 'seleccionado' }[] = [];
      for (let j = 0; j < this.columnas; j++) {
        const ocupado = Math.random() < 0.2; // 20% de probabilidad de estar ocupado
        fila.push({ estado: ocupado ? 'ocupado' : 'disponible' });
      }
      this.asientos.push(fila);
    }
  }

  // Manejar la selección de un asiento
  seleccionarAsiento(filaIndex: number, colIndex: number) {
    const asiento = this.asientos[filaIndex][colIndex];
    if (asiento.estado === 'disponible') {
      asiento.estado = 'seleccionado';
    } else if (asiento.estado === 'seleccionado') {
      asiento.estado = 'disponible'; // Desmarcar si ya estaba seleccionado
    }
  }

  // Verificar si hay asientos seleccionados
  haySeleccionados(): boolean {
    return this.asientos.some(fila => fila.some(asiento => asiento.estado === 'seleccionado'));
  }
}

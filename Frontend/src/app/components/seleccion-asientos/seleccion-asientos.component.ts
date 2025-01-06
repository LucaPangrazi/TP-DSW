import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsientosService } from '../../shared/asientos.service';

@Component({
  selector: 'app-seleccion-asientos',
  templateUrl: './seleccion-asientos.component.html',
  styleUrls: ['./seleccion-asientos.component.css']
})
export class SeleccionAsientosComponent implements OnInit {
  asientos: { estado: 'disponible' | 'ocupado' | 'seleccionado' }[][] = [];
  filas = 5;
  columnas = 8;

  // Propiedades necesarias para el HTML
  fechaSeleccionada: string = ''; // No permitimos que sea null
  fechaMinima: string; // Representa la fecha mínima permitida para la selección

  constructor(private router: Router, private asientosService: AsientosService) {
    // Establecer la fecha mínima como la fecha actual
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
  }

  ngOnInit(): void {
    this.generarAsientos();
  }

  // Genera la matriz de asientos con algunos ocupados aleatoriamente
  generarAsientos() {
    for (let i = 0; i < this.filas; i++) {
      const fila: { estado: 'disponible' | 'ocupado' | 'seleccionado' }[] = [];
      for (let j = 0; j < this.columnas; j++) {
        const ocupado = Math.random() < 0.2; // 20% de probabilidad de que un asiento esté ocupado
        fila.push({ estado: ocupado ? 'ocupado' : 'disponible' });
      }
      this.asientos.push(fila);
    }
  }

  // Cambia el estado de un asiento cuando se selecciona
  seleccionarAsiento(filaIndex: number, colIndex: number) {
    const asiento = this.asientos[filaIndex][colIndex];
    if (asiento.estado === 'disponible') {
      asiento.estado = 'seleccionado';
    } else if (asiento.estado === 'seleccionado') {
      asiento.estado = 'disponible';
    }
  }

  // Verifica si hay asientos seleccionados
  haySeleccionados(): boolean {
    return this.asientos.some(fila => fila.some(asiento => asiento.estado === 'seleccionado'));
  }

  // Obtiene una lista de los asientos seleccionados
  getAsientosSeleccionados(): { fila: number; columna: number }[] {
    const seleccionados: { fila: number; columna: number }[] = [];
    this.asientos.forEach((fila, filaIndex) => {
      fila.forEach((asiento, colIndex) => {
        if (asiento.estado === 'seleccionado') {
          seleccionados.push({ fila: filaIndex, columna: colIndex });
        }
      });
    });
    return seleccionados;
  }

  // Navega al formulario de compra con los asientos seleccionados
  continuarAFormulario(): void {
    if (!this.fechaSeleccionada) {
      alert('Por favor, selecciona una fecha antes de continuar.');
      return;
    }

    const seleccionados = this.getAsientosSeleccionados();
    this.asientosService.setAsientosSeleccionados(seleccionados);
    const id = this.obtenerIdDeSeleccion();
    this.asientosService.setDatosPelicula({
      pelicula: this.asientosService.obtenerDatosPelicula().pelicula, // Ajusta según tu lógica
      fecha: this.fechaSeleccionada // Ya no puede ser null
    });
    this.router.navigate([`/comprar-entrada/${id}`]);
  }

  obtenerIdDeSeleccion(): number {
    // Aquí deberías obtener el id de la película, sala o lo que sea relevante para tu aplicación
    return 123; // Este valor debería ser dinámico según tu lógica
  }
}

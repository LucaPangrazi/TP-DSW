import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsientosService } from '../../shared/asientos.service';
import { FuncionesService } from '../../services/funciones.service'; // Asegurate de que la ruta sea correcta

@Component({
  selector: 'app-seleccion-asientos',
  templateUrl: './seleccion-asientos.component.html',
  styleUrls: ['./seleccion-asientos.component.css']
})
export class SeleccionAsientosComponent implements OnInit {
  asientos: { estado: 'disponible' | 'ocupado' | 'seleccionado' }[][] = [];
  filas = 5;
  columnas = 8;

  fechaSeleccionada: string = '';
  horaSeleccionada: string = '';

  constructor(
    private router: Router,
    private asientosService: AsientosService,
    private funcionesService: FuncionesService
  ) { }

  ngOnInit(): void {
    const datos = this.asientosService.obtenerDatosPelicula();
    if (datos.fecha) {
      this.fechaSeleccionada = datos.fecha;
    }
    if (datos.hora) {
      this.horaSeleccionada = datos.hora;
    }

    this.generarAsientosVacios();
    this.cargarAsientosOcupados();
  }

  generarAsientosVacios(): void {
    this.asientos = [];
    for (let i = 0; i < this.filas; i++) {
      const fila: { estado: 'disponible' | 'ocupado' | 'seleccionado' }[] = [];
      for (let j = 0; j < this.columnas; j++) {
        fila.push({ estado: 'disponible' });
      }
      this.asientos.push(fila);
    }
  }

  cargarAsientosOcupados(): void {
    const datos = this.asientosService.obtenerDatosPelicula();
    if (!datos.pelicula || !datos.fecha) return;

    // Usar hora seleccionada o buscar hora guardada
    const hora = datos.hora || this.horaSeleccionada;

    if (datos.pelicula.id && datos.fecha && hora) {
      this.funcionesService.obtenerAsientos(datos.pelicula.id, datos.fecha, hora).subscribe(
        (occupiedCodes: string[]) => {
          occupiedCodes.forEach(code => {
            const [rowStr, colStr] = code.split('-');
            const row = parseInt(rowStr, 10);
            const col = parseInt(colStr, 10);
            if (row >= 0 && row < this.filas && col >= 0 && col < this.columnas) {
              this.asientos[row][col].estado = 'ocupado';
            }
          });
        },
        error => console.error('Error al encontrar asientos', error)
      );
    }
  }

  seleccionarAsiento(filaIndex: number, colIndex: number): void {
    const asiento = this.asientos[filaIndex][colIndex];
    if (asiento.estado === 'disponible') {
      asiento.estado = 'seleccionado';
    } else if (asiento.estado === 'seleccionado') {
      asiento.estado = 'disponible';
    }
  }

  haySeleccionados(): boolean {
    return this.asientos.some(fila => fila.some(asiento => asiento.estado === 'seleccionado'));
  }

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

  continuarAFormulario(): void {
    const seleccionados = this.getAsientosSeleccionados();

    this.asientosService.setAsientosSeleccionados(seleccionados);

    const datosActuales = this.asientosService.obtenerDatosPelicula();

    this.asientosService.setDatosPelicula({
      pelicula: {
        id: datosActuales.pelicula.id,
        nombre: datosActuales.pelicula.nombre
      },
      fecha: this.fechaSeleccionada,
      hora: this.horaSeleccionada
    });

    this.obtenerIdDeSeleccion();
  }

  obtenerIdDeSeleccion(): void {
    const datos = this.asientosService.obtenerDatosPelicula();
    const peliculaId = datos.pelicula.id;
    const fecha = datos.fecha;
    const hora = datos.hora ?? this.horaSeleccionada;

    this.funcionesService.obtenerFuncionPorDatos(peliculaId, fecha, hora)
      .subscribe({
        next: (respuesta) => {
          const idFuncion = respuesta.id_funcion;
          this.router.navigate([`/comprar-entrada/${idFuncion}`]);
        },
        error: (error) => {
          console.error('Error obteniendo ID de función:', error);
          alert('No se pudo encontrar la función seleccionada.');
        }
      });
  }
}

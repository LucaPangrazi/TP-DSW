import { Component, OnInit } from '@angular/core';
import { AsientosService } from '../../shared/asientos.service';

@Component({
  selector: 'app-comprar-entrada',
  templateUrl: './comprar-entrada.component.html',
  styleUrls: ['./comprar-entrada.component.css']
})
export class ComprarEntradaComponent implements OnInit {
  formData = {
    email: '',
    cantidad: 1
  };

  mostrarResumen = false;

  resumenCompra: {
    pelicula: string;
    fecha: string;
    asientos: { fila: number; columna: number }[];
    cantidad: number;
    email: string;
  } | null = null;

  constructor(private asientosService: AsientosService) {}

  ngOnInit(): void {
    const datosCompra = this.asientosService.obtenerDatosCompra();
    console.log('Datos obtenidos para el resumen:', datosCompra);
    this.resumenCompra = {
      pelicula: datosCompra.pelicula || 'Película no definida',
      fecha: datosCompra.fecha || 'Fecha no definida',
      asientos: datosCompra.asientos || [],
      cantidad: 0, // Se actualizará desde el formulario
      email: '' // Se actualizará desde el formulario
    };
  }

  // Muestra el resumen de la compra
  verResumen(): void {
    if (this.resumenCompra) {
      this.resumenCompra.cantidad = this.formData.cantidad;
      this.resumenCompra.email = this.formData.email;
      this.mostrarResumen = true;
    }
  }

  // Confirmar compra y proceder a generar QR
  confirmarCompra(): void {
    if (this.resumenCompra) {
      console.log('Generando QR y enviando correo:', this.resumenCompra);
      // Aquí puedes implementar la lógica para enviar el QR
    }
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsientosService } from '../../shared/asientos.service';
import { FuncionesService } from '../../services/funciones.service';
import { HttpClient } from '@angular/common/http';
import * as QRCode from 'qrcode';
// import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-comprar-entrada',
  templateUrl: './comprar-entrada.component.html',
  styleUrls: ['./comprar-entrada.component.css'],
})
export class ComprarEntradaComponent implements OnInit {
  peliculaSeleccionada: { pelicula: { id: number; nombre: string }; fecha: string; hora?: string } | null = null;
  formData = {
    cantidad: 1,
  };

  mostrarResumen = false;
  resumenCompra: ResumenCompra | null = null;
  qrData: string = '';
  compraConfirmada: boolean = false;

  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private asientosService: AsientosService,
    private funcionesService: FuncionesService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const peliculaId = this.activatedRoute.snapshot.paramMap.get('id');

    if (peliculaId) {
      const pelicula = this.asientosService.obtenerDatosPelicula();
      this.peliculaSeleccionada = pelicula;
      this.verResumen(); // Auto-calculate summary
    }

    this.asientosService.obtenerDatosPelicula$.subscribe((datos) => {
      this.peliculaSeleccionada = datos;
      if (this.peliculaSeleccionada?.pelicula.id) {
        this.verResumen();
      }
    });
  }

  verResumen(): void {
    if (this.peliculaSeleccionada && this.peliculaSeleccionada.pelicula.id) {
      const asientosSeleccionados = this.asientosService.obtenerAsientosSeleccionados() || [];
      const cantidadAsientos = asientosSeleccionados.length;

      const precioUnitario = 3000;
      const cant2x1 = Math.floor(cantidadAsientos / 2);
      const cantNormal = cantidadAsientos % 2;

      const total = (cant2x1 * precioUnitario) + (cantNormal * precioUnitario);

      this.resumenCompra = {
        pelicula: this.peliculaSeleccionada.pelicula.nombre,
        fecha: this.peliculaSeleccionada.fecha,
        cantidad: cantidadAsientos,
        asientos: asientosSeleccionados,
        cant2x1,
        cantNormal,
        total
      };

      this.mostrarResumen = true;
    }
  }

  confirmarCompra(): void {
    if (!this.resumenCompra) return;

    // Convertir asientos a formato "fila-columna"
    const seat_codes = this.resumenCompra.asientos.map(a => `${a.fila}-${a.columna}`);

    console.log('Confirming purchase with seats:', seat_codes);

    // Obtener el ID de la función
    const peliculaId = this.peliculaSeleccionada?.pelicula.id;
    const fecha = this.peliculaSeleccionada?.fecha;
    const hora = this.peliculaSeleccionada?.hora;

    if (!peliculaId || !fecha || !hora) {
      alert('Error: Faltan datos de la función');
      return;
    }

    // Obtener el ID de la función
    this.funcionesService.obtenerFuncionPorDatos(peliculaId, fecha, hora).subscribe({
      next: (respuesta: any) => {
        const funtion_id = respuesta.id_funcion;
        console.log('Function ID:', funtion_id);

        // Guardar asientos
        this.asientosService.guardarAsientos(funtion_id, seat_codes).subscribe({
          next: (response: any) => {
            console.log('Seats saved successfully:', response);
            this.compraConfirmada = true;
            this.generarQR();
          },
          error: (error: any) => {
            console.error('Error saving seats:', error);
            alert('Error al guardar asientos: ' + (error?.error?.msg || error?.error?.error || 'Error desconocido'));
          }
        });
      },
      error: (error: any) => {
        console.error('Error getting function ID:', error);
        alert('Error obteniendo datos de la función');
      }
    });
  }

  generarQR(): void {
    if (!this.resumenCompra) return;

    // Construct QR Data exactly as requested
    const asientosStr = this.resumenCompra.asientos
      .map(a => `Fila ${a.fila + 1} - Columna ${a.columna + 1}`)
      .join(', ');

    this.qrData = `
Película: ${this.resumenCompra.pelicula}
Fecha: ${this.resumenCompra.fecha}
Total de Entradas: ${this.resumenCompra.cantidad}
Asientos: ${asientosStr}
Promoción 2x1 aplicada: ${this.resumenCompra.cant2x1} combos (${this.resumenCompra.cant2x1 * 2} entradas)
Total a Pagar: $${this.resumenCompra.total}
    `.trim();

    // Generate QR on the canvas
    setTimeout(() => {
      if (this.qrCanvas?.nativeElement) {
        QRCode.toCanvas(this.qrCanvas.nativeElement, this.qrData, {
          width: 256,
          errorCorrectionLevel: 'M'
        }, function (error: any) {
          if (error) console.error('QR Error:', error);
          else console.log('QR Code generated successfully!');
        });
      }
    }, 100);
  }

  descargarPDF(): void {
    if (!this.resumenCompra || !this.qrCanvas) return;

    /*
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Resumen de Compra - Cinetix', 20, 20);

    doc.setFontSize(12);
    doc.text(`Película: ${this.resumenCompra.pelicula}`, 20, 40);
    doc.text(`Fecha: ${this.resumenCompra.fecha}`, 20, 50);
    doc.text(`Total Entradas: ${this.resumenCompra.cantidad}`, 20, 60);

    const asientosStr = this.resumenCompra.asientos
      .map(a => `F ${a.fila + 1} - C ${a.columna + 1}`).join(', ');
    doc.text(`Asientos: ${asientosStr}`, 20, 70);

    doc.text(`Total Pagado: $${this.resumenCompra.total}`, 20, 90);

    // Add QR
    const canvas = this.qrCanvas.nativeElement;
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 20, 100, 50, 50);

    doc.save('Entrada_Cinetix.pdf');
    */
    alert('Función PDF temporalmente deshabilitada para mantenimiento.');
  }

  hasAsientosSeleccionados(): boolean {
    return (this.resumenCompra?.asientos?.length ?? 0) > 0;
  }
}

interface ResumenCompra {
  pelicula: string;
  fecha: string;
  cantidad: number;
  asientos: { fila: number; columna: number }[];
  cant2x1: number;
  cantNormal: number;
  total: number;
}

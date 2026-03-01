import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AsientosService } from '../../shared/asientos.service';
import { FuncionesService } from '../../services/funciones.service';
import { HttpClient } from '@angular/common/http';
import * as QRCode from 'qrcode';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

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

  mostrarModal: boolean = false;
  loadingEmail: boolean = false;
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private asientosService: AsientosService,
    private funcionesService: FuncionesService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const peliculaId = this.activatedRoute.snapshot.paramMap.get('id');

    if (peliculaId) {
      const pelicula = this.asientosService.obtenerDatosPelicula();
      this.peliculaSeleccionada = pelicula;
      this.verResumen(); // Calculo automatico de los asientos
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

    // Convierto asientos a formato "fila-columna"
    const seat_codes = this.resumenCompra.asientos.map(a => `${a.fila}-${a.columna}`);

    console.log('Confirmacion de compra con asientos:', seat_codes);

    // Obtengo ID de la función
    const peliculaId = this.peliculaSeleccionada?.pelicula.id;
    const fecha = this.peliculaSeleccionada?.fecha;
    const hora = this.peliculaSeleccionada?.hora;

    if (!peliculaId || !fecha || !hora) {
      alert('Error: Faltan datos de la función');
      return;
    }

    // Obtengo ID de la función
    this.funcionesService.obtenerFuncionPorDatos(peliculaId, fecha, hora).subscribe({
      next: (respuesta: any) => {
        const funtion_id = respuesta.id_funcion;
        console.log('ID de la función:', funtion_id);

        // Guardar asientos
        this.asientosService.guardarAsientos(funtion_id, seat_codes).subscribe({
          next: (response: any) => {
            console.log('Asientos guardados correctamente:', response);
            this.compraConfirmada = true;
            this.generarQR();
          },
          error: (error: any) => {
            console.error('Error al guardar asientos:', error);
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

    // QR
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

    // Generar QR
    setTimeout(() => {
      if (this.qrCanvas?.nativeElement) {
        QRCode.toCanvas(this.qrCanvas.nativeElement, this.qrData, {
          width: 256,
          errorCorrectionLevel: 'M'
        }, function (error: any) {
          if (error) console.error('QR Error:', error);
          else console.log('Codigo QR generado correctamente');
        });
      }
    }, 100);
  }

  abrirModalEmail(): void {
    this.emailControl.reset();
    this.mostrarModal = true;
  }

  cerrarModalEmail(): void {
    this.mostrarModal = false;
  }

  enviarResumen(): void {
    if (this.emailControl.invalid) {
      this.emailControl.markAsTouched();
      return;
    }

    const peliculaId = this.peliculaSeleccionada?.pelicula.id;
    if (!peliculaId) return;

    this.loadingEmail = true;
    const email = this.emailControl.value;
    const payload = {
      email,
      resumenCompra: this.resumenCompra
    };

    console.log('Sending email request with payload:', payload);

    this.http.post(`${environment.endpoint}api/comprar-entrada/${peliculaId}/enviar-resumen`, payload).subscribe({
      next: () => {
        this.toastr.success('Correo enviado correctamente');
        this.loadingEmail = false;
        this.cerrarModalEmail();
      },
      error: (error) => {
        console.error('Error enviando correo', error);
        this.toastr.error('Error al enviar el correo');
        this.loadingEmail = false;
      }
    });
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

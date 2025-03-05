import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsientosService } from '../../shared/asientos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comprar-entrada',
  templateUrl: './comprar-entrada.component.html',
  styleUrls: ['./comprar-entrada.component.css'],
})
export class ComprarEntradaComponent implements OnInit {
  peliculaSeleccionada: { pelicula: string; fecha: string } | null = null;
  formData = {
    email: '',
    cantidad: 1,
  };

  mostrarResumen = false;

  resumenCompra: {
    pelicula: string;
    fecha: string;
    cantidad: number;
    email: string;
    asientos: { fila: number; columna: number }[];
  } | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private asientosService: AsientosService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const peliculaId = this.activatedRoute.snapshot.paramMap.get('id');

    if (peliculaId) {
      const pelicula = this.asientosService.obtenerDatosPelicula();
      this.peliculaSeleccionada = pelicula;
    }

    this.asientosService.obtenerDatosPelicula$.subscribe((datos) => {
      this.peliculaSeleccionada = datos;
    });
  }

  verResumen(): void {
    if (this.peliculaSeleccionada) {
      const asientosSeleccionados = this.asientosService.obtenerAsientosSeleccionados() || [];

      this.resumenCompra = {
        pelicula: this.peliculaSeleccionada.pelicula,
        fecha: this.peliculaSeleccionada.fecha,
        cantidad: this.formData.cantidad,
        email: this.formData.email,
        asientos: asientosSeleccionados,
      };

      this.mostrarResumen = true;
    } else {
      console.error('No hay película seleccionada');
    }
  }

  confirmarCompra(): void {
    if (this.resumenCompra) {
      console.log('Enviando correo:', this.resumenCompra);

      this.http.post('http://localhost:3000/api/enviar-correo', this.resumenCompra)
        .subscribe(
          (response) => {
            console.log('Correo enviado con éxito:', response);
            alert('Correo enviado con éxito.');
          },
          (error) => {
            console.error('Error al enviar el correo:', error);
            alert('Hubo un error al enviar el correo.');
          }
        );
    }
  }

  hasAsientosSeleccionados(): boolean {
    return (this.resumenCompra?.asientos?.length ?? 0) > 0 || false;
  }
}

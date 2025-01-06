import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Importa ActivatedRoute
import { AsientosService } from '../../shared/asientos.service';

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
    private activatedRoute: ActivatedRoute,  // Inyecta ActivatedRoute
    private asientosService: AsientosService
  ) {}

  ngOnInit(): void {
    // Leemos el parámetro de la URL (id)
    const peliculaId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('ID de la película desde la URL:', peliculaId);

    if (peliculaId) {
      // Aquí puedes usar el ID para obtener los detalles de la película (puedes usar el índice o buscar la película de alguna forma)
      const pelicula = this.asientosService.obtenerDatosPelicula();  // Ya tienes los datos guardados en el servicio
      console.log('Datos de la película seleccionada:', pelicula);
      this.peliculaSeleccionada = pelicula;
    }

    // Suscripción al servicio para obtener los datos de la película
    this.asientosService.obtenerDatosPelicula$.subscribe((datos) => {
      console.log('Datos recuperados de la película:', datos);
      this.peliculaSeleccionada = datos;
    });
  }

  verResumen(): void {
    if (this.peliculaSeleccionada) {
      const asientosSeleccionados =
        this.asientosService.obtenerAsientosSeleccionados() || [];

        
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
      console.log('Generando QR y enviando correo:', this.resumenCompra);
      // Lógica para enviar correo o procesar compra
    }
  }

  hasAsientosSeleccionados(): boolean {
    return (
      this.resumenCompra?.asientos != null &&
      this.resumenCompra.asientos.length > 0
    );
  }
}

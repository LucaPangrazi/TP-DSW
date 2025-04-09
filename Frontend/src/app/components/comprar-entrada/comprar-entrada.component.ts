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
    cantidad: 1,
  };

  mostrarResumen = false;

  resumenCompra: {
    pelicula: string;
    fecha: string;
    cantidad: number;
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
        asientos: asientosSeleccionados,
      };

      this.mostrarResumen = true;
    } else {
      console.error('No hay película seleccionada');
    }
  }

  
  hasAsientosSeleccionados(): boolean {
    return (this.resumenCompra?.asientos?.length ?? 0) > 0 || false;
  }
}

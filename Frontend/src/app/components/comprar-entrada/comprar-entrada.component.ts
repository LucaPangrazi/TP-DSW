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
  peliculaSeleccionada: { pelicula: { id: number; nombre: string }; fecha: string; hora?: string } | null = null;
  formData = {
    cantidad: 1,
  };

  mostrarResumen = false;

  resumenCompra: ResumenCompra | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private asientosService: AsientosService,
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
      if (this.peliculaSeleccionada.pelicula.id) {
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

  confirmarCompra() {
    alert('¡Compra realizada con éxito! Disfrutá la película.');
    // Here we would call the backend to save the tickets.
  }

  hasAsientosSeleccionados(): boolean {
    return (this.resumenCompra?.asientos?.length ?? 0) > 0 || false;
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionesService } from '../../services/funciones.service';
import { AsientosService } from '../../shared/asientos.service';
import { SucursalService } from '../../services/sucursal.service';
import { Sucursal } from '../../interfaces/sucursal';

@Component({
  selector: 'app-seleccion-funcion',
  templateUrl: './seleccion-funcion.component.html',
  styleUrls: ['./seleccion-funcion.component.css']
})
export class SeleccionFuncionComponent implements OnInit {
  fechaSeleccionada: string = '';
  fechaMinima: string;
  horaSeleccionada: string = '';
  horariosDisponibles: string[] = [];
  sucursalesDisponibles: Sucursal[] = []; 
  sucursaSeleccionada: string = ''; 


  constructor(
    private router: Router,
    private funcionesService: FuncionesService,
    private asientosService: AsientosService,
    private sucursalService: SucursalService
  ) {
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.sucursalService.getListSucursales().subscribe(
      (data: Sucursal[]) => {
        this.sucursalesDisponibles = data;
      },
      (error) => {
        console.error('Error al cargar las sucursales:', error);
      }
    );
  }

  onFechaSeleccionada(): void {
    if (!this.fechaSeleccionada) return;

    const pelicula = this.asientosService.obtenerDatosPelicula()?.pelicula;
    if (!pelicula?.id) return;

    this.funcionesService.obtenerHorarios(pelicula.id, this.fechaSeleccionada)
      .subscribe(horarios => {
        this.horariosDisponibles = horarios;
      });
  }

  continuarAFormulario(): void {
    if (!this.fechaSeleccionada || !this.horaSeleccionada) {
      alert('Por favor, seleccioná fecha y hora antes de continuar.');
      return;
    }

    const datosActuales = this.asientosService.obtenerDatosPelicula();

    this.asientosService.setDatosPelicula({
      pelicula: {
        id: datosActuales.pelicula.id,
        nombre: datosActuales.pelicula.nombre
      },
      fecha: this.fechaSeleccionada,
      hora: this.horaSeleccionada
    });

    this.router.navigate(['/seleccion-asientos']);
  }
}

import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { Router } from '@angular/router';
import { AsientosService } from '../../shared/asientos.service';

@Component({
  selector: 'app-comprar-entrada',
  templateUrl: './comprar-entrada.component.html',
  styleUrls: ['./comprar-entrada.component.css']
})
export class ComprarEntradaComponent implements OnInit {
  asientosSeleccionados: { fila: number; columna: number }[] = [];
  formData = {
    nombre: '',
    apellido: '',
    email: '',
    fecha: '',
    cantidad: 1
  };

  constructor(private router: Router, private asientosService: AsientosService) {}

  ngOnInit(): void {
    // Obtener los asientos seleccionados desde el servicio
    this.asientosSeleccionados = this.asientosService.obtenerAsientosSeleccionados();
    console.log('Asientos seleccionados:', this.asientosSeleccionados);
  }

  onSubmit(): void {
    console.log('Datos del formulario:', this.formData);
    alert('Compra realizada con éxito');
    this.router.navigate(['/cartelera']);
  }
}

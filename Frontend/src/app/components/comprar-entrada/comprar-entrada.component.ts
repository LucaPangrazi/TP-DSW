import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comprar-entrada',
  templateUrl: './comprar-entrada.component.html',
  styleUrls: ['./comprar-entrada.component.css']
})
export class ComprarEntradaComponent {
  formData = {
    nombre: '',
    apellido: '',
    email: '',
    fecha: '',
    cantidad: 1
  };

  constructor(private router: Router) {}

  onSubmit(): void {
    console.log('Datos del formulario:', this.formData);
    // Aquí puedes procesar los datos o enviarlos a un servicio
    alert('Compra realizada con éxito');
    this.router.navigate(['/cartelera']); // Regresar a la cartelera o a otra página
  }
}

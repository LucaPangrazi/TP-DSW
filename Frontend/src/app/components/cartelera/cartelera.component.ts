// Importa el archivo de estilos CSS
import './cartelera-styles.css';

import { Component } from '@angular/core';

@Component({
  selector: 'app-cartelera',
  template: `
    <!-- Agrega aquí el contenido HTML de tu componente -->
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h1>¡Bienvenido a la Cartelera!</h1>
        <p>Descubre las últimas películas en exhibición.</p>
      </div>

      <div>
        <button routerLink="/login" class="btn btn-primary">Ir a Login</button>
      </div>
    </div>
  `,
  styleUrls: ['./cartelera-styles.css'],
})
export class CarteleraComponent {
  // Puedes agregar lógica aquí si es necesario
}

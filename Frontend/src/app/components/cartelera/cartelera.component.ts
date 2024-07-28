import { Component, OnInit } from '@angular/core';
import { CarteleraService } from '../../services/cartelera.service';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {
  images: string[] = [];

  constructor(private carteleraService: CarteleraService) {}

  ngOnInit(): void {
    this.carteleraService.getImages().subscribe(
      (data: string[]) => {
        // Construir URLs completas para las imágenes
        this.images = data.map(image => `http://localhost:3000${image}`);
      },
      (error) => {
        console.error('Error al cargar imágenes:', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  showSecondNavbar = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Lea la propiedad 'data' de la ruta actual para mostrar la segunda barra de navegación
        this.showSecondNavbar = this.activatedRoute.snapshot.firstChild?.data['showSecondNavbar'] || false;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SearchService } from './shared/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  showSecondNavbar = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) {}

  handleSearch(value: string) {
    console.log('Término de búsqueda:', value);
    this.searchService.setSearchTerm(value); // Asegúrate de que setSearchTerm maneje un string
  }
  
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Leer la propiedad 'data' de la ruta actual para mostrar la segunda barra de navegación
        this.showSecondNavbar = this.activatedRoute.snapshot.firstChild?.data['showSecondNavbar'] || false;
      }
    });
  }
}

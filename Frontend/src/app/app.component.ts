import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './shared/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Frontend';
  showSecondNavbar = false;

  constructor(private router: Router,
    private _http: HttpClient,
     private activatedRoute: ActivatedRoute,
     private searchService: SearchService) {}

  handleSearch(value: string) {
    
    console.log(value);
  
   
    this.searchService.setSearchTerm(value);
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

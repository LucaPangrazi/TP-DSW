import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit{
  searchTerm: string = '';
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  searchMovies() {
    console.log('Buscando películas con término:', this.searchTerm);
    this.searchService.setSearchTerm(this.searchTerm);
  }
}

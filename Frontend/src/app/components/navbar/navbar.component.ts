import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SearchService } from '../../shared/search.service';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchForm: FormGroup | undefined;
  search = new FormControl('');
  showNavbar: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });

    this.searchForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => this.searchEmitter.emit(value.search || ''));

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('/cartelera');
      }
    });
  }

  @Output() searchEmitter = new EventEmitter<string>();

  searchMovies(): void {
    const searchTerm = this.searchForm?.get('search')?.value || '';
    console.log('Buscando término:', searchTerm);
    this.searchEmitter.emit(searchTerm); // Emitir searchTerm como un string
  }
}

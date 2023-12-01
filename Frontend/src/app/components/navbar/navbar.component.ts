import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../shared/search.service';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit{
  searchForm: FormGroup | undefined;
  search = new FormControl('');
  constructor(private searchService: SearchService) {}
 
  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('') // Agrega 'search' al html
    });
  
    this.searchForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => this.searchEmitter.emit(value.search || ''));
  }
@Output('search') searchEmitter = new EventEmitter<string>();
searchMovies(): void {
  const searchTerm = this.searchForm?.get('search')?.value || '';
  console.log('Buscando termino:', searchTerm);
  this.searchService.setSearchTerm(searchTerm);
}
}

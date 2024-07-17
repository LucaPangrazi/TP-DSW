import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchTerm$: Observable<string> = this.searchTermSubject.asObservable();
//Permite que otras partes del codigo se subscriban a cambios en termino de busqueda
  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }
}

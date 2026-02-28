import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SearchService } from '../../shared/search.service';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchForm: FormGroup | undefined;
  search = new FormControl('');
  showNavbar: boolean = true;
  showSearchInput: boolean = true;
  userRole: string = '';
  userName: string = '';
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  private userSub: Subscription | undefined;
  private adminSub: Subscription | undefined;
  private isLoggedInSub: Subscription | undefined;

  @Output() searchEmitter = new EventEmitter<string>();

  constructor(
    private router: Router,
    private searchService: SearchService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });

    this.searchForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        const term = value.search || '';
        this.searchEmitter.emit(term);
        this.searchService.setSearchTerm(term);
      });

    // Mostrar u ocultar navbar según la ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('/login') && !event.url.includes('/register');
        // busca ingresando una ruta especifica
        this.showSearchInput = !event.url.includes('/seleccion-funcion') &&
          !event.url.includes('/pelicula/') &&
          !event.url.includes('/comprar-entrada/');
      }
    });

    // Subscribirse al usuario
    this.userSub = this.userService.user$.subscribe(user => {
      if (user) {
        this.userName = user.nombre || user.userName || '';
        const u = user as any;
        this.userRole = u.rol || user.role || '';
      } else {
        this.userName = '';
        this.userRole = '';
      }
    });

    // Subscribirse a admin
    this.adminSub = this.userService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    // Subscribirse a autenticación
    this.isLoggedInSub = this.userService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
    if (this.adminSub) this.adminSub.unsubscribe();
    if (this.isLoggedInSub) this.isLoggedInSub.unsubscribe();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate([route]);
  }

  onCarteleraClick(event: Event) {
    if (!this.isLoggedIn) {
      event.preventDefault();
      this.router.navigate(['/login']);
    }
  }

  onBrandClick(event: Event) {
    if (!this.isLoggedIn) {
      event.preventDefault();
      this.router.navigate(['/login']);
    }
  }

  searchMovies(): void {
    const searchTerm = this.searchForm?.get('search')?.value || '';
    this.searchEmitter.emit(searchTerm);
    this.searchService.setSearchTerm(searchTerm);
  }
}

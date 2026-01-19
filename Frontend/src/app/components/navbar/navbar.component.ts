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
  userRole: string = '';
  userName: string = '';
  isAdmin: boolean = false;

  private userSub: Subscription | undefined;
  private adminSub: Subscription | undefined;

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
      .subscribe(value => this.searchEmitter.emit(value.search || ''));

    // Mostrar u ocultar navbar según la ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('/login') && !event.url.includes('/register');
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
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
    if (this.adminSub) this.adminSub.unsubscribe();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  // ✅ Método que faltaba para navegar desde el navbar
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  searchMovies(): void {
    const searchTerm = this.searchForm?.get('search')?.value || '';
    this.searchEmitter.emit(searchTerm);
  }
}

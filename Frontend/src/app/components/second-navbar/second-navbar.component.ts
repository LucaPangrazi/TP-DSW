import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-second-navbar',
  templateUrl: './second-navbar.component.html',
  styleUrls: ['./second-navbar.component.css'],
})
export class SecondNavbarComponent implements OnInit, OnDestroy {
  userName: string = '';
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  private userSub: Subscription | undefined;
  private adminSub: Subscription | undefined;
  private isLoggedInSub: Subscription | undefined;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Subscribirse al usuario
    this.userSub = this.userService.user$.subscribe(user => {
      if (user) {
        this.userName = user.nombre || user.userName || '';
      } else {
        this.userName = '';
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
}
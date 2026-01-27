import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'
import { User } from '../interfaces/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users/';
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.userSubject.next(user);
        this.checkAdmin(user);
      } catch (e) {
        console.error('Error parsing user from storage', e);
        this.logout();
      }
    }
  }

  private checkAdmin(user: User | null) {
    if (!user) {
      this.isAdminSubject.next(false);
      this.isLoggedInSubject.next(false);
      return;
    }
    const u = user as any;
    const role = u.rol || user.role || '';
    this.isAdminSubject.next(role.toLowerCase() === 'admin');
    this.isLoggedInSubject.next(true);
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/register`, user);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/login`, user).pipe(
      tap(response => {
        // Handle different response structures based on backend
        const token = typeof response === 'string' ? response : response.token;
        let userData = typeof response === 'string' ? null : response.user;

        localStorage.setItem('token', token);

        if (!userData) {
          // If backend doesn't return user object, construct a basic one from input
          userData = {
            ...user,
            // Ensure consistent property names
            userName: user.userName
          };
        }

        localStorage.setItem('user', JSON.stringify(userData));
        this.userSubject.next(userData);
        this.checkAdmin(userData);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.isAdminSubject.next(false);
    this.isLoggedInSubject.next(false);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  getListUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.myAppUrl + this.myApiUrl);
  }

  updateUser(id: string, user: User): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, user);
  }
}
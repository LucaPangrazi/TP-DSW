import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { ErrorService } from '../../services/error.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  userName: string = '';
  dni:  string = '';
  telefono:  string = '';
  password: string = '';
  role: string = '';
  id: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
    ) { 
      
    }

  ngOnInit(): void {
  }

  login() {

    if (this.userName == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }


    const user: User = {
      nombre: this.nombre,
      apellido: this.apellido,
      userName: this.userName,
      dni: this.dni,
      telefono: this.telefono,
      password: this.password,
      role: this.role,
      id: this.id
    }

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard'])
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false
      }
    })
  }

  

}
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

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
  contraseña: string = '';
  role: string = '';
  id: number;
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
    id: number) { 
      this.id = id;
    }

  ngOnInit(): void {
  }

  login() {

    if (this.userName == '' || this.contraseña == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }


    const user: User = {
      nombre: this.nombre,
      apellido: this.apellido,
      userName: this.userName,
      dni: this.dni,
      telefono: this.telefono,
      contraseña: this.contraseña,
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
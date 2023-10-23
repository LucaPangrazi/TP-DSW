import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  dni: string = '';
  telefono: string = '';
  userName: string = '';
  contraseña: string = '';
  confirmarContraseña: string = '';
  role: string = '';
  id: number = ;
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService) { }

  ngOnInit(): void {
  }

  addUser() {

    // Validamos que el usuario ingrese valores
    if (this.userName == '' || this.contraseña == '' || this.confirmarContraseña == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Validamos que las password sean iguales
    if (this.contraseña != this.confirmarContraseña) {
      this.toastr.error('Las passwords ingresadas son distintas', 'Error');
      return;
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
    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`El usuario ${this.userName} fue registrado con exito`, 'Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    })
  }
}
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { ErrorService } from '../../services/error.service';
import { UserService } from '../../services/user.service';

function getUniqueId(parts: number): string{
  const stringArr = [];
  for (let i=0; i< parts; i++){
    const S4 = (((1+Math.random())*0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join('-');
}

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
  password: string = '';
  confirmarPassword: string = '';
  role: string = '';
  id: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
    private aRouter: ActivatedRoute
    ) { 
     
    }

  ngOnInit(): void {
  }

  addUser() {

    // Validamos que el usuario ingrese valores
    if (this.userName == '' || this.password == '' || this.confirmarPassword == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Validamos que las password sean iguales
    if (this.password != this.confirmarPassword) {
      this.toastr.error('Las passwords ingresadas son distintas', 'Error');
      return;
    }

    
    const user: User = {
      nombre: this.nombre,
      apellido: this.apellido,
      userName: this.userName,
      dni: this.dni,
      telefono: this.telefono,
      password: this.password,
      role: this.role,
      id: getUniqueId(5)
    }

    this.loading = true;
    this._userService.register(user).subscribe({
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
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  form: FormGroup;
  loading: boolean = false;
  id: string;
  operacion: string = 'Editar ';

  constructor(
    private fb: FormBuilder,
    private _UserService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      dni: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.id = String(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getUser(this.id);
  }

  getUser(id: string) {
    this.loading = true;
    this._UserService.getUser(id).subscribe((data: User) => {
      this.loading = false;
      this.form.setValue({ 
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        telefono: data.telefono,
        userName: data.userName,
        password: data.password,
        role: data.role
      });
    });
  }

  editUser() {
    console.log(this.form);
    if (this.form.valid) {
      const newUser: User = {
        userName: this.form.get('userName')?.value || '',
        password: this.form.get('password')?.value || '',
        nombre: this.form.get('nombre')?.value || '',
        apellido: this.form.get('apellido')?.value || '',
        dni: this.form.get('dni')?.value || '',
        telefono: this.form.get('telefono')?.value || '',
        role: this.form.get('role')?.value || '',
        id: this.form.get('id')?.value || ''
        
      };

      this.loading = true;
      
      newUser.id = this.id;
        this._UserService.updateUser(this.id, newUser).subscribe(() => {
          this.toastr.info(`Usuario actualizado correctamente`, 'Usuario actualizado');
          this.loading = false;
          this.navigateToUsers();
        });
      
      console.log(newUser);
    }

  } 
  navigateToUsers() {
    this.router.navigate(['/users']);
  }

}

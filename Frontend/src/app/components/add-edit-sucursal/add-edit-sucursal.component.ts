import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sucursal } from '../../interfaces/sucursal';
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-add-edit-sucursal',
  templateUrl: './add-edit-sucursal.component.html',
  styleUrls: ['./add-edit-sucursal.component.css']
})
export class AddEditSucursalComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';


  constructor(
    private fb: FormBuilder,
    private _sucursalService: SucursalService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
    ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      localidad: ['', Validators.required],
      email: ['', Validators.required],
    })
    
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  
  }

    ngOnInit(): void {

      if(this.id != 0) {
        //Es editar
        this.operacion = 'Editar ';
        this.getSucursal(this.id);
        
      }

      
    }

    getSucursal(id:number){
      this.loading = true;
      this._sucursalService.getSucursal(id).subscribe((data:Sucursal) =>{
        this.loading = false;
        this.form.setValue({
          nombre: data.nombre,
          localidad: data.localidad,
          email: data.email 
        })
      }) 
    }

  addSucursal() {
    //console.log(this.form.value.nombre);
    const sucursal: Sucursal = {
      nombre:this.form.value.nombre,
      localidad:this.form.value.localidad,
      email:this.form.value.email,
    }; 
    this.loading = true;
    if(this.id!==0) {  
      sucursal.id = this.id;
      this._sucursalService.updateSucursal(this.id, sucursal).subscribe(() =>{
      this.toastr.info(`La sucursal ${sucursal.nombre} fue actualizada con exito`, 'Sucursal actualizada');
      this.loading = false;
      this.navigateToSucursales();
      });
    } else {
  
     
      this._sucursalService.saveSucursal(sucursal).subscribe(() => {
      this.toastr.success(`La sucursal ${sucursal.nombre} fue registrada con exito`, 'Sucursal registrada');
      this.loading = false;
      this.navigateToSucursales();
      });
    }
    }

    navigateToSucursales() {
      this.router.navigate(['/sucursales']); 
    }
  }



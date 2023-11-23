import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sucursal } from 'src/app/interfaces/sucursal';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-add-edit-sucursal',
  templateUrl: './add-edit-sucursal.component.html',
  styleUrls: ['./add-edit-sucursal.component.css']
})
export class AddEditSucursalComponent {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';


  constructor(private fb: FormBuilder,
    private _sucursalService: SucursalService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
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
        console.log(data);
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
    } 
    this.loading = true;
    if(this.id!==0) {
      //Es editar
      
      sucursal.id = this.id;
      this._sucursalService.updateSucursal(this.id,sucursal).subscribe(() =>{
      this.toastr.info(`La sucursal ${sucursal.nombre} fue actualizada con exito`, 'Sucursal actualizada');
   
      })
    } else {
      //Es agregar 
     
      this._sucursalService.saveSucursal(sucursal).subscribe(() => {
      this.toastr.success(`La sucursal ${sucursal.nombre} fue registrada con exito`, 'Sucursal registrada');
      this.router.navigate(['/']);
      })
    }
    this.loading = false;
  
   
  }

}

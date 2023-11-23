import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Sucursal } from 'src/app/interfaces/sucursal';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-list-sucursales',
  templateUrl: './list-sucursales.component.html',
  styleUrls: ['./list-sucursales.component.css']
})
export class ListSucursalesComponent {
  listSucursales:Sucursal[] = []
  loading: boolean = false;

  constructor(private _sucursalService: SucursalService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getListSucursales();
  }

  getListSucursales() {
    this.loading = true;
    this._sucursalService.getListSucursales().subscribe((data: Sucursal[]) => {
     this.listSucursales = data;
     this.loading = false;
    })
  }

  deleteSucursal(id:number) {
    this.loading = true;
    this._sucursalService.deleteSucursal(id).subscribe(() =>{
      this.getListSucursales();
      this.toastr.warning('La sucursal fue eliminada con exito', 'Sucursal eliminada');
    })
  }

}

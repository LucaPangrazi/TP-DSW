import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Sucursal } from '../../interfaces/sucursal';
import { SucursalService } from '../../services/sucursal.service';
import { SearchService } from '../../shared/search.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-sucursales',
  templateUrl: './list-sucursales.component.html',
  styleUrls: ['./list-sucursales.component.css']
})
export class ListSucursalesComponent implements OnInit {
  listSucursales: Sucursal[] = [];
  loading: boolean = false;
  searchTerm: string = '';
  filteredSucursales: Sucursal[] = [];

  constructor(
    private _sucursalService: SucursalService,
    private toastr: ToastrService,
    private searchService: SearchService,
    private location: Location,
   // private router: Router
  ) {}

  ngOnInit(): void {
    this.getListSucursales();
        this.searchService.searchTerm$.subscribe((term: string) => {
        console.log('Término de búsqueda recibido:', term);
        this.searchTerm = term;
        this.searchSucursales(); 
    });
  }

  getListSucursales() {
    this.loading = true;
    console.log('URL de la solicitud:', this.getListSucursalesURL());
    this._sucursalService.getListSucursales().subscribe( (data: Sucursal[]) => {
        this.listSucursales = data;
        this.filteredSucursales = [...this.listSucursales];
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener la lista de sucursales', error);
  console.error('Código de estado:', error.status);
  console.error('Mensaje del servidor:', error.message);
        this.loading = false;
      } 
    );
  }



  getListSucursalesURL(): string {
    return this.location.path();
  }


  searchSucursales(): void {
    console.log('Lista de sucursales antes del filtro:', this.listSucursales); // Agregar mensaje de registro aquí
    // Filtrar la lista de sucursales según el término de búsqueda
    this.filteredSucursales = this.listSucursales.filter((sucursal) =>
      sucursal.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log('Lista de sucursales después del filtro:', this.filteredSucursales); // Agregar mensaje de registro aquí
  } 

  deleteSucursal(id: number) {
    this.loading = true;
    this._sucursalService.deleteSucursal(id).subscribe(() => {
      this.getListSucursales();
      this.toastr.warning('La sucursal fue eliminada con éxito', 'Sucursal eliminada');
    });
  }

 /* navigateToAddSucursal() {
    this.router.navigate(['/sucursales/add']);  // Navegamos hacia la ruta de agregar sucursal
  }*/
}

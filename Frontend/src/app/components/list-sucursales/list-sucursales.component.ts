import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Sucursal } from '../../interfaces/sucursal';
import { SucursalService } from '../../services/sucursal.service';
import { SearchService } from '../../shared/search.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-sucursales',
  templateUrl: './list-sucursales.component.html',
  styleUrls: ['./list-sucursales.component.css']
})
export class ListSucursalesComponent implements OnInit {
  searchTerm: string = '';
  listSucursales: Sucursal[] = [];
  loading: boolean = false;
  filteredSucursales: Sucursal[] = [];

  constructor(
    private _sucursalService: SucursalService,
    private toastr: ToastrService,
    private searchService: SearchService
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
    this._sucursalService.getListSucursales().subscribe(
      (data: Sucursal[]) => {
        this.listSucursales = data;
        this.filteredSucursales = [...this.listSucursales];
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener la lista de sucursales', error);
    
        this.loading = false;
      }
    );
  }

  searchSucursales(): void {
    // Filtrar la lista de sucursales según el término de búsqueda
    this.filteredSucursales = this.listSucursales.filter((sucursal) =>
      sucursal.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    
  }

  deleteSucursal(id: number) {
    this.loading = true;
    this._sucursalService.deleteSucursal(id).subscribe(() => {
      this.getListSucursales();
      this.toastr.warning('La sucursal fue eliminada con éxito', 'Sucursal eliminada');
    });
  }

  /*navigateToAddSucursal() {
    this.router.navigate(['/sucursales/add']);  // Navegamos hacia la ruta de agregar sucursal
  }*/
}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Sala } from '../../interfaces/sala';
import { SalaService } from '../../services/sala.service';
import { SearchService } from '../../shared/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-salas',
  templateUrl: './list-salas.component.html',
  styleUrls: ['./list-salas.component.css']
})
export class ListSalasComponent implements OnInit {
  searchTerm: string = '';      //Guarda el término de búsqueda para filtrar la lista de salas
  listSalas: Sala[] = [];
  loading: boolean = false;
  filteredSalas: Sala[] = [];   //Guarda las salas que coinciden con el término de búsqueda

  constructor(
    private _salaService: SalaService,
    private toastr: ToastrService,
    private searchService: SearchService
   
  ) {}

  ngOnInit(): void {
    this.getListSalas();

    this.searchService.searchTerm$.subscribe((term: string) => {
      console.log('Término de búsqueda recibido:', term);
      this.searchTerm = term;
      this.searchSalas();
    });
  }

  getListSalas() {
    this.loading = true;
    this._salaService.getListSalas().subscribe((data: Sala[]) => { 
      this.listSalas = data;
      this.filteredSalas = [...this.listSalas];
      this.loading = false;
      },
      error => {
        console.error('Error al obtener la lista de salas', error);
        this.loading = false;
      }
    );
  }

  searchSalas(): void {
    // Filtrar la lista de salas según el término de búsqueda
    this.filteredSalas = this.listSalas.filter((sala) =>
      sala.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteSala(id: number) {
    this.loading = true;
    this._salaService.deleteSala(id).subscribe(
      () => {
        this.getListSalas();
        this.toastr.warning('La sala fue eliminada con éxito', 'Sala eliminada');
      },
      error => {
        console.error('Error al eliminar la sala', error);
        this.loading = false;
      }
    );
  }

 
}

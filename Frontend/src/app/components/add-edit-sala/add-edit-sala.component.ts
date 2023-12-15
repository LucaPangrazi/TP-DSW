import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sala } from '../../interfaces/sala';
import { SalaService } from '../../services/sala.service';

@Component({
  selector: 'app-add-edit-sala',
  templateUrl: './add-edit-sala.component.html',
  styleUrls: ['./add-edit-sala.component.css']
})
export class AddEditSalaComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(
    private fb: FormBuilder,
    private _salaService: SalaService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      
      name: ['', Validators.required]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.operacion = 'Editar ';
      this.getSala(this.id);
    }
  }

  getSala(id: number) {
    this.loading = true;
    this._salaService.getSala(id).subscribe((data: Sala) => {
      this.loading = false;
      this.form.setValue({
        name: data.name,
      });
    });
  }

  addSala() {
    const sala: Sala = {
      id: this.id,
      name: this.form.value.name
    };

    this.loading = true;

    if (this.id !== 0) {
      this._salaService.updateSala(this.id, sala).subscribe(() => {
        this.toastr.info(`La sala ${sala.name} fue actualizada con éxito`, 'Sala actualizada');
        this.loading = false;
        this.navigateToSalas(); 
      });
    } else {
      this._salaService.saveSala(sala).subscribe(() => {
        this.toastr.success(`La sala ${sala.name} fue registrada con éxito`, 'Sala registrada');
        this.loading = false;
        this.navigateToSalas();  
      });
    }
  }

  navigateToSalas() {
    this.router.navigate(['/salas']);
  }
}

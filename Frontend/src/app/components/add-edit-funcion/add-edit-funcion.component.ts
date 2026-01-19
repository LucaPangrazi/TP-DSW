
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FuncionesService } from '../../services/funciones.service';
import { Funcion } from '../../interfaces/funcion';

@Component({
    selector: 'app-add-edit-funcion',
    templateUrl: './add-edit-funcion.component.html',
    styles: []
})
export class AddEditFuncionComponent implements OnInit {
    form: FormGroup;
    loading: boolean = false;
    id: number;
    operacion: string = 'Agregar ';

    constructor(
        private fb: FormBuilder,
        private _funcionesService: FuncionesService,
        private router: Router,
        private toastr: ToastrService,
        private aRouter: ActivatedRoute
    ) {
        this.form = this.fb.group({
            movie_id: ['', Validators.required],
            sala_id: ['', Validators.required],
            sucursal_id: ['', Validators.required],
            fecha_funcion: ['', Validators.required],
            hora_funcion: ['', Validators.required]
        });
        this.id = Number(aRouter.snapshot.paramMap.get('id'));
    }

    ngOnInit(): void {
        if (this.id != 0) {
            this.operacion = 'Editar ';
            this.getFuncion(this.id);
        }
    }

    getFuncion(id: number) {
        this.loading = true;
        this._funcionesService.getFuncion(id).subscribe((data: Funcion) => {
            this.loading = false;
            this.form.setValue({
                movie_id: data.movie_id,
                sala_id: data.sala_id,
                sucursal_id: data.sucursal_id,
                fecha_funcion: data.fecha_funcion,
                hora_funcion: data.hora_funcion
            });
        });
    }

    addFuncion() {
        const funcion: Funcion = {
            movie_id: this.form.value.movie_id,
            sala_id: this.form.value.sala_id,
            sucursal_id: this.form.value.sucursal_id,
            fecha_funcion: this.form.value.fecha_funcion,
            hora_funcion: this.form.value.hora_funcion
        };

        if (this.id !== 0) {
            // Edit
            funcion.id = this.id;
            this._funcionesService.updateFuncion(this.id, funcion).subscribe(() => {
                this.toastr.info(`La función fue actualizada con éxito`, 'Función actualizada');
                this.router.navigate(['/funciones']);
            });
        } else {
            // Add
            this._funcionesService.saveFuncion(funcion).subscribe(() => {
                this.toastr.success(`La función fue registrada con éxito`, 'Función registrada');
                this.router.navigate(['/funciones']);
            });
        }
    }
}

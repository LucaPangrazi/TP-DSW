import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSucursalesComponent } from './components/list-sucursales/list-sucursales.component';
import { AddEditSucursalComponent } from './components/add-edit-sucursal/add-edit-sucursal.component';

//componentes
const routes: Routes = [
  { path:'', component: ListSucursalesComponent},
  { path: 'add', component:AddEditSucursalComponent},
  { path: 'edit/:id', component: AddEditSucursalComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

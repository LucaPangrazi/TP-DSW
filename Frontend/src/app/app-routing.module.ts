import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListSalasComponent } from './components/list-salas/list-salas.component';
import { AddEditSalaComponent } from './components/add-edit-sala/add-edit-sala.component';

const routes: Routes = [
{ path:'', component:ListSalasComponent}, 
{ path:'add', component:AddEditSalaComponent },
{ path:'edit/:id', component:AddEditSalaComponent},
{ path:'**', redirectTo:'', pathMatch:'full'}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

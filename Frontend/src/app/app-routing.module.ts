// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSucursalesComponent } from './components/list-sucursales/list-sucursales.component';
import { AddEditSucursalComponent } from './components/add-edit-sucursal/add-edit-sucursal.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';
import { ListSalasComponent } from './components/list-salas/list-salas.component';
import { AddEditSalaComponent } from './components/add-edit-sala/add-edit-sala.component';
import { HomeComponent } from './components/HomeCine/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: ListMoviesComponent },
  { path: 'movies/add', component: AddEditMovieComponent },
  { path: 'movies/edit/:id', component: AddEditMovieComponent },
  { path: 'salas', component: ListSalasComponent },
  { path: 'salas/add', component: AddEditSalaComponent },
  { path: 'salas/edit/:id', component: AddEditSalaComponent },
  { path:'', component: ListSucursalesComponent},
  { path: 'add', component:AddEditSucursalComponent},
  { path: 'edit/:id', component: AddEditSucursalComponent},
  { path: '**', redirectTo: 'movies', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListSucursalesComponent } from './components/list-sucursales/list-sucursales.component';
import { AddEditSucursalComponent } from './components/add-edit-sucursal/add-edit-sucursal.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';
import { ListSalasComponent } from './components/list-salas/list-salas.component';
import { AddEditSalaComponent } from './components/add-edit-sala/add-edit-sala.component';
import { HomeComponent } from './components/HomeCine/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './util/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: ListMoviesComponent },
  { path: 'movies/add', component: AddEditMovieComponent },
  { path: 'movies/edit/:id', component: AddEditMovieComponent },
  { path: 'salas', component: ListSalasComponent },
  { path: 'salas/add', component: AddEditSalaComponent },
  { path: 'salas/edit/:id', component: AddEditSalaComponent },
  { path:'sucursales', component: ListSucursalesComponent},
  { path: 'sucursales/add', component:AddEditSucursalComponent},
  { path: 'sucursales/edit/:id', component: AddEditSucursalComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


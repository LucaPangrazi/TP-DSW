import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Componentes
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
import { ListUsersComponent } from './components/list-users/list-users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DetallesPeliculaComponent } from './components/detalles-pelicula/detalles-pelicula.component';
import { ComprarEntradaComponent } from './components/comprar-entrada/comprar-entrada.component';
import { SeleccionAsientosComponent } from './components/seleccion-asientos/seleccion-asientos.component';
import { SeleccionFuncionComponent } from './components/seleccion-funcion/seleccion-funcion.component';
import { ListFuncionesComponent } from './components/list-funciones/list-funciones.component';
import { AddEditFuncionComponent } from './components/add-edit-funcion/add-edit-funcion.component';
import { AuthGuard } from './util/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, data: { showSecondNavbar: true } },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: ListMoviesComponent },
  { path: 'movies/add', component: AddEditMovieComponent, data: { showSecondNavbar: true } },
  { path: 'movies/edit/:id_movie', component: AddEditMovieComponent, data: { showSecondNavbar: true } },
  // Usuarios - Usa Second Navbar
  { path: 'users', component: ListUsersComponent, canActivate: [AuthGuard], data: { showSecondNavbar: true } },
  { path: 'users/edit/:id', component: EditUserComponent, canActivate: [AuthGuard], data: { showSecondNavbar: true } },

  // Salas - Usa Second Navbar
  { path: 'salas', component: ListSalasComponent, canActivate: [AuthGuard], data: { showSecondNavbar: true } },
  { path: 'salas/add', component: AddEditSalaComponent, canActivate: [AuthGuard], data: { showSecondNavbar: true } },
  { path: 'salas/edit/:id', component: AddEditSalaComponent, canActivate: [AuthGuard], data: { showSecondNavbar: true } },

  // Sucursales - Usa Second Navbar
  { path: 'sucursales', component: ListSucursalesComponent, canActivate: [AuthGuard], data: { showSecondNavbar: true } },
  { path: 'sucursales/add', component: AddEditSucursalComponent, canActivate: [AuthGuard], data: { showSecondNavbar: true } },
  { path: 'sucursales/edit/:id', component: AddEditSucursalComponent, canActivate: [AuthGuard], data: { showSecondNavbar: true } },
  { path: 'login', component: LoginComponent, data: { showSecondNavbar: true } },
  { path: 'register', component: RegisterComponent, data: { showSecondNavbar: true } },
  { path: 'pelicula/:id', component: DetallesPeliculaComponent, data: { showSecondNavbar: true } },
  { path: 'comprar-entrada/:id', component: ComprarEntradaComponent, data: { showSecondNavbar: true } },
  { path: 'seleccion-asientos', component: SeleccionAsientosComponent, data: { showSecondNavbar: true } },
  { path: 'seleccion-funcion', component: SeleccionFuncionComponent, data: { showSecondNavbar: true } },
  { path: 'funciones', component: ListFuncionesComponent },
  { path: 'funciones/add', component: AddEditFuncionComponent, data: { showSecondNavbar: true } },
  { path: 'funciones/edit/:id', component: AddEditFuncionComponent, data: { showSecondNavbar: true } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

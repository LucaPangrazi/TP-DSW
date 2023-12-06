import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  searchTerm: string = '';
  listUsers: User[] = []
  loading: boolean = false;
  filteredUsers: User[] = [];

  constructor(private _userService: UserService,
    private toastr: ToastrService,
    private searchService: SearchService) {}

  ngOnInit(): void {
      //this.getListUsers();

      this.searchService.searchTerm$.subscribe((term: string) => {
        console.log('Término de búsqueda recibido:', term);
        this.searchTerm = term;
        this.searchUsers();
      });
      this.getListUsers();
    }

    getListUsers(){
      this.loading = true;
      this._userService.getListUsers().subscribe( 
        (response: any) => {
          if (response && Array.isArray(response.return)) {
            this.listUsers = response.return;
          } else {
            console.error('Error: respuesta del servidor no contiene un array válido', response);
          }
      this.updateFilteredUsers();
      this.filteredUsers = [...this.listUsers];
      this.loading = false;
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios', error);
        this.loading = false;
      })
    }
 
    updateFilteredUsers() {
      this.filteredUsers = [...this.listUsers];
    this.searchUsers();
    }

    searchUsers(): void {
      this.filteredUsers = this.listUsers.filter((user) =>
        user.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    deleteUser(id: string) {
      console.log(id);
      this.loading = true;
      this._userService.deleteUser(id).subscribe(() => {
        this.getListUsers();
        this.toastr.warning('El usuario fue eiminado correctamente', 'Usuario eliminado');
      },
        (error: any) => {
        console.error('Error al eliminar el usuario', error);
      }
  );}
}

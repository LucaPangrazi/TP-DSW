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
      this.getListUsers();

      this.searchService.searchTerm$.subscribe((term: string) => {
        console.log('Término de búsqueda recibido:', term);
        this.searchTerm = term;
        this.searchUsers();
      });
    }

    getListUsers(){
      this.loading = true;
      this._userService.getListUsers().subscribe((data: User[]) => { 
      this.listUsers = data;
      this.filteredUsers = [...this.listUsers];
      this.loading = false;
      })
    }
 
  
    searchUsers(): void {
      // Filtrar la lista de películas según el término de búsqueda
      this.filteredUsers = this.listUsers.filter((user) =>
        user.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

}

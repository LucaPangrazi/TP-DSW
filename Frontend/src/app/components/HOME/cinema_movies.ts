/* import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, isEmpty } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})

export class MoviesComponent implements OnInit {
  movies: any[] = [];

  constructor(private fb:FormBuilder, private _movieService: MovieService,
    private router: Router, private toastr: ToastrService,
    private aRouter: ActivatedRoute){}

async ngOnInit() {
 async (genre: string) => {
      await this.filterByGenre(genre);
    });
  }

  
  async filterByGenre(genre: string) {
    try {
        const data = await firstValueFrom(this._movieService.filterByGenre(genre));
        this.movies = data || []; 
    } 
    catch (error) {
      const data = await firstValueFrom(this._movieService.getListMovies()); 
      this.movies = data || []; 
      console.error('Error', error);
    }
    }
}*/
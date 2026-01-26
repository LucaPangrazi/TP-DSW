import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { SearchService } from '../../shared/search.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

interface MovieCarousel {
  genre: string;
  movies: any[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  allMovies: any[] = [];
  moviesByGenre: MovieCarousel[] = [];
  featuredMovie: any = null;
  loading = false;
  isAdmin = false;
  private adminSub: Subscription | undefined;

  constructor(
    private router: Router,
    private movieService: MovieService,
    private searchService: SearchService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.adminSub = this.userService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    this.searchService.searchTerm$.subscribe(term => {
      this.filterMovies(term);
    });

    this.loadMovies();
  }

  filterMovies(term: string) {
    if (!term.trim()) {
      this.processPeliculas(this.allMovies);
      return;
    }
    const lowerTerm = term.toLowerCase();
    const filtered = this.allMovies.filter(movie =>
      (movie.title || movie.titulo || movie.name || movie.nombre || '').toLowerCase().includes(lowerTerm)
    );
    this.processPeliculas(filtered);
  }

  ngOnDestroy() {
    if (this.adminSub) {
      this.adminSub.unsubscribe();
    }
  }

  // Método para navegar desde los botones
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  loadMovies() {
    this.loading = true;
    console.log('Loading movies...');
    this.movieService.getListMovies().subscribe({
      next: (data: any) => {
        console.log('Movies loaded:', data);
        if (Array.isArray(data)) {
          this.allMovies = data;
        } else if (data && Array.isArray(data.movies)) {
          this.allMovies = data.movies;
        } else if (data && Array.isArray(data.data)) {
          this.allMovies = data.data;
        } else {
          console.warn('Unexpected data format for movies:', data);
          this.allMovies = [];
        }

        this.processPeliculas(this.allMovies);
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading movies:', err);
        this.loading = false;
        this.allMovies = [];
        this.moviesByGenre = [];
      }
    });
  }

  processPeliculas(moviesList: any[] = this.allMovies) {
    if (moviesList.length > 0) {
      this.featuredMovie = moviesList[0];
    } else {
      this.featuredMovie = null; // Clear if no search results
    }

    const genreMap = new Map<string, any[]>();

    moviesList.forEach(movie => {
      const genre = movie.genero || movie.genre || 'Sin Género';
      if (!genreMap.has(genre)) {
        genreMap.set(genre, []);
      }
      genreMap.get(genre)!.push(movie);
    });

    this.moviesByGenre = Array.from(genreMap.entries()).map(([genre, movies]) => ({
      genre,
      movies: movies.sort((a, b) => {
        const aHasImg = !!(a.imagen || a.image);
        const bHasImg = !!(b.imagen || b.image);
        return (bHasImg ? 1 : 0) - (aHasImg ? 1 : 0);
      })
    }));

    console.log('Movies grouped by genre:', this.moviesByGenre);
  }

  goToMovieDetails(movieId: number) {
    this.router.navigate(['/pelicula', movieId]);
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) {
      return 'assets/placeholder-movie.jpg';
    }
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // Encode the filename to handle spaces and special characters
    return `http://localhost:3000/uploads/${encodeURIComponent(imagePath)}`;
  }

  scrollCarousel(direction: 'left' | 'right', carouselId: string) {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      const scrollAmount = 300;
      carousel.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}

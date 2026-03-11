import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { SearchService } from '../../shared/search.service';
import { UserService } from '../../services/user.service';
import { BannerService } from '../../services/banner.service';
import { AsientosService } from '../../shared/asientos.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  customBannerImage: string | null = null;
  loading = false;
  isAdmin = false;
  private adminSub: Subscription | undefined;

  // editar Banner
  showBannerModal = false;
  bannerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private movieService: MovieService,
    private searchService: SearchService,
    private userService: UserService,
    private bannerService: BannerService,
    private asientosService: AsientosService,
    private fb: FormBuilder
  ) {
    this.bannerForm = this.fb.group({
      movie_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.adminSub = this.userService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    this.searchService.searchTerm$.subscribe(term => {
      this.filterMovies(term);
    });
    this.loadMovies();
    this.loadBanner();
  }

  loadBanner(): Promise<void> {
    return new Promise((resolve) => {
      this.bannerService.getBanner().subscribe(data => {
        if (data && data.banner && data.movie) {
          this.featuredMovie = data.movie;
          if (data.banner.custom_image) {
            //  Apuntando a Render en lugar de localhost
            this.customBannerImage = `https://tp-dsw-0wfq.onrender.com/uploads/${data.banner.custom_image}`;
          }
        }
        resolve();
      }, error => {
        console.error('Error loading banner:', error);
        resolve();
      });
    });
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
    if (moviesList.length > 0 && !this.customBannerImage && !this.featuredMovie) {
      this.featuredMovie = moviesList[0];
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

  comprarEntradaBanner() {
    if (this.featuredMovie) {
      const movieId = this.featuredMovie.id_movie || this.featuredMovie.id;
      const movieTitle = this.featuredMovie.title || this.featuredMovie.titulo || this.featuredMovie.name || 'Película seleccionada';
      this.asientosService.setDatosPelicula({
        pelicula: { id: movieId, nombre: movieTitle },
        fecha: '' 
      });
      this.router.navigate(['/seleccion-funcion']);
    }
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) {
      return 'assets/placeholder-movie.jpg';
    }
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // Apuntando a Render en lugar de localhost
    return `https://tp-dsw-0wfq.onrender.com/uploads/${encodeURIComponent(imagePath)}`;
  }

  getBannerImage(): string {
    if (this.customBannerImage) return this.customBannerImage;
    return this.getImageUrl(this.featuredMovie?.imagen || this.featuredMovie?.image);
  }

  openBannerModal() {
    this.showBannerModal = true;
  }

  closeBannerModal() {
    this.showBannerModal = false;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    // Validar el tipo de archivo
    if (!allowedTypes.includes(file.type)) {
      alert('Solo se permiten imágenes JPG, PNG o WEBP');
      event.target.value = ''; // limpio input
      this.bannerForm.get('image')?.setValue(null);
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
    this.bannerForm.patchValue({ image: file });
  }

  saveBanner() {
    if (!this.bannerForm.get('movie_id')?.value) {
      alert('Por favor seleccione una película');
      return;
    }
    if (!this.selectedFile) {
      alert('Por favor seleccione una imagen para el banner');
      return;
    }

    const formData = new FormData();
    formData.append('movie_id', this.bannerForm.get('movie_id')?.value);
    formData.append('image', this.selectedFile);

    this.bannerService.updateBanner(formData).subscribe(() => {
      alert('Banner actualizado con éxito!');
      this.closeBannerModal();
      this.selectedFile = null;
      this.bannerForm.reset();
      this.loadBanner(); 
    }, err => {
      console.error(err);
      alert('Error actualizando banner: ' + (err?.error?.msg || err?.error?.error || 'Error desconocido'));
    });
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
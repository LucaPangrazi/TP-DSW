//esto es para los detalles de cada pelicula que se muestran en la cartelera

export interface MovieAttributes {
    id_movie?: number;
    title: string;
    genre: string;
    format: string;
    description: string;
    clasification: string;
    durationMin: number;
    image: string; // URL o nombre del archivo
}

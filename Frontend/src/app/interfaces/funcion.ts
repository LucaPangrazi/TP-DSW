export interface Funcion {
    id?: number;
    movie_id: number;
    sala_id: number;
    sucursal_id: number;
    fecha_funcion: string;
    hora_funcion: string;
    movie?: { title: string };
    sala?: { name: string };
    sucursal?: { nombre: string };
}

## Modelo de Datos (Diagrama de Clases)

```mermaid
classDiagram
    direction TB
    
    class Usuario {
        +int id
        +String nombre
        +String apellido
        +String username
        +String dni
        +String telefono
        +String password
        +String role
    }

    class Funtion {
        +int id
        +int movie_id
        +int sala_id
        +int sucursal_id
        +date fecha_funcion
        +time hora_funcion
    }

    class Home_banner {
        +int id
        +int movie_id
        +String custom_image
        +boolean active
    }

    class Movie {
        +int id_movie
        +String genre
        +String title
        +String format
        +String clasification
        +String description
        +int duration_min
        +String image
    }

    class Salas {
        +int id
        +int sucursal_id
        +String name
    }

    class Seat_occupied {
        +int id
        +int funtion_id
        +int usuario_id
        +int seat_code
    }

    class Sucursals {
        +int id
        +String nombre
        +String direccion
        +String localidad
        +String email
    }

    Sucursals "1" -- "*" Salas : tiene
    Movie "1" -- "*" Funtion : se proyecta en
    Movie "1" -- "0..1" Home_banner : destacada en
    Salas "1" -- "*" Funtion : alberga
    Funtion "1" -- "*" Seat_occupied : registra
    Usuario "1" -- "*" Seat_occupied : reserva
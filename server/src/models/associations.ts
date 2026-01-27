
import Funcion from './funcion';
import Movie from './movie';
import Sala from './sala';
import Sucursal from './sucursal';

// Associations
Funcion.belongsTo(Movie, { foreignKey: 'movie_id' });
Funcion.belongsTo(Sala, { foreignKey: 'sala_id' });
Funcion.belongsTo(Sucursal, { foreignKey: 'sucursal_id' });

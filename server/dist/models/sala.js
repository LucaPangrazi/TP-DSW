import { DataTypes } from 'sequelize';
import db from '../db/connection';
const Sala = db.define('Sala', {
    name: {
        type: DataTypes.STRING
    }
}, {
    createdAt: false,
    updatedAt: false
});
export default Sala;
//# sourceMappingURL=sala.js.map

import db from './db/connection';
import { QueryTypes } from 'sequelize';

const inspect = async () => {
    try {
        await db.authenticate();
        console.log('DB Connected');
        const [results] = await db.query('SELECT * FROM funtion');
        console.log('Funtion Data:', results);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit();
    }
};

inspect();

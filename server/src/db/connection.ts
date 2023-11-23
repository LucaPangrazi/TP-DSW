import {Sequelize} from 'sequelize';


const sequelize = new Sequelize('cine', 'cine', 'cine', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export default sequelize;
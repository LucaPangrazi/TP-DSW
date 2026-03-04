const mysql = require('mysql2/promise');

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'cine',
      password: 'cine',
      database: 'cine'
    });

    console.log('Eliminar sie xiste la tabla Users...');
    await connection.execute('DROP TABLE IF EXISTS Users');

    console.log('Crecion de usuarios con la estructura correcta...');
    await connection.execute(`
      CREATE TABLE Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        apellido VARCHAR(255) NOT NULL,
        userName VARCHAR(255) NOT NULL UNIQUE,
        dni VARCHAR(255) NOT NULL,
        telefono VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        role ENUM('User', 'Admin') NOT NULL DEFAULT 'User',
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('Users table created successfully!');

    // Verifica estructura
    const [rows] = await connection.execute('DESCRIBE Users');
    console.log('\nNuevos usuarios:');
    console.table(rows);

    await connection.end();
  } catch (e) {
    console.error('Error:', e.message);
  }
})();

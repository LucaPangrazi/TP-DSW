const mysql = require('mysql2/promise');

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'cine',
      password: 'cine',
      database: 'cine'
    });

    // Check Users table structure
    const [rows] = await connection.execute('DESCRIBE Users');
    console.log('Users table structure:');
    console.table(rows);

    // Check existing users
    const [users] = await connection.execute('SELECT id, nombre, userName, role FROM Users LIMIT 5');
    console.log('\nExisting users:');
    console.table(users);

    await connection.end();
  } catch (e) {
    console.error('Error:', e.message);
  }
})();

const http = require('http');

const data = JSON.stringify({
  nombre: 'TestUser',
  apellido: 'TestLastname',
  userName: 'testuser123',
  dni: '12345678',
  telefono: '111222333',
  password: 'password123',
  role: 'User'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/users/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

console.log('Sending POST request to:', `http://${options.hostname}:${options.port}${options.path}`);
console.log('Payload:', JSON.parse(data));

const req = http.request(options, (res) => {
  console.log(`\n✓ STATUS: ${res.statusCode}`);
  let body = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log('RESPONSE BODY:');
    try {
      console.log(JSON.stringify(JSON.parse(body), null, 2));
    } catch {
      console.log(body);
    }
  });
});

req.on('error', (e) => { 
  console.error(`✗ ERROR: ${e.message}`);
});

req.write(data);
req.end();

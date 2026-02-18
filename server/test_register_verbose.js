const http = require('http');

const data = JSON.stringify({
  nombre: 'TestUser',
  apellido: 'TestLastname',
  userName: 'testuser999',
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

console.log('=== Sending POST to http://localhost:3000/api/users/register ===');
console.log('Payload:', JSON.parse(data));
console.log('Headers:', options.headers);

const req = http.request(options, (res) => {
  console.log(`\n✓ STATUS: ${res.statusCode}`);
  console.log('HEADERS:', res.headers);
  let body = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => { 
    console.log('Got data chunk:', chunk.length, 'bytes');
    body += chunk; 
  });
  res.on('end', () => {
    console.log('\n✓ Response complete');
    try {
      console.log(JSON.stringify(JSON.parse(body), null, 2));
    } catch {
      console.log(body);
    }
    process.exit(0);
  });
});

req.on('timeout', () => {
  console.error('\n✗ REQUEST TIMEOUT (30s)');
  process.exit(1);
});

req.on('error', (e) => { 
  console.error(`\n✗ ERROR: ${e.message}`);
  process.exit(1);
});

req.setTimeout(5000); // 5 seconds timeout
req.write(data);
req.end();

console.log('Request sent, waiting for response...');

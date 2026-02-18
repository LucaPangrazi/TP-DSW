const http = require('http');
const data = JSON.stringify({nombre:'TestPublic',apellido:'User',userName:'testpublic123',dni:'12345678',telefono:'111111',password:'pass123',role:'User'});
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

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let body = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => { console.log('BODY:', body); });
});
req.on('error', (e) => { console.error(`problem with request: ${e.message}`); });
req.write(data);
req.end();

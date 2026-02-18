const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
};

console.log('Testing GET http://localhost:3000/');

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let body = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log('RESPONSE:', body);
  });
});

req.on('error', (e) => { 
  console.error(`ERROR: ${e.message}`);
});

req.end();

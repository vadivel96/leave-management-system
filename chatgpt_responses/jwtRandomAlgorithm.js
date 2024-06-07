const jwt = require('jsonwebtoken');

const payload = { userId: 123, name: 'John Doe' };
const privateKeyPem = 'your-private-key-here';
const publicKeyPem = 'your-public-key-here';

const algorithms = ['RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512', 'ES256', 'ES384', 'ES512', 'EdDSA'];

function generateRandomValueBw0to9() {
  return Math.floor(Math.random() * 10);
}

// Sign the token with a randomly selected algorithm
const randomValue = generateRandomValueBw0to9();
const selectedAlgorithm = algorithms[randomValue];
const token = jwt.sign(payload, privateKeyPem, { algorithm: selectedAlgorithm });

console.log('Signed Token:', token);
console.log('Used Algorithm:', selectedAlgorithm);

// Verify the token with all supported algorithms
function verifyToken(token) {
  jwt.verify(token, publicKeyPem, { algorithms }, (err, decoded) => {
    if (err) {
      console.error('Verification failed:', err);
    } else {
      console.log('Decoded Payload:', decoded);
    }
  });
}

verifyToken(token);

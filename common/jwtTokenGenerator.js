const forge = require('node-forge');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Generate an RSA key pair
forge.pki.rsa.generateKeyPair({ bits: 2048, workers: 2 }, function(err, keypair) {
  if (err) {
    console.error("Error generating keys: ", err);
    return;
  }

  // Convert the keys to PEM format
  const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);
  const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);

  // Optionally, save the keys to files
  fs.writeFileSync('private.key.js', privateKeyPem);
  fs.writeFileSync('public.key.js', publicKeyPem);

  // Sign a token with the private key
  const payload = {
    sub: "user_id",
    name: "John Doe",
    iat: Math.floor(Date.now() / 1000) // Issued at time
  };

  const token = jwt.sign(payload, privateKeyPem, { algorithm: 'RS256' });

  console.log("JWT:", token);

  // Verify the token with the public key
  try {
    const decoded = jwt.verify(token, publicKeyPem, { algorithms: ['RS256'] });
    console.log("Decoded JWT:", decoded);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log("Token has expired");
    } else if (error.name === 'JsonWebTokenError') {
      console.log("Invalid token");
    } else {
      console.log("An error occurred: ", error.message);
    }
  }
});

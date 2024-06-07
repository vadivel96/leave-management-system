require('dotenv').config();
const forge = require('node-forge');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');

console.log('Root Folder Path:', appRoot.path);

// Use the root path to construct paths to files
const envFilePath = path.join(appRoot.path, '.env');
const backupEnvFilePath = path.join(appRoot.path, '.envCopy');

console.log('Env File Path:', envFilePath);
console.log('Backup Env File Path:', backupEnvFilePath);

// Function to create a backup of the .env file
function backupEnvFile(sourcePath, backupPath){
  try {
    fs.copyFileSync(sourcePath, backupPath);
    console.log('Backup of .env file created successfully.');
  } catch (error) {
    console.error('Error creating backup of the .env file:', error);
  }
}

// Function to update values in the .env file
function updateEnvFile(filePath, newValues) {
  try {
    let envContent = fs.readFileSync(filePath, 'utf8');
    const envLines = envContent.split('\n');
    console.log(`inside updateEnvFiles..!!`);
     console.log(`env lines------------>${envLines}`);
    const keys = Object.keys(newValues);
    let foundKeys = new Set();

    const updatedLines = envLines.map(line => {
      for (const key of keys) {
        if (line.startsWith(`${key}=`)) {
          foundKeys.add(key);
          return `${key}="${newValues[key]}"`;
        }
      }
      return line;
    });

    // Append new values if not found
    for (const key of keys) {
      if (foundKeys.has(key)==false) {
        updatedLines.push(`${key}="${newValues[key]}"`);
      }
    }

    fs.writeFileSync(filePath, updatedLines.join('\n'), 'utf8');
    console.log(`.env file updated successfully with new values:------------------------->`);
  } catch (error) {
    console.error('Error updating the .env file:', error);
  }
}

// Generate an RSA key pair
forge.pki.rsa.generateKeyPair({ bits: 2048, workers: 2 }, function(err, keypair) {
  if (err) {
    console.error("Error generating keys: ", err);
    return;
  }

  // Convert the keys to PEM format
  const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);
  const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);

  // Values to update in the .env file
  const newEnvValues = {
    PRIVATE_KEY: privateKeyPem.replace(/\n/g, '\\n'),
    PUBLIC_KEY: publicKeyPem.replace(/\n/g, '\\n')
  };

  // Backup the existing .env file
  if (fs.existsSync(envFilePath)) {
    backupEnvFile(envFilePath, backupEnvFilePath);
  }

  // Update the .env and backup .envCopy files
  updateEnvFile(envFilePath, newEnvValues);
  updateEnvFile(backupEnvFilePath, newEnvValues);

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

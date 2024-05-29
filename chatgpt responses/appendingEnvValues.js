const fs = require('fs');
const path = require('path');

// Paths to the keys and the .env file
const privateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASC...
-----END PRIVATE KEY-----`;
const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...
-----END PUBLIC KEY-----`;

const envFilePath = path.join(__dirname, '.env');

// Function to append values to the .env file
function appendToEnvFile(filePath, newValues) {
  try {
    // Read the existing content of the .env file
    let envContent = '';
    if (fs.existsSync(filePath)) {
      envContent = fs.readFileSync(filePath, 'utf8');
    }

    // Append the new values
    envContent += `\n${newValues}\n`;

    // Write the updated content back to the .env file
    fs.writeFileSync(filePath, envContent, 'utf8');
    console.log('.env file updated successfully.');
  } catch (error) {
    console.error('Error updating the .env file:', error);
  }
}

// Values to append to the .env file
const newEnvValues = `
PRIVATE_KEY="${privateKeyPem.replace(/\n/g, '\\n')}"
PUBLIC_KEY="${publicKeyPem.replace(/\n/g, '\\n')}"
`;

// Append the new key values to the .env file
appendToEnvFile(envFilePath, newEnvValues);

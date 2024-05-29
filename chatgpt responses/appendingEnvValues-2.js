/*
this method simplifies previous method of read and write function seperately

by appending the new values using appendFileSync method


*/

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
const backupEnvFilePath = path.join(__dirname, '.envCopy');

// Function to create a backup of the .env file
function backupEnvFile(sourcePath, backupPath) {
  try {
    fs.copyFileSync(sourcePath, backupPath);
    console.log('.env file backed up successfully.');
  } catch (error) {
    console.error('Error creating backup of the .env file:', error);
  }
}


// Function to append values to the .env file
function appendToEnvFile(filePath, newValues) {
  try {
    fs.appendFileSync(filePath, `\n${newValues}\n`, 'utf8');
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

// Backup the existing .env file
if (fs.existsSync(envFilePath)) {
  backupEnvFile(envFilePath, backupEnvFilePath);
}

// Append the new key values to the .env file
appendToEnvFile(envFilePath, newEnvValues);

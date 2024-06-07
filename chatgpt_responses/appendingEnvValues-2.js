// /*
// this method simplifies previous method of read and write function seperately

// by appending the new values using appendFileSync method


// */

// const fs = require('fs');
// const path = require('path');
// const appRoot = require('app-root-path');
// const { privateKeyPem, publicKeyPem } = require('../common/jwtTokenGenerator');


// console.log('Root Folder Path:', appRoot.path);

// // Use the root path to construct paths to files
// const envFilePathFromAppRoot = path.join(appRoot.path, '.env');
// const backupEnvFilePathFromRoot = path.join(appRoot.path, '.envCopy');

// console.log('Env File Path:', envFilePathFromAppRoot);
// console.log('Backup Env File Path:', backupEnvFilePathFromRoot);


// const envFilePath = path.join(envFilePathFromAppRoot);
// const backupEnvFilePath = path.join(backupEnvFilePathFromRoot);

// // Function to create a backup of the .env file
// function backupEnvFile(sourcePath, backupPath) {
//   try {
//     fs.copyFileSync(sourcePath, backupPath);
//     console.log(`sourece path---------------->`,sourcePath);
//     console.log(`backup path---------------->`,backupPath);
//     console.log('.env file backed up successfully.');
//   } catch (error) {
//     console.error('Error creating backup of the .env file:', error);
//   }
// }


// // Function to append values to the .env file
// function appendToEnvFile(filePath, newValues) {
//   try {
//     console.log(`env values to be appended in appendingEnvValues-2.js`)
//     fs.appendFileSync(filePath, `\n${newValues}\n`, 'utf8');
//     console.log('.env file updated successfully in appendingEnvValues-2.js-------->',newValues);
//   } catch (error) {
//     console.error('Error updating the .env file:', error);
//   }
// }

// // Values to append to the .env file
// const newEnvValues = `
// PRIVATE_KEY="${privateKeyPem.replace(/\n/g, '\\n')}"
// PUBLIC_KEY="${publicKeyPem.replace(/\n/g, '\\n')}"
// `;

// // Backup the existing .env file
// if (fs.existsSync(envFilePath)) {
//   backupEnvFile(envFilePath, backupEnvFilePath);
// }

// // Append the new key values to the .env file
// appendToEnvFile(envFilePath, newEnvValues);

// module.exports={backupEnvFile,appendToEnvFile,envFilePath,backupEnvFilePath}
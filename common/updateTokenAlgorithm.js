const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');

console.log('Root Folder Path:', appRoot.path);

// Use the root path to construct paths to files
const envFilePath = path.join(appRoot.path, '.env');

const updateTokenAlgorithm = (key, value) => {
 try {
  const envVariables = fs.readFileSync(envFilePath, 'utf8').split('\n');
  const updatedEnvVariables = envVariables.map(line => {
    const [currentKey, currentValue] = line.split('=');
    if (currentKey === key) {
      return `${currentKey}=${value}`;
    }
    return line;
  });

  if (!updatedEnvVariables.some(line => line.startsWith(`${key}=`))) {
    updatedEnvVariables.unshift(`${key}=${value}`);
  }

  fs.writeFileSync(envFilePath, updatedEnvVariables.join('\n'));
  console.log(`new token algorithm is updated successfully ..!!`)
  return true;
 } catch (error) {
  console.log(error);
 }
};

module.exports={updateTokenAlgorithm};
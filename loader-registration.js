//import { register } from 'node:module';
//import { pathToFileURL } from 'node:url';

const {register}=require('node:module');
const {pathToFileURL}=require('node:url')

// Register the New Relic loader
register('newrelic/esm-loader.js', pathToFileURL('./'));


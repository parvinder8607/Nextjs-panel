#!/usr/bin/env node

const [, , command, resourceName] = process.argv;

switch (command) {
  case 'setup':
    require('./scripts/postinstall');
    break;
    
  case 'make:resource':
    if (!resourceName) {
      console.error('❌ Please provide a resource name. Example: npx nextjs-panel make:resource user');
      process.exit(1);
    }
    // Pass resourceName to the script function
    require('./scripts/create-resource')(resourceName);
    break;
    
  default:
    console.log(`❌ Unknown command: "${command}"`);
    console.log('Available commands: setup, make:resource');
    process.exit(1);
}

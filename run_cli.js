const path = require('path');
const fs = require('fs');

const nodeDir = path.join(__dirname, '.tools', 'node-v20.18.0-win-x64');
const npmCli = path.join(nodeDir, 'node_modules', 'npm', 'bin', 'npm-cli.js');

process.argv = [
  process.execPath,
  npmCli,
  ...process.argv.slice(2)
];

const cli = require('./.tools/node-v20.18.0-win-x64/node_modules/npm/lib/cli.js');
console.log('Invoking npm cli with args:', process.argv);

cli(process).then(() => {
  console.log('npm finished successfully!');
}).catch((err) => {
  console.error('npm error caught:', err);
});

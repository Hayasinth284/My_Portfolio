const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

fs.writeFileSync('run_start.txt', 'Started execution\n');

try {
  const nodeDir = path.join(__dirname, '.tools', 'node-v20.18.0-win-x64');
  const npmCmd = path.join(nodeDir, 'npm.cmd');
  const env = Object.assign({}, process.env, { PATH: nodeDir + ';' + (process.env.PATH || '') });

  fs.appendFileSync('run_start.txt', 'Running spawnSync for root...\n');
  const res1 = spawnSync('cmd.exe', ['/c', `"${npmCmd}"`, 'install'], { cwd: __dirname, env, encoding: 'utf-8' });
  fs.appendFileSync('run_start.txt', 'res1 status: ' + res1.status + '\nOut: ' + res1.stdout + '\nErr: ' + res1.stderr + '\n');

  fs.appendFileSync('run_start.txt', 'Running spawnSync for client...\n');
  const clientDir = path.join(__dirname, 'client');
  const res2 = spawnSync('cmd.exe', ['/c', `"${npmCmd}"`, 'install'], { cwd: clientDir, env, encoding: 'utf-8' });
  fs.appendFileSync('run_start.txt', 'res2 status: ' + res2.status + '\nOut: ' + res2.stdout + '\nErr: ' + res2.stderr + '\n');

} catch (e) {
  fs.appendFileSync('run_start.txt', 'Error: ' + e.message + '\n' + e.stack);
}

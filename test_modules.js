const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

fs.writeFileSync(path.join(__dirname, 'output.log'), 'Script started\n');

const nodeDir = path.join(__dirname, '.tools', 'node-v20.18.0-win-x64');
const npmCmd = path.join(nodeDir, 'npm.cmd');
const env = Object.assign({}, process.env, { PATH: nodeDir + ';' + (process.env.PATH || '') });

try {
  fs.appendFileSync(path.join(__dirname, 'output.log'), 'Installing root packages...\n');
  const o1 = execSync(`"${npmCmd}" install express cors dotenv --no-audit`, { cwd: __dirname, env, encoding: 'utf-8' });
  fs.appendFileSync(path.join(__dirname, 'output.log'), 'Root OK: ' + o1 + '\n');
} catch (e) {
  fs.appendFileSync(path.join(__dirname, 'output.log'), 'Root ERR: ' + e.message + '\nSTDERR:' + e.stderr + '\nSTDOUT:' + e.stdout + '\n');
}

try {
  fs.appendFileSync(path.join(__dirname, 'output.log'), 'Installing client packages...\n');
  const clientDir = path.join(__dirname, 'client');
  const o2 = execSync(`"${npmCmd}" install lucide-react react react-dom @vitejs/plugin-react vite --no-audit`, { cwd: clientDir, env, encoding: 'utf-8' });
  fs.appendFileSync(path.join(__dirname, 'output.log'), 'Client OK: ' + o2 + '\n');
} catch (e) {
  fs.appendFileSync(path.join(__dirname, 'output.log'), 'Client ERR: ' + e.message + '\nSTDERR:' + e.stderr + '\nSTDOUT:' + e.stdout + '\n');
}

fs.appendFileSync(path.join(__dirname, 'output.log'), 'Script completed\n');

const fs = require('fs');
const path = require('path');

const avatarBuffer = fs.readFileSync(path.join(__dirname, 'avatar.jpg'));
const b64 = avatarBuffer.toString('base64');
const dataUri = `data:image/jpeg;base64,${b64}`;

let html = fs.readFileSync(path.join(__dirname, 'client/dist/index.html'), 'utf8');

// Replace favicon
html = html.replace(/<link\s+rel="icon"[^>]*>/gi, `<link rel="icon" type="image/jpeg" href="${dataUri}">`);
html = html.replace(/<link\s+rel="shortcut icon"[^>]*>/gi, `<link rel="shortcut icon" type="image/jpeg" href="${dataUri}">`);
html = html.replace(/<link\s+rel="apple-touch-icon"[^>]*>/gi, `<link rel="apple-touch-icon" href="${dataUri}">`);

// Define AVATAR_IMAGE constant
if (!html.includes('const AVATAR_IMAGE')) {
  html = html.replace('const initialProjects = [', `const AVATAR_IMAGE = "${dataUri}";\n    const initialProjects = [`);
} else {
  html = html.replace(/const AVATAR_IMAGE = "[^"]*";/, `const AVATAR_IMAGE = "${dataUri}";`);
}

// Replace /avatar.jpg references with {AVATAR_IMAGE}
html = html.replace(/src="\/avatar\.jpg"/g, 'src={AVATAR_IMAGE}');
html = html.replace(/src='\/avatar\.jpg'/g, 'src={AVATAR_IMAGE}');

// Update dynamic favicon updater script
html = html.replace(/icon\.href = '\/avatar\.jpg[^']*';/g, `icon.href = "${dataUri}";`);

fs.writeFileSync(path.join(__dirname, 'client/dist/index.html'), html, 'utf8');
console.log('Successfully embedded Base64 avatar into client/dist/index.html! Total size:', html.length);

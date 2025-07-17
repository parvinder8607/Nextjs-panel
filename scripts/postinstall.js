#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const packageRoot = path.resolve(__dirname, '..');

const foldersToCopy = [
  {
    from: path.join(packageRoot, 'src/app/admin'),
    to: path.join(projectRoot, 'src/app/admin')
  },
  {
    from: path.join(packageRoot, 'src/resources'),
    to: path.join(projectRoot, 'src/resources')
  }
];

function copyFolderRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;

  fs.mkdirSync(dest, { recursive: true });

  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyFolderRecursiveSync(srcPath, destPath);
    } else {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copied: ${destPath}`);
      } else {
        console.log(`⚠️ Skipped (already exists): ${destPath}`);
      }
    }
  }
}

foldersToCopy.forEach(({ from, to }) => {
  copyFolderRecursiveSync(from, to);
});

console.log('🎉 Admin panel and resources copied into your project.');

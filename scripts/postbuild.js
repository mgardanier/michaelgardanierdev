import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

function generateS3Aliases(targetDir) {
  if (!fs.existsSync(targetDir)) return;
  const items = fs.readdirSync(targetDir, { withFileTypes: true });

  for (const item of items) {
    const itemPath = path.join(targetDir, item.name);
    if (item.isDirectory()) {
      const indexPath = path.join(itemPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        const htmlPath = `${itemPath}.html`;
        fs.copyFileSync(indexPath, htmlPath);
        console.log(`[postbuild] Generated alias: ${htmlPath}`);
      }
      generateS3Aliases(itemPath);
    }
  }
}

generateS3Aliases(distDir);

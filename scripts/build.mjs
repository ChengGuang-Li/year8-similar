import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { Script } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = ['index.html', 'theme.css', 'geometry.css', 'geometry.js', 'content.js', 'deck.js'];
await mkdir(resolve(root, 'dist'), { recursive: true });
let bytes = 0;
for (const file of files) {
  const content = await readFile(resolve(root, file), 'utf8');
  if (file.endsWith('.js')) new Script(content, { filename: file });
  await writeFile(resolve(root, 'dist', file), content);
  bytes += Buffer.byteLength(content);
}
console.log(`Built ${files.length} static files · ${(bytes / 1024).toFixed(1)} KB · dist/`);

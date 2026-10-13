// Run on the hosting server or against a downloaded copy of its private data.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const source = path.resolve(process.argv[2] || process.env.QLLIX_STORAGE_DIR || '');
const destination = process.argv[3] && path.resolve(process.argv[3]);
if ((!process.argv[2] && !process.env.QLLIX_STORAGE_DIR) || !destination) {
  console.error('Usage: node scripts/backup-storage.cjs <CMS storage directory> <backup output directory>');
  process.exit(1);
}
const relative = path.relative(source, destination);
if (!relative || (!relative.startsWith('..' + path.sep) && relative !== '..' && !path.isAbsolute(relative))) {
  throw new Error('Choose a backup output directory outside the CMS storage directory');
}
const document = JSON.parse(fs.readFileSync(path.join(source, 'cms-data.json'), 'utf8'));
if (!document.general || !Array.isArray(document.portfolioItems)) throw new Error('Invalid CMS document');

const files = [];
function collect(directory, prefix) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw new Error('Media backups must not contain symbolic links');
    const filename = path.join(directory, entry.name);
    const name = prefix + '/' + entry.name;
    if (entry.isDirectory()) collect(filename, name);
    else if (entry.isFile()) files.push({ name, bytes: fs.statSync(filename).size, sha256: crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex') });
  }
}
const media = path.join(source, 'media');
if (fs.existsSync(media)) collect(media, 'media');

const external = new Set();
const missing = new Set();
function inspect(value) {
  if (typeof value === 'string') {
    if (/^https?:\/\/[^/]*blob\.vercel-storage\.com\//.test(value)) external.add(value);
    if (value.startsWith('/media/')) {
      const filename = value.slice('/media/'.length);
      if (!/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/.test(filename) || !fs.existsSync(path.join(media, filename))) missing.add(value);
    }
  } else if (Array.isArray(value)) value.forEach(inspect);
  else if (value && typeof value === 'object') Object.values(value).forEach(inspect);
}
inspect(document);
fs.mkdirSync(destination, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const archive = path.join(destination, `qllix-data-${stamp}.tar.gz`);
execFileSync('tar', ['-czf', archive, '-C', source, 'cms-data.json', ...(fs.existsSync(media) ? ['media'] : [])]);
const manifest = { createdAt: new Date().toISOString(), projects: document.portfolioItems.length, mediaFiles: files.length, complete: external.size === 0 && missing.size === 0, unresolvedBlobImages: [...external], missingLocalMedia: [...missing], archiveSha256: crypto.createHash('sha256').update(fs.readFileSync(archive)).digest('hex'), files };
fs.writeFileSync(archive + '.manifest.json', JSON.stringify(manifest, null, 2), { mode: 0o600 });
console.log(JSON.stringify({ archive, projects: manifest.projects, mediaFiles: manifest.mediaFiles, complete: manifest.complete, unresolvedBlobImages: external.size, missingLocalMedia: missing.size }));
if (!manifest.complete) console.warn('Incomplete media backup: restore external or missing images before treating this as a complete recovery copy.');

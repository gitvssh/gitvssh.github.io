import { mkdir, readFile, readdir } from 'node:fs/promises';
import { extname, join, relative, resolve, sep } from 'node:path';
import sharp from 'sharp';

const WIDTH = 1280;
const HEIGHT = 720;
const postsRoot = resolve('src/content/posts');
const outputRoot = resolve('dist/social');
const supportedExtensions = new Set(['.avif', '.jpeg', '.jpg', '.png', '.webp']);

function readFrontmatterValue(markdown, key) {
  const match = markdown.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'));
  return match?.[1];
}

await mkdir(outputRoot, { recursive: true });

const postDirectories = (await readdir(postsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name));

let generated = 0;

for (const directory of postDirectories) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(directory.name)) {
    throw new Error(`Invalid post directory slug: ${directory.name}`);
  }

  const postRoot = resolve(postsRoot, directory.name);
  const markdown = await readFile(join(postRoot, 'index.md'), 'utf8');
  if (/^draft:\s*true\s*$/m.test(markdown)) continue;

  const coverValue = readFrontmatterValue(markdown, 'cover');
  if (!coverValue) throw new Error(`${directory.name}: cover frontmatter is required.`);

  const coverPath = resolve(postRoot, coverValue);
  if (!coverPath.startsWith(`${postRoot}${sep}`)) {
    throw new Error(`${directory.name}: cover path escapes its post directory.`);
  }
  if (!supportedExtensions.has(extname(coverPath).toLowerCase())) {
    throw new Error(`${directory.name}: unsupported cover extension.`);
  }

  const outputPath = join(outputRoot, `${directory.name}.webp`);
  await sharp(coverPath)
    // Published covers reserve their upper region for the verified title and opening visual.
    // A fixed crop is predictable; saliency crops can jump to a lower caption and cut faces.
    .resize({ width: WIDTH, height: HEIGHT, fit: 'cover', position: 'north' })
    .webp({ quality: 86, smartSubsample: false })
    .toFile(outputPath);

  const metadata = await sharp(outputPath).metadata();
  if (metadata.width !== WIDTH || metadata.height !== HEIGHT || metadata.format !== 'webp') {
    throw new Error(
      `${directory.name}: expected ${WIDTH}x${HEIGHT} WebP, got ` +
        `${metadata.width}x${metadata.height} ${metadata.format}.`,
    );
  }

  generated += 1;
}

console.log(
  `Generated ${generated} social images in ${relative(resolve('.'), outputRoot)} ` +
    `(${WIDTH}x${HEIGHT} WebP).`,
);

import { mkdir, readFile, readdir } from 'node:fs/promises';
import { extname, join, relative, resolve, sep } from 'node:path';
import sharp from 'sharp';

// Keep in sync with SOCIAL_IMAGE_WIDTH/HEIGHT and socialImagePathForPost() in src/lib/site.ts.
const WIDTH = 1280;
const HEIGHT = 720;
const postsRoot = resolve('src/content/posts');
const outputRoot = resolve(process.argv[2] ?? 'dist', 'social');
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
  const frontmatter = markdown.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? '';
  if (/^draft:\s*true\s*$/m.test(frontmatter)) continue;

  const coverValue = readFrontmatterValue(frontmatter, 'cover');
  // The content schema requires a cover for comics. Articles without one share
  // public/social-default.jpg; their page and RSS never point at a missing card.
  if (!coverValue) continue;

  const coverPath = resolve(postRoot, coverValue);
  if (!coverPath.startsWith(`${postRoot}${sep}`)) {
    throw new Error(`${directory.name}: cover path escapes its post directory.`);
  }
  if (!supportedExtensions.has(extname(coverPath).toLowerCase())) {
    throw new Error(`${directory.name}: unsupported cover extension.`);
  }

  // JPEG rather than WebP: KakaoTalk, Naver, and several link scrapers still skip WebP previews,
  // and Korean sharing runs through those channels.
  const outputPath = join(outputRoot, `${directory.name}.jpg`);
  await sharp(coverPath)
    // Published covers reserve their upper region for the verified title and opening visual.
    // A fixed crop is predictable; saliency crops can jump to a lower caption and cut faces.
    .resize({ width: WIDTH, height: HEIGHT, fit: 'cover', position: 'north' })
    .flatten({ background: '#f7f5ef' })
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toFile(outputPath);

  const metadata = await sharp(outputPath).metadata();
  if (metadata.width !== WIDTH || metadata.height !== HEIGHT || metadata.format !== 'jpeg') {
    throw new Error(
      `${directory.name}: expected ${WIDTH}x${HEIGHT} JPEG, got ` +
        `${metadata.width}x${metadata.height} ${metadata.format}.`,
    );
  }

  generated += 1;
}

console.log(
  `Generated ${generated} social images in ${relative(resolve('.'), outputRoot)} ` +
    `(${WIDTH}x${HEIGHT} JPEG).`,
);

import { execFileSync } from "node:child_process";
import { lstatSync, readFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";

const MAX_FILE_BYTES = 5 * 1024 * 1024;

const allowedRootFiles = new Set([
  ".gitignore",
  "AGENTS.md",
  "LICENSE",
  "README.md",
  "astro.config.mjs",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "tsconfig.json",
]);

const allowedRootDirectories = [".github/", "public/", "scripts/", "src/"];
const textExtensions = new Set([
  ".astro",
  ".css",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".txt",
  ".yaml",
  ".yml",
]);
const publicPostAssetExtensions = new Set([
  ".avif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);

const blockedPathSegments = new Set([
  "_vault",
  "claims",
  "drafts",
  "inputs",
  "manifest",
  "outputs",
  "private",
  "prompts",
  "qa",
  "sources",
  "storyboard",
  "studio",
]);

const blockedFileNames = [
  /^\.env(?:\.|$)/i,
  /credential/i,
  /secret/i,
  /(?:^|\.)key$/i,
  /\.(?:p12|pem|pfx|sqlite|sqlite3|db)$/i,
];

const secretPatterns = [
  { label: "private key", pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { label: "GitHub token", pattern: /\bgithub_pat_[A-Za-z0-9_]{20,}\b/ },
  { label: "GitHub token", pattern: /\bgh[pousr]_[A-Za-z0-9]{20,}\b/ },
  { label: "AWS access key", pattern: /\bAKIA[0-9A-Z]{16}\b/ },
  { label: "Slack token", pattern: /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/ },
];

function listPublishCandidates() {
  const repositoryPath = resolve(".").replaceAll("\\", "/");
  const output = execFileSync(
    "git",
    [
      "-c",
      `safe.directory=${repositoryPath}`,
      "ls-files",
      "--cached",
      "--others",
      "--exclude-standard",
      "-z",
    ],
    { encoding: "utf8" },
  );

  return output
    .split("\0")
    .filter(Boolean)
    .map((file) => file.replaceAll("\\", "/"))
    .sort();
}

function isAllowedRootPath(file) {
  return (
    allowedRootFiles.has(file) ||
    allowedRootDirectories.some((directory) => file.startsWith(directory))
  );
}

function validatePublishedPostPath(file, errors) {
  if (!file.startsWith("src/content/posts/")) return;

  const match = file.match(/^src\/content\/posts\/[^/]+\/([^/]+)$/);
  if (!match) {
    errors.push(`${file}: published posts must use one slug directory`);
    return;
  }

  const fileName = match[1];
  if (fileName === "index.md") return;

  if (!publicPostAssetExtensions.has(extname(fileName).toLowerCase())) {
    errors.push(`${file}: post folders may contain only index.md and final web images`);
  }
}

function validateFile(file, errors) {
  if (!isAllowedRootPath(file)) {
    errors.push(`${file}: path is outside the public repository allowlist`);
  }

  const segments = file.toLowerCase().split("/");
  for (const segment of segments.slice(0, -1)) {
    if (blockedPathSegments.has(segment)) {
      errors.push(`${file}: private production path segment '${segment}' is blocked`);
    }
  }

  const fileName = basename(file);
  if (blockedFileNames.some((pattern) => pattern.test(fileName))) {
    errors.push(`${file}: sensitive filename is blocked`);
  }

  validatePublishedPostPath(file, errors);

  const stat = lstatSync(file);
  if (stat.isSymbolicLink()) {
    errors.push(`${file}: symbolic links are not allowed in the public repository`);
    return;
  }

  if (stat.size > MAX_FILE_BYTES) {
    errors.push(`${file}: ${stat.size} bytes exceeds the 5 MiB public file limit`);
  }

  if (!textExtensions.has(extname(file).toLowerCase()) || stat.size > 1024 * 1024) {
    return;
  }

  const content = readFileSync(file, "utf8");
  for (const { label, pattern } of secretPatterns) {
    if (pattern.test(content)) {
      errors.push(`${file}: possible ${label} detected`);
    }
  }
}

const files = listPublishCandidates();
const errors = [];

for (const file of files) {
  validateFile(file, errors);
}

if (errors.length > 0) {
  console.error("Public repository check failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Public repository check passed (${files.length} files).`);

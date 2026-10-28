import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import type { NextConfig } from 'next';

const pages = process.env.GITHUB_PAGES === 'true';
const commit = (process.env.GITHUB_SHA || process.env.NEXT_PUBLIC_COMMIT_SHA || readSha()).trim();
const builtAt = new Date().toISOString();
const basePath = pages ? '/ARC' : '';

function readSha() {
  try {
    return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
  } catch {
    return 'unknown';
  }
}

writeFileSync('public/version.json', JSON.stringify({ commit, builtAt, packageVersion: '1.0.0', heuristic: 'arc-heuristic-v2', frontend: 'github-pages', backend: 'not-deployed-with-pages' }, null, 2));

const config: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_COMMIT_SHA: commit,
    NEXT_PUBLIC_BUILD_TIME: builtAt,
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(pages ? { output: 'export' as const, basePath, assetPrefix: basePath } : {
    async headers() {
      return [{ source: '/version.json', headers: [{ key: 'Cache-Control', value: 'no-store' }] }];
    },
  }),
};

export default config;

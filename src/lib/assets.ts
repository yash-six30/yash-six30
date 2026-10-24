/**
 * Asset path helper that prefixes NEXT_PUBLIC_BASE_PATH for GitHub Pages deployment.
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}

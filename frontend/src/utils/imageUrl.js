/**
 * Resolve image URL: if it's a relative path (starts with /), 
 * prefix with the backend base URL so images are loaded from 
 * the Express static server, not the Vite dev server.
 */
const BACKEND_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:4000/api')
    .replace('/api', '');

export function resolveImageUrl(img) {
    if (!img) return '';
    // Already an absolute URL (http/https) → use as-is
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    // Relative path → prefix with backend origin
    return `${BACKEND_BASE}${img}`;
}

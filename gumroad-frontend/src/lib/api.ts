export function getBackendUrl(): string {
  if (typeof window !== 'undefined') {
    // Client-side: use env var if set, otherwise fallback to same-host:3001 for local dev
    return process.env.NEXT_PUBLIC_API_URL || `http://${window.location.hostname}:3001`;
  }
  // Server-side
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
}

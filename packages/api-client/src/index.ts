export function createClient(baseUrl: string) {
  const root = baseUrl.replace(/\/$/, '');

  return {
    baseUrl: root,
    fetch(path: string, init?: RequestInit) {
      const p = path.startsWith('/') ? path : `/${path}`;
      return fetch(`${root}${p}`, init);
    },
  };
}

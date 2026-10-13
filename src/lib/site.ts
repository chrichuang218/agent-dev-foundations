export const repositoryUrl = 'https://github.com/chrichuang218/agent-dev-foundations';

// Article IDs stay independent of the hosting prefix.
export function sitePath(path: string): string {
  return path.startsWith('/') && !path.startsWith('//')
    ? `${import.meta.env.BASE_URL}${path.slice(1)}`
    : path;
}

import { getPublicApiOrigin } from '@global/env';

/** Собирает абсолютный URL PDF из origin API и относительного пути с бэкенда. */
export function resolveOnlinePdfUrl(link: string): string {
  if (/^https?:\/\//i.test(link)) {
    return link;
  }

  const origin = getPublicApiOrigin();
  const path = link.startsWith('/') ? link : `/${link}`;
  return `${origin}${path}`;
}

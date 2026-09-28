import {
  AUTHOR_NAME,
  AUTHOR_PATH,
  SITE_DESCRIPTION,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_ORIGIN,
} from './site';

export type JsonLd = Record<string, unknown>;

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function absoluteUrl(path: string, site: URL | undefined = undefined) {
  return new URL(path, site ?? SITE_ORIGIN).href;
}

export function organizationSchema(site?: URL): JsonLd {
  return {
    '@type': 'Organization',
    '@id': `${absoluteUrl('/', site)}#organization`,
    name: SITE_NAME,
    url: absoluteUrl('/', site),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(SITE_LOGO_PATH, site),
    },
    founder: personSchema(site),
  };
}

export function personSchema(site?: URL): JsonLd {
  return {
    '@type': 'Person',
    '@id': `${absoluteUrl(AUTHOR_PATH, site)}#person`,
    name: AUTHOR_NAME,
    url: absoluteUrl(AUTHOR_PATH, site),
  };
}

export function webSiteSchema(site?: URL): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/', site)}#website`,
    name: SITE_NAME,
    alternateName: [AUTHOR_NAME, '다메카솔 블로그'],
    url: absoluteUrl('/', site),
    description: SITE_DESCRIPTION,
    inLanguage: 'ko-KR',
    publisher: organizationSchema(site),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[], site?: URL): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, site),
    })),
  };
}

export function collectionPageSchema(
  options: { name: string; description: string; path: string; postPaths: string[] },
  site?: URL,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: options.name,
    description: options.description,
    url: absoluteUrl(options.path, site),
    inLanguage: 'ko-KR',
    isPartOf: { '@id': `${absoluteUrl('/', site)}#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: options.postPaths.length,
      itemListElement: options.postPaths.map((path, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: absoluteUrl(path, site),
      })),
    },
  };
}

// `<` must be escaped so a title containing "</script>" cannot break out of the JSON-LD block.
export function serializeJsonLd(data: JsonLd | JsonLd[]) {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

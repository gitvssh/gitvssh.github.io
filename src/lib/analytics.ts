// Thin analytics transport (homelab policy §4.2).
//
// The site never loads a vendor tag itself and never sees a measurement ID. It only calls
// `window.zaraz.track(event, properties)`; Cloudflare Zaraz — configured in the Cloudflare
// console, not here — owns the GA4 connection, the consent gate (analytics purpose denied by
// default), and the measurement ID. Without Zaraz on the page every call is a silent no-op.
//
// Event names and their allowed properties are enumerated below so a template cannot send an
// unlisted event or attribute, and the value guard blocks anything that looks like PII.

export const ANALYTICS_EVENTS = {
  engaged_read: ['content_id', 'content_track', 'content_category'],
  article_complete: ['content_id', 'content_track', 'content_category'],
  related_post_click: ['target'],
  toc_click: ['target'],
  brand_profile_click: ['target'],
} as const satisfies Record<string, readonly string[]>;

export type AnalyticsEventName = keyof typeof ANALYTICS_EVENTS;
export type AnalyticsScalar = string | number | boolean;
export type AnalyticsProperties = Readonly<Record<string, AnalyticsScalar | undefined>>;

interface ZarazClient {
  track: (eventName: string, properties?: Record<string, AnalyticsScalar>) => void | Promise<unknown>;
}

declare global {
  interface Window {
    zaraz?: ZarazClient;
    blogAnalytics?: { event: (name: string, properties?: AnalyticsProperties) => void };
  }
}

const MAX_STRING_LENGTH = 120;
// Slugs, heading ids, track keys: nothing that could carry a URL, e-mail, phone number, or prose.
const SAFE_STRING = /^[\p{L}\p{N}_-]{1,120}$/u;

export function isAnalyticsEventName(name: string): name is AnalyticsEventName {
  return Object.hasOwn(ANALYTICS_EVENTS, name);
}

export function sanitizeProperties(
  name: AnalyticsEventName,
  properties: AnalyticsProperties = {},
): Record<string, AnalyticsScalar> {
  const allowed: readonly string[] = ANALYTICS_EVENTS[name];
  const output: Record<string, AnalyticsScalar> = {};

  for (const key of allowed) {
    const value = properties[key];
    if (value === undefined || value === null) continue;
    if (typeof value === 'number' || typeof value === 'boolean') {
      output[key] = value;
      continue;
    }
    const text = String(value).trim().slice(0, MAX_STRING_LENGTH);
    if (SAFE_STRING.test(text)) output[key] = text;
  }

  return output;
}

function ignoreRejectedDispatch(result: void | Promise<unknown>) {
  if (result && typeof (result as Promise<unknown>).catch === 'function') {
    void (result as Promise<unknown>).catch(() => undefined);
  }
}

export function dispatchAnalyticsEvent(name: string, properties?: AnalyticsProperties) {
  if (!isAnalyticsEventName(name)) return;
  if (typeof window === 'undefined' || typeof window.zaraz?.track !== 'function') return;

  try {
    ignoreRejectedDispatch(window.zaraz.track(name, sanitizeProperties(name, properties)));
  } catch {
    // Analytics must never interrupt reading.
  }
}

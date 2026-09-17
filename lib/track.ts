export type TrackProps = Record<string, string | number | boolean | undefined>;

type Gtag = (
  command: "event",
  eventName: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID ?? "";

/** No-op unless NEXT_PUBLIC_ANALYTICS_ID is set. */
export function track(event: string, props: TrackProps = {}): void {
  if (!ANALYTICS_ID) return;
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, props);
}

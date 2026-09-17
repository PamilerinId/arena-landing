import Script from "next/script";
import { ANALYTICS_ID } from "@/lib/track";

export function Analytics() {
  if (!ANALYTICS_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ANALYTICS_ID}');`}
      </Script>
    </>
  );
}

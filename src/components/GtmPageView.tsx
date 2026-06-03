import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Dispara um evento `page_view` no dataLayer a cada troca de rota client-side.
 * O envio efetivo das tags GA4/Ads é controlado pelo Consent Mode v2 no GTM,
 * portanto sempre empurramos pro dataLayer — o GTM decide o que disparar.
 */
const GtmPageView = () => {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = location.pathname + location.search;
    if (lastPath.current === path) return;
    lastPath.current = path;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
};

export default GtmPageView;

/// <reference types="vite/client" />

type ConsentValue = "granted" | "denied";

interface ConsentParams {
  ad_storage?: ConsentValue;
  ad_user_data?: ConsentValue;
  ad_personalization?: ConsentValue;
  analytics_storage?: ConsentValue;
  functionality_storage?: ConsentValue;
  personalization_storage?: ConsentValue;
  security_storage?: ConsentValue;
  wait_for_update?: number;
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

export {};

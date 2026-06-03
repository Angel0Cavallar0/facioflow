"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "cookie-consent";
const STORAGE_VERSION = 1;

type ConsentCategories = {
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = {
  v: number;
  ts: string;
  categories: ConsentCategories;
};

type GtagConsentUpdate = {
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  analytics_storage: "granted" | "denied";
  functionality_storage: "granted" | "denied";
  personalization_storage: "granted" | "denied";
};

function buildConsentPayload(cats: ConsentCategories): GtagConsentUpdate {
  const analytics = cats.analytics ? "granted" : "denied";
  const marketing = cats.marketing ? "granted" : "denied";
  return {
    analytics_storage: analytics,
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
    // functionality + personalization seguem a categoria "analytics" (cookies não-essenciais funcionais)
    functionality_storage: analytics,
    personalization_storage: analytics,
  };
}

function applyConsent(cats: ConsentCategories) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", buildConsentPayload(cats));
}

function readStored(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (!parsed || parsed.v !== STORAGE_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStored(categories: ConsentCategories) {
  if (typeof window === "undefined") return;
  const payload: StoredConsent = {
    v: STORAGE_VERSION,
    ts: new Date().toISOString(),
    categories,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota errors */
  }
}

const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Reaplica consentimento salvo no carregamento da página
  useEffect(() => {
    const stored = readStored();
    if (stored) {
      applyConsent(stored.categories);
      setAnalytics(stored.categories.analytics);
      setMarketing(stored.categories.marketing);
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const cats: ConsentCategories = { analytics: true, marketing: true };
    writeStored(cats);
    applyConsent(cats);
    setOpen(false);
  };

  const handleRejectAll = () => {
    const cats: ConsentCategories = { analytics: false, marketing: false };
    writeStored(cats);
    applyConsent(cats);
    setOpen(false);
  };

  const handleSavePreferences = () => {
    const cats: ConsentCategories = { analytics, marketing };
    writeStored(cats);
    applyConsent(cats);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-4xl rounded-xl border border-border/60 bg-background/95 p-4 shadow-2xl backdrop-blur-sm sm:p-6 dark:border-white/10 dark:bg-zinc-950/95">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:flex">
            <Cookie className="h-5 w-5 text-primary" aria-hidden />
          </div>

          <div className="flex-1 space-y-3">
            <div className="space-y-1.5">
              <h2 className="text-base font-semibold text-foreground">
                Sua privacidade é importante
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Usamos cookies para análise de tráfego, melhoria da experiência e,
                quando autorizado, marketing. Você pode aceitar todos, recusar ou
                escolher por categoria. Saiba mais na nossa{" "}
                <Link
                  to="/privacidade"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>

            {showCustomize && (
              <div className="space-y-3 rounded-lg border border-border/60 bg-muted/30 p-3 dark:border-white/5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <Label htmlFor="consent-essential" className="text-sm font-medium">
                      Essenciais
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Necessários para o funcionamento do site. Sempre ativos.
                    </p>
                  </div>
                  <Switch id="consent-essential" checked disabled aria-readonly />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <Label htmlFor="consent-analytics" className="text-sm font-medium">
                      Análise
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Ajudam a entender como o site é usado para que possamos melhorá-lo.
                    </p>
                  </div>
                  <Switch
                    id="consent-analytics"
                    checked={analytics}
                    onCheckedChange={setAnalytics}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <Label htmlFor="consent-marketing" className="text-sm font-medium">
                      Marketing
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Usados para personalização e mensuração de campanhas.
                    </p>
                  </div>
                  <Switch
                    id="consent-marketing"
                    checked={marketing}
                    onCheckedChange={setMarketing}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button onClick={handleAcceptAll} size="sm" className="font-medium">
                Aceitar todos
              </Button>
              <Button
                onClick={handleRejectAll}
                size="sm"
                variant="outline"
                className="font-medium"
              >
                Recusar
              </Button>
              {showCustomize ? (
                <Button onClick={handleSavePreferences} size="sm" variant="ghost">
                  Salvar preferências
                </Button>
              ) : (
                <Button
                  onClick={() => setShowCustomize(true)}
                  size="sm"
                  variant="ghost"
                >
                  Personalizar
                </Button>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleRejectAll}
            aria-label="Fechar e recusar cookies não essenciais"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

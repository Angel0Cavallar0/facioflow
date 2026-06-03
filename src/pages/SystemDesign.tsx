import { Helmet } from "react-helmet-async";
import SiteHeader from "@/components/SiteHeader";
import FacioFlowLogo from "@/components/FacioFlowLogo";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import logoDarkMode from "@/assets/logo-facioflow.png";
import logoLightMode from "@/assets/logo-facioflow-preta.png";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  CheckCheck,
  Cog,
  DollarSign,
  FileText,
  Hammer,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Package,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  Sun,
  TrendingUp,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";

const layoutLayers = [
  {
    title: "Estrutura global",
    text: "Header sticky, áreas de conteúdo por seção e encerramento com footer. O padrão mantém navegação consistente e foco na leitura.",
  },
  {
    title: "Containers e ritmo",
    text: "Uso recorrente de `container mx-auto px-4` com blocos em `py-20`/`md:py-28` para manter respiro visual e consistência entre páginas.",
  },
  {
    title: "Superfícies",
    text: "Combinação de `bg-muted/40`, `border-border/60` e variações `dark:*` para separar conteúdo sem perda de contraste em ambos os temas.",
  },
  {
    title: "Interações",
    text: "Estados de hover com `hover:border-primary` e microtransições (`transition-all`) reforçam hierarquia e feedback visual.",
  },
];

/** Valores HSL (sem `hsl()`) espelhando `src/index.css` — light na primeira linha, dark na segunda quando diferem. */
const paletteSwatches: {
  label: string;
  token: string;
  bgClass: string;
  notes: string;
}[] = [
  {
    label: "Background",
    token: "--background",
    bgClass: "bg-background",
    notes: "Light: 215 22% 87% · Dark: 222 47% 5%",
  },
  {
    label: "Foreground (texto)",
    token: "--foreground",
    bgClass: "bg-foreground",
    notes: "Light: 220 28% 12% · Dark: 210 40% 98%",
  },
  {
    label: "Card",
    token: "--card",
    bgClass: "bg-card",
    notes: "Light: 215 18% 92% · Dark: 222 47% 8%",
  },
  {
    label: "Muted",
    token: "--muted",
    bgClass: "bg-muted",
    notes: "Light: 215 18% 82% · Dark: 217 33% 17%",
  },
  {
    label: "Muted foreground",
    token: "--muted-foreground",
    bgClass: "bg-muted-foreground",
    notes: "Light: 215 12% 31% · Dark: 215 20% 65%",
  },
  {
    label: "Primary",
    token: "--primary",
    bgClass: "bg-primary",
    notes: "221 83% 53% (igual em light/dark)",
  },
  {
    label: "Secondary",
    token: "--secondary",
    bgClass: "bg-secondary",
    notes: "Light: 215 18% 84% · Dark: 217 33% 17%",
  },
  {
    label: "Destructive",
    token: "--destructive",
    bgClass: "bg-destructive",
    notes: "Light: 0 84% 60% · Dark: 0 63% 31%",
  },
  {
    label: "Border / input",
    token: "--border",
    bgClass: "bg-border",
    notes: "Light: 215 14% 74% · Dark: 217 33% 17%",
  },
  {
    label: "Ring (foco)",
    token: "--ring",
    bgClass: "bg-ring",
    notes: "221 83% 53%",
  },
  {
    label: "FacioFlow page bg",
    token: "--facioflow-dark",
    bgClass: "bg-facioflow-dark",
    notes: "Base da maioria das páginas · Light: 215 22% 87% · Dark: 222 47% 5%",
  },
  {
    label: "Azul profundo",
    token: "--facioflow-blue-deep",
    bgClass: "bg-facioflow-deep",
    notes: "224 76% 48% — gradientes e destaques",
  },
  {
    label: "Glow / destaque",
    token: "--facioflow-blue-glow",
    bgClass: "bg-facioflow-glow",
    notes: "221 83% 53% — alinhado ao primary",
  },
];

const tokenTableRows = [
  { token: "--background", role: "Plano de fundo base", light: "215 22% 87%", dark: "222 47% 5%" },
  { token: "--foreground", role: "Texto principal", light: "220 28% 12%", dark: "210 40% 98%" },
  { token: "--card", role: "Superfície de cards", light: "215 18% 92%", dark: "222 47% 8%" },
  { token: "--muted", role: "Fundos auxiliares", light: "215 18% 82%", dark: "217 33% 17%" },
  { token: "--border", role: "Contornos e divisões", light: "215 14% 74%", dark: "217 33% 17%" },
  { token: "--primary", role: "Ação e destaque", light: "221 83% 53%", dark: "221 83% 53%" },
  { token: "--facioflow-dark", role: "Base visual do produto", light: "215 22% 87%", dark: "222 47% 5%" },
  { token: "--radius", role: "Raio base de borda", light: "0.75rem", dark: "0.75rem" },
];

const reusablePatterns = [
  "Header sticky com blur e borda sutil (`SiteHeader`)",
  "Hero com `NetworkBackground` e overlay gradiente para legibilidade",
  "Cards em grid com borda translúcida + hover progressivo",
  "Blocos de CTA com gradientes, alto contraste e botão primário",
  "Seções segmentadas por `border-t`/`border-y` para cadência de leitura",
];

type IconItem = { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; name: string };

const marketingIcons: IconItem[] = [
  { icon: Package, name: "Package" },
  { icon: Cog, name: "Cog" },
  { icon: Zap, name: "Zap" },
  { icon: ShieldCheck, name: "ShieldCheck" },
  { icon: Bot, name: "Bot" },
  { icon: BarChart3, name: "BarChart3" },
  { icon: Wrench, name: "Wrench" },
  { icon: Search, name: "Search" },
  { icon: FileText, name: "FileText" },
  { icon: Hammer, name: "Hammer" },
  { icon: Rocket, name: "Rocket" },
  { icon: RefreshCw, name: "RefreshCw" },
  { icon: Instagram, name: "Instagram" },
  { icon: Linkedin, name: "Linkedin" },
  { icon: Mail, name: "Mail" },
  { icon: ArrowRight, name: "ArrowRight" },
];

const shellIcons: IconItem[] = [
  { icon: Menu, name: "Menu" },
  { icon: X, name: "X" },
  { icon: Moon, name: "Moon" },
  { icon: Sun, name: "Sun" },
];

const demoIcons: IconItem[] = [
  { icon: TrendingUp, name: "TrendingUp" },
  { icon: Users, name: "Users" },
  { icon: DollarSign, name: "DollarSign" },
  { icon: Activity, name: "Activity" },
  { icon: CheckCheck, name: "CheckCheck" },
];

const Section = ({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="py-12 md:py-16">
    <div className="container mx-auto max-w-6xl px-4">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
      )}
      <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      {description && <p className="mb-8 max-w-3xl text-muted-foreground md:text-lg">{description}</p>}
      {!description && <div className="mb-8" />}
      {children}
    </div>
  </section>
);

const SystemDesign = () => {
  return (
    <div className="min-h-screen bg-facioflow-dark font-sans text-facioflow-dark-foreground">
      <Helmet>
        <title>System Design — FacioFlow</title>
        <meta name="description" content="Página interna de referência de design do sistema FacioFlow." />
      </Helmet>
      <SiteHeader />

      <main className="border-t border-border/40 dark:border-white/5">
        <section className="border-b border-border/60 bg-facioflow-dark py-16 md:py-20 dark:border-white/10">
          <div className="container mx-auto max-w-4xl px-4">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">System Design</p>
            <h1 className="mb-5 text-3xl font-extrabold tracking-tight md:text-5xl">
              Guia visual da FacioFlow
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Referência viva com cores, tipografia, logos, ícones e componentes que compõem o layout atual do site.
              Os tokens semânticos abaixo refletem o tema ativo — use o alternador no header para comparar claro e
              escuro.
            </p>
          </div>
        </section>

        <Section
          eyebrow="Paleta"
          title="Cores (tokens CSS)"
          description="Cada caixa usa classes Tailwind mapeadas em `tailwind.config.ts` para `hsl(var(--token))`. Valores HSL estão em `src/index.css`."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paletteSwatches.map((item) => (
              <div
                key={item.token + item.label}
                className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm dark:border-white/10"
              >
                <div className={`h-24 w-full ${item.bgClass} border-b border-border/30 dark:border-white/10`} />
                <div className="space-y-1 p-4">
                  <p className="font-semibold leading-tight">{item.label}</p>
                  <p className="font-mono text-xs text-muted-foreground">{item.token}</p>
                  <p className="text-xs leading-snug text-muted-foreground">{item.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <section className="border-y border-border/60 bg-muted/20 py-12 dark:border-white/10 dark:bg-white/[0.03] md:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">Tipografia</p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">Fonte Tomorrow</h2>
            <p className="mb-10 max-w-3xl text-muted-foreground md:text-lg">
              Família carregada via Google Fonts em `src/index.css` (`family=Tomorrow:ital,wght@0,400;0,600;0,700;1,400`).
              No Tailwind, `font-sans` resolve para Tomorrow com fallbacks de sistema.
            </p>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-border/60 bg-card dark:border-white/10">
                <CardHeader>
                  <CardTitle>Pesos e estilos</CardTitle>
                  <CardDescription>Amostras com as mesmas classes da home.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Regular 400
                    </p>
                    <p className="text-lg font-normal">Automação inteligente para o seu negócio.</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Semibold 600
                    </p>
                    <p className="text-lg font-semibold">Automação inteligente para o seu negócio.</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Bold 700
                    </p>
                    <p className="text-lg font-bold">Automação inteligente para o seu negócio.</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Italic 400
                    </p>
                    <p className="text-lg font-normal italic">Automação inteligente para o seu negócio.</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Hierarquia (hero)
                    </p>
                    <h3 className="text-3xl font-extrabold tracking-tight md:text-5xl">Título de destaque</h3>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-primary">Eyebrow / selo</p>
                    <p className="mt-4 text-base text-muted-foreground md:text-lg">
                      Parágrafo de apoio com `text-muted-foreground` e leading relaxado.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card dark:border-white/10">
                <CardHeader>
                  <CardTitle>Raios e container</CardTitle>
                  <CardDescription>Constantes de layout usadas nas páginas públicas.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-16 w-16 rounded-sm border-2 border-primary bg-muted" />
                      <span className="text-xs text-muted-foreground">rounded-sm</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-16 w-16 rounded-md border-2 border-primary bg-muted" />
                      <span className="text-xs text-muted-foreground">rounded-md</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-16 w-16 rounded-lg border-2 border-primary bg-muted" />
                      <span className="text-xs text-muted-foreground">rounded-lg (= --radius)</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-16 w-16 rounded-full border-2 border-primary bg-muted" />
                      <span className="text-xs text-muted-foreground">rounded-full (CTA)</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Container centralizado com padding lateral; breakpoint `2xl` em 1400px (`tailwind.config.ts`).
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Section
          eyebrow="Marca"
          title="Logos"
          description="O componente `FacioFlowLogo` alterna automaticamente: versão clara no tema escuro e versão preta no tema claro."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/60 bg-muted/30 dark:border-white/10 dark:bg-white/5">
              <CardHeader>
                <CardTitle className="text-lg">Arquivo / uso escuro</CardTitle>
                <CardDescription>`logo-facioflow.png` — contraste em fundos escuros.</CardDescription>
              </CardHeader>
              <CardContent className="flex min-h-[140px] items-center justify-center rounded-lg bg-facioflow-dark p-8">
                <img src={logoDarkMode} alt="" className="h-12 w-auto md:h-14" decoding="async" />
              </CardContent>
            </Card>
            <Card className="border-border/60 bg-muted/30 dark:border-white/10 dark:bg-white/5">
              <CardHeader>
                <CardTitle className="text-lg">Arquivo / uso claro</CardTitle>
                <CardDescription>`logo-facioflow-preta.png` — contraste em fundos claros.</CardDescription>
              </CardHeader>
              <CardContent className="flex min-h-[140px] items-center justify-center rounded-lg bg-background p-8">
                <img src={logoLightMode} alt="" className="h-12 w-auto md:h-14" decoding="async" />
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 rounded-xl border border-dashed border-border/60 bg-muted/20 p-6 dark:border-white/15">
            <p className="mb-3 text-sm font-medium">Comportamento padrão no header</p>
            <div className="inline-flex items-center rounded-lg border border-border/60 bg-card px-6 py-4 dark:border-white/10">
              <FacioFlowLogo className="h-10 w-auto" />
            </div>
          </div>
        </Section>

        <Section
          eyebrow="Ícones"
          title="Lucide React"
          description="Biblioteca única de ícones no projeto. Abaixo: conjuntos usados na home, no shell (menu/tema) e em demos internas."
        >
          <div className="space-y-10">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Marketing (Index)
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {marketingIcons.map(({ icon: Icon, name }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card py-4 text-center dark:border-white/10"
                  >
                    <Icon className="size-6 text-primary" strokeWidth={1.75} aria-hidden />
                    <span className="font-mono text-[11px] text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Header e tema
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {shellIcons.map(({ icon: Icon, name }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card py-4 dark:border-white/10"
                  >
                    <Icon className="size-6 text-foreground" strokeWidth={1.75} aria-hidden />
                    <span className="font-mono text-[11px] text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Demos (componentes de exemplo)
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {demoIcons.map(({ icon: Icon, name }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card py-4 dark:border-white/10"
                  >
                    <Icon className="size-6 text-muted-foreground" strokeWidth={1.75} aria-hidden />
                    <span className="font-mono text-[11px] text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="Componentes"
          title="Botões e formulário"
          description="Variantes do `Button` (shadcn/ui + CVA) e campos alinhados aos tokens `--input` e `--ring`."
        >
          <div className="space-y-10">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-muted-foreground">Variantes × tamanhos</h3>
              <div className="flex flex-col gap-6 rounded-xl border border-border/60 bg-muted/30 p-6 dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-wrap items-center gap-3">
                  <Button className="rounded-full px-6">Primário (home)</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm" className="rounded-full">
                    sm + pill
                  </Button>
                  <Button size="default">default</Button>
                  <Button size="lg">lg</Button>
                  <Button size="icon" variant="outline" aria-label="Exemplo ícone">
                    <Search className="size-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>
                    Outline disabled
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4 rounded-xl border border-border/60 bg-card p-6 dark:border-white/10">
                <h3 className="text-sm font-semibold text-muted-foreground">Campos de texto</h3>
                <div className="space-y-2">
                  <Label htmlFor="sd-input">Label</Label>
                  <Input id="sd-input" placeholder="Placeholder padrão" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sd-input-d">Desabilitado</Label>
                  <Input id="sd-input-d" placeholder="Não editável" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sd-ta">Área de texto</Label>
                  <Textarea id="sd-ta" placeholder="Mensagem..." rows={4} />
                </div>
              </div>
              <div className="space-y-4 rounded-xl border border-border/60 bg-card p-6 dark:border-white/10">
                <h3 className="text-sm font-semibold text-muted-foreground">Checkbox</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sd-c1" defaultChecked />
                  <Label htmlFor="sd-c1">Opção marcada</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sd-c2" />
                  <Label htmlFor="sd-c2">Opção desmarcada</Label>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <section className="border-y border-border/60 bg-muted/20 py-12 dark:border-white/10 dark:bg-white/[0.03] md:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">Arquitetura de layout</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {layoutLayers.map((item) => (
                <Card key={item.title} className="border-border/60 bg-muted/40 dark:border-white/10 dark:bg-white/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">Tokens (tabela)</h2>
            <div className="overflow-x-auto rounded-xl border border-border/60 dark:border-white/10">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-muted/40 dark:bg-white/5">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Token</th>
                    <th className="px-4 py-3 font-semibold">Papel</th>
                    <th className="px-4 py-3 font-semibold">Light</th>
                    <th className="px-4 py-3 font-semibold">Dark</th>
                  </tr>
                </thead>
                <tbody>
                  {tokenTableRows.map((row) => (
                    <tr key={row.token} className="border-t border-border/60 dark:border-white/10">
                      <td className="px-4 py-3 font-mono text-xs">{row.token}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.role}</td>
                      <td className="px-4 py-3">{row.light}</td>
                      <td className="px-4 py-3">{row.dark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-2 lg:max-w-6xl">
            <Card className="border-border/60 bg-muted/40 dark:border-white/10 dark:bg-white/5">
              <CardHeader>
                <CardTitle>Padrões reutilizáveis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {reusablePatterns.map((item) => (
                  <p key={item} className="text-sm leading-relaxed text-muted-foreground">
                    - {item}
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-muted/40 dark:border-white/10 dark:bg-white/5">
              <CardHeader>
                <CardTitle>Comparativo rápido de tema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border/60 bg-background p-4 dark:border-white/10 dark:bg-facioflow-dark">
                  <p className="text-sm font-semibold">Light</p>
                  <p className="text-sm text-muted-foreground">
                    Superfície clara com cinza estruturado e contraste forte no texto principal.
                  </p>
                </div>
                <div className="rounded-lg border border-border/60 bg-facioflow-dark p-4 dark:border-white/10">
                  <p className="text-sm font-semibold">Dark</p>
                  <p className="text-sm text-muted-foreground">
                    Fundo profundo com elementos translúcidos e destaque em azul primário para ação.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-t border-border/60 py-14 dark:border-white/10 md:py-20">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">Navegação e acesso</h2>
            <p className="mb-8 text-muted-foreground">
              Esta página está disponível apenas por rota direta e não aparece no menu principal, preservando a
              navegação pública do site.
            </p>
            <Button asChild className="rounded-full px-7">
              <Link to="/">Voltar para Início</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SystemDesign;

import SiteHeader from "@/components/SiteHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

const tokenRows = [
  { token: "--background", role: "Plano de fundo base", light: "215 22% 87%", dark: "222 47% 5%" },
  { token: "--foreground", role: "Texto principal", light: "220 28% 12%", dark: "210 40% 98%" },
  { token: "--card", role: "Superfície de cards", light: "215 18% 92%", dark: "222 47% 8%" },
  { token: "--muted", role: "Fundos auxiliares", light: "215 18% 82%", dark: "217 33% 17%" },
  { token: "--border", role: "Contornos e divisões", light: "215 14% 74%", dark: "217 33% 17%" },
  { token: "--primary", role: "Ação e destaque", light: "221 83% 53%", dark: "221 83% 53%" },
  { token: "--facioflow-dark", role: "Base visual do produto", light: "215 22% 87%", dark: "222 47% 5%" },
];

const reusablePatterns = [
  "Header sticky com blur e borda sutil (`SiteHeader`)",
  "Hero com `NetworkBackground` e overlay gradiente para legibilidade",
  "Cards em grid com borda translúcida + hover progressivo",
  "Blocos de CTA com gradientes, alto contraste e botão primário",
  "Seções segmentadas por `border-t`/`border-y` para cadência de leitura",
];

const SystemDesign = () => {
  return (
    <div className="min-h-screen bg-facioflow-dark font-sans text-facioflow-dark-foreground">
      <SiteHeader />

      <main className="border-t border-border/40 dark:border-white/5">
        <section className="border-b border-border/60 bg-facioflow-dark py-16 md:py-20 dark:border-white/10">
          <div className="container mx-auto max-w-4xl px-4">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">System Design</p>
            <h1 className="mb-5 text-3xl font-extrabold tracking-tight md:text-5xl">
              Base de layout atual da FacioFlow
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Esta página documenta os padrões de layout usados no sistema hoje, com foco em estrutura, reutilização de
              componentes e comportamento visual em light e dark mode.
            </p>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
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

        <section className="border-y border-border/60 bg-muted/20 py-14 dark:border-white/10 dark:bg-white/[0.03] md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">Tokens visuais (light/dark)</h2>
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
                  {tokenRows.map((row) => (
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

        <section className="py-14 md:py-20">
          <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-2">
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
              Esta página está disponível apenas por rota direta e não aparece no menu principal, preservando a navegação
              pública do site.
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

import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  Cog,
  Zap,
  ShieldCheck,
  Bot,
  BarChart3,
  Wrench,
  Search,
  FileText,
  Hammer,
  Rocket,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import NetworkBackground from "@/components/NetworkBackground";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const HIGHLIGHTS = [
  { icon: Package, title: "Desenvolvimento de Produto" },
  { icon: Cog, title: "Automação de Processos" },
  { icon: Zap, title: "Implementação rápida" },
  { icon: ShieldCheck, title: "Segurança de Dados" },
];

const SERVICES = [
  {
    icon: Cog,
    title: "Automação de processos e integrações",
    desc: "Workflows que conectam ferramentas, eliminam tarefas manuais e fazem seus sistemas trabalharem como um só. Cada processo é mapeado, modelado e automatizado com regras próprias do seu negócio, garantindo execução consistente e auditável.",
  },
  {
    icon: Bot,
    title: "Agentes de IA e atendimento automatizado",
    desc: "Chatbots e agentes inteligentes em WhatsApp, site e canais internos, com contexto próprio do seu negócio via arquitetura RAG. Aplicações que vão de qualificação de leads e suporte ao cliente até processos de RH e atendimento interno.",
  },
  {
    icon: BarChart3,
    title: "Dashboards e inteligência de dados",
    desc: "Painéis personalizados que centralizam indicadores de marketing, vendas, operação e atendimento. Dados consolidados das ferramentas que sua empresa já usa, atualizados automaticamente e prontos para decisão.",
  },
  {
    icon: Wrench,
    title: "Plataformas sob medida",
    desc: "Aplicações web completas para quando ferramenta de prateleira não resolve. Painéis administrativos, sistemas internos, portais de cliente — construídos com stack moderna e arquitetura escalável, prontos para crescer com o negócio.",
  },
];

const STEPS = [
  { num: 1, icon: Search, title: "Análise", desc: "Entendemos seus objetivos e restrições" },
  { num: 2, icon: FileText, title: "Especificação", desc: "Criamos o escopo e o cronograma do projeto" },
  { num: 3, icon: Hammer, title: "Construção", desc: "Desenvolvemos o projeto e testes na aplicação" },
  { num: 4, icon: Rocket, title: "Lançamento", desc: "Implementamos o sistema para uso geral e treinamento da equipe" },
  { num: 5, icon: RefreshCw, title: "Otimização Contínua", desc: "Verificamos as métricas e sugerimos melhorias nos processos com base nos dados" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-facioflow-dark font-sans text-facioflow-dark-foreground">
      <Helmet>
        <title>FacioFlow — Inteligência Tecnológica que Escala seu Negócio</title>
        <meta
          name="description"
          content="Soluções e automações personalizadas com IA para facilitar os processos da sua empresa e trazer mais clareza sobre os dados."
        />
        <link rel="canonical" href="https://facioflow.com.br/" />
        <meta property="og:title" content="FacioFlow — Inteligência Tecnológica que Escala seu Negócio" />
        <meta property="og:url" content="https://facioflow.com.br/" />
      </Helmet>
      <SiteHeader />

      <main>
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden py-24 md:py-36">
          {/* Animated network background */}
          <NetworkBackground />
          {/* Gradient overlay for legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/45 via-muted/20 to-muted/50 dark:from-facioflow-dark/40 dark:via-facioflow-dark/20 dark:to-facioflow-dark/60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

          <div className="container relative mx-auto px-4 text-center max-w-3xl">
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Inteligência tecnológica que{" "}
              <span className="text-primary">escala seu negócio</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Desenvolvemos soluções e automações personalizadas com IA para facilitar os processos da sua empresa e trazer mais clareza sobre os dados.
            </p>
            {/* CTA PLACEHOLDER — substitua o href abaixo pelo seu link */}
            <a href="#">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 text-base font-semibold shadow-lg shadow-primary/30">
                Comece Agora
              </Button>
            </a>
          </div>
        </section>

        {/* ─── DESTAQUES ─── */}
        <section className="border-t border-border/40 bg-muted/50 py-16 dark:border-white/5 dark:bg-facioflow-dark">
          <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {HIGHLIGHTS.map((h) => (
              <Card
                key={h.title}
                className="border-border/60 bg-muted/40 transition-colors hover:border-primary/50 group dark:border-white/10 dark:bg-white/5"
              >
                <CardContent className="flex flex-row items-center p-4 gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                    <h.icon className="text-primary" size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-facioflow-dark-foreground leading-snug">{h.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── SOLUÇÕES ─── */}
        <section
          id="solucoes"
          className="bg-gradient-to-b from-background to-muted/35 py-20 md:py-28 dark:from-facioflow-dark dark:to-facioflow-dark"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">O que entregamos</h2>
              <p className="text-muted-foreground">
                Soluções tecnológicas construídas para gerar valor real, do diagnóstico à operação rodando.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {SERVICES.map((s) => (
                <Card
                  key={s.title}
                  className="border-border/60 bg-muted/40 transition-all hover:-translate-y-1 hover:border-primary/40 dark:border-white/10 dark:bg-white/5"
                >
                  <CardContent className="space-y-4 p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15">
                      <s.icon className="text-primary" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-facioflow-dark-foreground">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary px-8 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 ease-out hover:scale-105 hover:bg-primary/90 active:scale-100"
              >
                <Link to="/servicos" className="group inline-flex items-center gap-2">
                  Conheça mais nossos serviços
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ─── SEGURANÇA ─── */}
        <section
          id="seguranca"
          className="border-t border-border/40 bg-gradient-to-br from-primary/10 via-background to-muted/40 py-20 md:py-28 dark:border-white/5 dark:via-facioflow-dark dark:to-facioflow-dark"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
                  <ShieldCheck className="text-primary" size={32} />
                </div>
              </div>
              <h2 className="mb-8 text-3xl font-bold md:text-4xl">
                Segurança e <span className="text-primary">Privacidade de Dados</span>
              </h2>
              <div className="space-y-5 text-left leading-relaxed text-muted-foreground md:text-center">
                <p>
                  A segurança dos seus dados é prioridade absoluta na FacioFlow. Toda a nossa operação é construída sobre
                  práticas rigorosas de proteção, em total conformidade com a{" "}
                  <strong className="text-facioflow-dark-foreground">LGPD</strong> e o{" "}
                  <strong className="text-facioflow-dark-foreground">GDPR</strong> — desde a coleta até o armazenamento e o
                  processamento.
                </p>
                <p>
                  Trabalhamos exclusivamente com provedores e ferramentas em conformidade com as normas de privacidade e
                  segurança da informação, e mantemos políticas internas de governança, controle de acesso e transparência em
                  todas as operações que envolvem dados sensíveis.
                </p>
                <p className="font-semibold text-facioflow-dark-foreground">
                  Seus dados são seus. Nós só tratamos eles com a responsabilidade e cuidado que eles merecem.
                </p>
              </div>
              <div className="mt-10 flex justify-center">
                <Link
                  to="/privacidade"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/90"
                >
                  Saiba mais sobre nossa política de privacidade
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── COMO TRABALHAMOS ─── */}
        <section
          id="como-trabalhamos"
          className="relative overflow-hidden border-t border-border/40 py-20 md:py-28 dark:border-white/5"
        >
          {/* Animated network background */}
          <NetworkBackground />
          {/* Gradient overlay for legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/45 via-muted/20 to-muted/50 dark:from-facioflow-dark/40 dark:via-facioflow-dark/20 dark:to-facioflow-dark/60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
          <div className="container relative mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Como <span className="text-primary">Trabalhamos</span>
            </h2>

            <div className="relative max-w-4xl mx-auto">
              {/* Vertical line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2" />

              <div className="space-y-12 md:space-y-0">
                {STEPS.map((step, i) => (
                  <div key={step.num} className={`relative md:flex items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:mb-16 last:md:mb-0`}>
                    {/* Content */}
                    <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                      <Card className="inline-block border-border/60 bg-muted/40 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-muted/60 hover:shadow-xl hover:shadow-primary/25 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                        <CardContent className="p-6 space-y-2">
                          <div className="flex items-center gap-3 justify-start">
                            <step.icon className="text-primary" size={20} />
                            <h3 className="text-lg font-semibold text-facioflow-dark-foreground">{step.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{step.desc}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-primary-foreground items-center justify-center font-bold text-sm shadow-lg shadow-primary/40">
                      {step.num}
                    </div>

                    {/* Mobile number */}
                    <div className="md:hidden flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        {step.num}
                      </div>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-primary to-facioflow-deep relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(221_83%_53%_/_0.3),_transparent_60%)] pointer-events-none" />
          <div className="container relative mx-auto px-4 text-center max-w-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Pronto para elevar os processos da sua empresa?
            </h3>
            <p className="text-primary-foreground/80 text-lg mb-10">
              Vamos discutir seus desafios e construir um sistema que te ajuda a tomar decisões baseadas em dados.
            </p>
            {/* CTA PLACEHOLDER — substitua o href abaixo pelo seu link */}
            <a href="#">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-10 py-6 text-base font-semibold shadow-xl">
                Fale com a FacioFlow
              </Button>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;

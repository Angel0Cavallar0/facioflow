import type { ComponentType } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";
import PointSphere from "@/components/PointSphere";
import NetworkBackground from "@/components/NetworkBackground";
import MiniDashboard from "@/components/MiniDashboardv2";
import MiniChat from "@/components/MiniChat";
import MiniWorkflow from "@/components/MiniWorkflowv2";
import MiniPlatform from "@/components/MiniPlatform";
import { ShieldCheckIcon } from "@/components/ShieldCheckIcon";
import { SpeedChatIcon } from "@/components/SpeedChatIcon";
import { ScalabilityIcon } from "@/components/ScalabilityIcon";
import { VisibilityIcon } from "@/components/VisibilityIcon";
import { IntegrationIcon } from "@/components/IntegrationIcon";
import { FocusTasksIcon } from "@/components/FocusTasksIcon";

const serviceItems = [
  {
    title: "Automação de processos e integrações",
    body: "Workflows que conectam ferramentas e eliminam tarefas manuais e repetitivas em qualquer área da operação. Vendas, marketing, financeiro, logística, RH, cada processo é mapeado, modelado e automatizado com gatilhos, validações e regras de negócio próprias da sua empresa, garantindo que o resultado seja consistente e auditável a cada execução. A base de qualquer automação eficaz é a integração entre os sistemas envolvidos. Quando ERPs, CRMs, ferramentas de marketing e canais de atendimento operam de forma centralizada, reduzimos o retrabalho, melhoramos a qualidade dos dados e suas decisões são ainda mais precisas. Cada projeto começa com uma consultoria técnica para avaliar a viabilidade de integração entre os sistemas envolvidos. A partir desse diagnóstico, é definida a arquitetura adequada para o seu negócio.",
    imagePath: "/images/automacao_processos",
    imageFirst: true,
  },
  {
    title: "Agentes de IA e atendimento automatizado",
    body: "Desenvolvemos chatbots e agentes inteligentes que operam em WhatsApp, site, canais internos e plataformas de atendimento. Os agentes são construídos com contexto próprio do seu negócio, usando arquitetura RAG (Retrieval-Augmented Generation) para consultar bases de conhecimento, documentos e sistemas em tempo real. Aplicações comuns incluem qualificação de leads, suporte ao cliente, triagem inicial, e atendimento interno para times (Consulta de RH, informações internas, envio de informativos).",
    imagePath: "/images/agentes_ia",
    imageFirst: false,
  },
  {
    title: "Dashboards e inteligência de dados",
    body: "Painéis personalizados que centralizam indicadores de marketing, vendas, operação e atendimento em uma única interface. Os dados são consolidados a partir das ferramentas que você já usa, atualizados automaticamente e apresentados em visualizações que facilitam a tomada de decisão. Em vez de abrir cinco plataformas para entender o cenário, sua equipe consulta um único painel com a leitura completa.",
    imagePath: "/images/dashboards_dados",
    imageFirst: true,
  },
  {
    title: "Plataformas sob medida",
    body: "Quando o que sua operação precisa não cabe em ferramenta de prateleira, desenvolvemos a plataforma do zero. Aplicações web completas, com autenticação, banco de dados, controle de permissões, atualização em tempo real e integração nativa com seus workflows e automações. Painéis administrativos, sistemas de gestão internos, portais de cliente, ferramentas de operação específicas do seu negócio. Cada projeto é construído com stack moderna e arquitetura escalável, pensada para crescer junto com sua empresa.",
    imagePath: "/images/plataformas_sobmedida",
    imageFirst: false,
  },
];

const BENEFIT_ICON_SIZE = 48;

const benefitItems: {
  title: string;
  text: string;
  Icon: ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
}[] = [
  {
    title: "Mais previsibilidade e confiabilidade",
    text: "Os processos rodam do mesmo jeito todos os dias, sem depender de quem está no plantão.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Mais velocidade nas respostas.",
    text: "Respostas em segundos, atendimento, qualificação e envio de propostas que acontecem a qualquer momento.",
    Icon: SpeedChatIcon,
  },
  {
    title: "Mais escalabilidade.",
    text: "Quando a demanda dobra, sua estrutura não precisa dobrar junto. A automação assume o trabalho repetitivo enquanto o time foca no que escala receita.",
    Icon: ScalabilityIcon,
  },
  {
    title: "Visibilidade Real",
    text: "Cada execução é registrada, auditável e mensurável. O que antes estava espalhado entre planilhas, sistemas e cabeças vira uma única fonte confiável pra decisão.",
    Icon: VisibilityIcon,
  },
  {
    title: "Integração",
    text: "ERP, CRM, planilha e WhatsApp deixam de ser um só e passam a trabalhar como uma operação conjunta.",
    Icon: IntegrationIcon,
  },
  {
    title: "Foco no que importa.",
    text: "Tarefas repetitivas saem da rotina do time, sobra energia pra pensar, planejar e construir, que é onde pessoas fazem diferença",
    Icon: FocusTasksIcon,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-facioflow-dark font-sans text-facioflow-dark-foreground">
      <SiteHeader ctaLabel="Fale com um especialista" />

      <main>
        <section className="relative overflow-hidden border-b border-border/60 py-24 md:py-36 dark:border-white/10">
          <NetworkBackground />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/45 via-muted/20 to-muted/50 dark:from-facioflow-dark/40 dark:via-facioflow-dark/20 dark:to-facioflow-dark/60" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

          <div className="container relative mx-auto max-w-4xl px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              <span className="text-primary">Automação inteligente</span>{" "}
              <span className="text-facioflow-dark-foreground">para operações que precisam escalar</span>
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Conectamos seus sistemas, automatizamos processos e aplicamos IA onde
              ela gera resultado mensurável.
            </p>
            <a href="https://wa.me/">
              <Button
                size="lg"
                className="rounded-full bg-primary px-10 py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Fale com um especialista
              </Button>
            </a>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                A automação deixou de ser diferencial e virou a base.
              </h2>
              <p className="text-muted-foreground">
                O{" "}
                <a
                  href="https://www.gartner.com/en/newsroom/press-releases/2026-1-15-gartner-says-worldwide-ai-spending-will-total-2-point-5-trillion-dollars-in-2026"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-primary hover:text-primary/90"
                >
                  Gartner
                </a>{" "}
                projeta que o investimento global em IA chegará a US$ 2,5 trilhões em
                2026, e que 40% das aplicações empresariais terão agentes de IA
                integrados até o fim do mesmo ano, saindo de menos de 5% em 2025.
              </p>
              <p className="text-muted-foreground">
                O recado é claro: empresas que não automatizam ficam para trás, e quem
                automatiza sem estratégia perde dinheiro.
              </p>
              <p className="text-muted-foreground">
                A FacioFlow existe para ocupar exatamente esse meio: traduzir o que sua
                operação precisa em automações reais, integradas e mensuráveis.
                Conectamos os sistemas que você já usa, eliminamos o trabalho repetitivo
                e aplicamos IA onde ela faz diferença, sem promessa vazia, sem stack
                inflada.
              </p>
            </div>
            <div className="flex min-h-[520px] items-center justify-center lg:min-h-[560px]">
              <PointSphere className="h-[520px] w-full lg:h-[560px]" />
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 py-20 md:py-28 dark:border-white/10">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
              Nossos Serviços
            </h2>

            <div className="space-y-8">
              {serviceItems.map((item) => (
                <article
                  key={item.title}
                  className="grid gap-6 rounded-2xl border border-border/60 bg-muted/40 p-6 md:p-8 lg:grid-cols-2 lg:items-center dark:border-white/10 dark:bg-white/5"
                >
                  <div
                    className={`flex min-h-[220px] items-center justify-center rounded-xl bg-transparent p-6 ${
                      item.imageFirst ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    {item.imagePath === "/images/automacao_processos" ? (
                      <MiniWorkflow />
                    ) : item.imagePath === "/images/dashboards_dados" ? (
                      <MiniDashboard />
                    ) : item.imagePath === "/images/agentes_ia" ? (
                      <MiniChat />
                    ) : item.imagePath === "/images/plataformas_sobmedida" ? (
                      <MiniPlatform />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Placeholder de imagem: {item.imagePath}
                      </span>
                    )}
                  </div>
                  <div
                    className={`flex h-full flex-col justify-center text-left ${
                      item.imageFirst ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <h3 className="mb-6 text-2xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container mx-auto max-w-5xl rounded-2xl border border-border/60 bg-muted/40 px-6 py-12 text-center md:px-10 dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Automação que começa pelo planejamento, não pela ferramenta.
            </h2>
            <p className="mb-8 text-muted-foreground">
              Antes de propor qualquer solução, mapeamos sua operação, identificamos os
              pontos de fricção e desenhamos a arquitetura ideal para o seu cenário. A
              escolha de tecnologia vem depois e é guiada pelo problema, não por
              preferência. Trabalhamos com plataformas open-source, soluções SaaS
              consolidadas e desenvolvimento sob medida, combinando o que faz sentido
              para entregar resultado real.
            </p>
            <a href="https://wa.me/" className="inline-flex">
              <Button
                size="lg"
                className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
              >
                Fale com um especialista
              </Button>
            </a>
          </div>
        </section>

        <section className="border-t border-border/60 py-20 md:py-28 dark:border-white/10">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
              Benefícios
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {benefitItems.map(({ title, text, Icon }) => (
                <Card key={title} className="border-border/60 bg-muted/40 dark:border-white/10 dark:bg-white/5">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <Icon className="text-primary" size={BENEFIT_ICON_SIZE} />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-facioflow-dark-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;

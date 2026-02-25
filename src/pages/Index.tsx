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
  Smartphone,
  MessageCircle,
  Brain,
  TrendingUp,
  Lock,
  Search,
  FileText,
  Hammer,
  Rocket,
  RefreshCw,
  Menu,
  X,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import logo from "@/assets/logo-facioflow.png";
import NetworkBackground from "@/components/NetworkBackground";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Segurança", href: "#seguranca" },
  { label: "Como Trabalhamos", href: "#como-trabalhamos" },
];

const HIGHLIGHTS = [
  { icon: Package, title: "Desenvolvimento de Produto" },
  { icon: Cog, title: "Automação de Processos" },
  { icon: Zap, title: "Implementação rápida" },
  { icon: ShieldCheck, title: "Segurança de Dados" },
];

const SERVICES = [
  {
    icon: Brain,
    title: "Agentes de IA e Sistemas RAG",
    desc: "Criamos agentes de inteligência artificial e sistemas de Geração Aumentada por Recuperação (RAG) personalizados para a sua empresa. Seus dados internos se transformam em uma base de conhecimento acessível e inteligente, e os agentes atuam como verdadeiros especialistas virtuais dentro da sua operação, ajudando equipes e clientes.",
    examples:
      "Exemplos: analista de CRM que identifica oportunidades e padrões no funil de vendas, analista de produto que monitora feedbacks e sugere melhorias, e assistente interno que consulta documentos e políticas da empresa em segundos.",
  },
  {
    icon: Cog,
    title: "Automação de Processos",
    desc: "Eliminamos tarefas manuais e repetitivas conectando os sistemas da sua empresa por meio de APIs, Webhooks e soluções personalizadas. Otimize tempo, reduza erros e ganhe escala operacional com fluxos automatizados de ponta a ponta.",
    examples:
      "Exemplos: envio automático de relatórios periódicos, sincronização de dados entre CRM e ERP, e disparo inteligente de notificações e alertas internos.",
  },
  {
    icon: BarChart3,
    title: "Criação de Dashboards de BI",
    desc: "Centralizamos os dados de todos os sistemas da sua empresa em dashboards inteligentes e interativos. Tenha visão clara e em tempo real de Marketing, Vendas, Produção, Financeiro e muito mais para tomar decisões baseadas em dados, com camadas de análise potencializadas por inteligência artificial.",
    examples:
      "Exemplos: dashboard comercial com funil de vendas, painel de performance de marketing e métricas de redes sociais, e acompanhamento de produção com indicadores operacionais.",
  },
  {
    icon: Smartphone,
    title: "Desenvolvimento de Aplicativos Web e Mobile",
    desc: "Criamos aplicações web e mobile sob medida para o seu negócio, desde MVPs e ferramentas internas até plataformas completas voltadas ao cliente final, com foco em performance, usabilidade e escalabilidade.",
    examples:
      "Exemplos: portais de clientes, catálogos interativos de produtos e plataformas de banco de talentos para RH.",
  },
  {
    icon: MessageCircle,
    title: "Desenvolvimento de Chatbots Conversacionais",
    desc: "Desenvolvemos chatbots inteligentes para atendimento, qualificação de leads e suporte ao cliente. Integrados ao WhatsApp, site ou outras plataformas, seus chatbots trabalham 24/7 com linguagem natural e respostas personalizadas.",
    examples:
      "Exemplo: assistente virtual para atendimento e agendamento automático via WhatsApp 100% customizado.",
  },
  {
    icon: Wrench,
    title: "Desenvolvimento de Soluções Sob Medida",
    desc: "Nem todo desafio tem uma ferramenta pronta no mercado. Analisamos a sua necessidade e desenvolvemos soluções tecnológicas exclusivas, integrações, plataformas, ferramentas e sistemas pensados especificamente para o seu contexto.",
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-facioflow-dark text-facioflow-dark-foreground font-poppins">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-facioflow-dark/80 backdrop-blur-lg">
        <nav className="container mx-auto flex items-center justify-between px-4 py-4">
          <a href="#" aria-label="FacioFlow Home">
            <img src={logo} alt="FacioFlow" className="h-8 md:h-10" />
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA PLACEHOLDER — substitua o href abaixo pelo seu link */}
          <a href="#" className="hidden md:inline-flex">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
              Fale Conosco
            </Button>
          </a>

          {/* Mobile toggle */}
          <button className="md:hidden text-facioflow-dark-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-facioflow-dark px-4 pb-4 space-y-3">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </a>
            ))}
            {/* CTA PLACEHOLDER */}
            <a href="#">
              <Button size="sm" className="w-full bg-primary text-primary-foreground rounded-full">Fale Conosco</Button>
            </a>
          </div>
        )}
      </header>

      <main>
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden py-24 md:py-36">
          {/* Animated network background */}
          <NetworkBackground />
          {/* Gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-facioflow-dark/40 via-facioflow-dark/20 to-facioflow-dark/60 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

          <div className="container relative mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
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
        <section className="py-16 bg-facioflow-dark border-t border-white/5">
          <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {HIGHLIGHTS.map((h) => (
              <Card key={h.title} className="bg-white/5 border-white/10 hover:border-primary/50 transition-colors group">
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
        <section id="solucoes" className="py-20 md:py-28 bg-gradient-to-b from-facioflow-dark to-facioflow-dark">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Criamos para <span className="text-primary">solucionar o seu problema</span>
              </h2>
              <p className="text-muted-foreground">
                Analisamos sua empresa e as suas necessidades para elaborar um sistema que se enquadre nas suas necessidades, centralizando dados, economizando tempo e aumentando sua receita.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s, i) => (
                <Card
                  key={s.title}
                  className={`bg-white/5 border-white/10 hover:border-primary/40 transition-all hover:-translate-y-1 ${
                    i === SERVICES.length - 1 && SERVICES.length % 3 === 1
                      ? "lg:col-start-2"
                      : ""
                  }`}
                >
                  <CardContent className="p-7 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center">
                      <s.icon className="text-primary" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-facioflow-dark-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    {s.examples && (
                      <p className="text-xs text-muted-foreground/70 italic leading-relaxed">{s.examples}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SEGURANÇA ─── */}
        <section id="seguranca" className="py-20 md:py-28 bg-gradient-to-br from-primary/10 via-facioflow-dark to-facioflow-dark border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center">
                  <ShieldCheck className="text-primary" size={32} />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center">
                  <Lock className="text-primary" size={32} />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Segurança e <span className="text-primary">Privacidade de Dados</span>
              </h2>
              <div className="space-y-5 text-muted-foreground text-left md:text-center leading-relaxed">
                <p>
                  A segurança dos seus dados é prioridade absoluta na FacioFlow. Toda a nossa operação é construída sobre práticas rigorosas de proteção de dados, em total conformidade com a <strong className="text-facioflow-dark-foreground">LGPD</strong> e o <strong className="text-facioflow-dark-foreground">GDPR</strong>.
                </p>
                <p>
                  Trabalhamos exclusivamente com ferramentas e sistemas que respeitam as normas de privacidade e segurança da informação. Desde a coleta até o armazenamento e processamento, cada etapa é planejada para garantir a integridade e a confidencialidade dos dados dos nossos clientes.
                </p>
                <p>
                  Além disso, a FacioFlow responde diretamente às exigências da LGPD como empresa, o que significa que mantemos políticas internas de governança de dados, controle de acesso e transparência em todas as operações que envolvem informações sensíveis.
                </p>
                <p className="font-semibold text-facioflow-dark-foreground">
                  Seus dados são seus. Nós só tratamos eles com a responsabilidade e cuidados que eles merecem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── COMO TRABALHAMOS ─── */}
        <section id="como-trabalhamos" className="relative overflow-hidden py-20 md:py-28 border-t border-white/5">
          {/* Animated network background */}
          <NetworkBackground />
          {/* Gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-facioflow-dark/40 via-facioflow-dark/20 to-facioflow-dark/60 pointer-events-none" />
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
                      <Card className="bg-white/5 border-white/10 inline-block hover:border-primary/60 hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
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

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/10 bg-facioflow-dark py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <img src={logo} alt="FacioFlow" className="h-8" />

            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social links placeholder — substitua os href abaixo */}
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} FacioFlow. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

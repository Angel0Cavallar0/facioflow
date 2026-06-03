import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const LAST_UPDATED = "02/06/2026";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-facioflow-dark font-sans text-facioflow-dark-foreground">
      <SiteHeader />

      <main className="border-t border-border/40 dark:border-white/5">
        <section className="border-b border-border/60 bg-facioflow-dark py-16 md:py-20 dark:border-white/10">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-facioflow-dark-foreground md:text-4xl lg:text-5xl">
              Política de Privacidade
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              FacioFlow Desenvolvimento de Software LTDA
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Última atualização: {LAST_UPDATED}
            </p>
          </div>
        </section>

        <article className="container mx-auto max-w-3xl space-y-16 px-4 py-14 md:py-20">
          <section aria-labelledby="s1" className="space-y-4">
            <h2 id="s1" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              1. Introdução
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                A <strong className="text-facioflow-dark-foreground">FacioFlow Desenvolvimento de Software LTDA</strong>,
                inscrita no CNPJ/MF sob o nº <strong className="text-facioflow-dark-foreground">65.518.385/0001-29</strong>,
                doravante denominada <strong className="text-facioflow-dark-foreground">"FacioFlow"</strong>, tem o compromisso
                com a privacidade e a proteção dos dados pessoais de todos com quem se relaciona.
              </p>
              <p>
                Esta Política de Privacidade descreve, de forma transparente, como coletamos, utilizamos, armazenamos,
                compartilhamos e protegemos os dados pessoais dos visitantes do nosso site (facioflow.com.br), de clientes
                e de demais titulares que interajam conosco, em conformidade com a{" "}
                <strong className="text-facioflow-dark-foreground">
                  Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018 – "LGPD")
                </strong>{" "}
                e demais normas aplicáveis do ordenamento jurídico brasileiro.
              </p>
              <p>
                Ao utilizar nosso site ou ao estabelecer contato comercial com a FacioFlow, o titular declara estar ciente
                das práticas descritas nesta Política.
              </p>
              <p>
                A FacioFlow atua, em regra, como <strong className="text-facioflow-dark-foreground">Controladora</strong>{" "}
                dos dados tratados em seu site e em sua relação comercial. Nos serviços que presta a seus clientes
                (automações, integrações e desenvolvimento de software), a FacioFlow pode atuar como{" "}
                <strong className="text-facioflow-dark-foreground">Operadora</strong>, tratando dados em nome do cliente
                conforme os termos contratuais específicos firmados em cada projeto.
              </p>
            </div>
          </section>

          <section aria-labelledby="s2" className="space-y-4">
            <h2 id="s2" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              2. Objetivo
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Esta Política tem por objetivo proteger os interesses dos titulares de dados, esclarecendo:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-1 text-muted-foreground">
              <li>quais dados pessoais são coletados;</li>
              <li>de que forma são coletados;</li>
              <li>com qual finalidade e sob qual base legal;</li>
              <li>como são tratados, armazenados, compartilhados e eliminados;</li>
              <li>quais são os direitos dos titulares e como exercê-los.</li>
            </ul>
          </section>

          <section aria-labelledby="s3" className="space-y-4">
            <h2 id="s3" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              3. Definições
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Para os fins desta Política, aplicam-se as seguintes definições, conforme a LGPD:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-1 text-muted-foreground">
              <li>
                <strong className="text-facioflow-dark-foreground">Controlador:</strong> pessoa natural ou jurídica a quem
                competem as decisões referentes ao tratamento de dados pessoais.
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">Operador:</strong> pessoa natural ou jurídica que realiza
                o tratamento de dados pessoais em nome do Controlador.
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">Encarregado (DPO):</strong> pessoa indicada para atuar
                como canal de comunicação entre o Controlador, os titulares e a Autoridade Nacional de Proteção de Dados
                (ANPD).
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">Dado pessoal:</strong> informação relacionada a pessoa
                natural identificada ou identificável.
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">Dado pessoal sensível:</strong> dado sobre origem racial
                ou étnica, convicção religiosa, opinião política, filiação sindical, dado referente à saúde, à vida sexual,
                genético ou biométrico.
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">Titular:</strong> pessoa natural a quem se referem os
                dados pessoais objeto de tratamento.
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">Tratamento:</strong> toda operação realizada com dados
                pessoais (coleta, uso, acesso, armazenamento, compartilhamento, eliminação, entre outras).
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">Cookies:</strong> pequenos arquivos de texto armazenados
                no navegador do usuário que registram informações sobre a navegação.
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">ANPD:</strong> Autoridade Nacional de Proteção de Dados.
              </li>
            </ul>
          </section>

          <section aria-labelledby="s4" className="space-y-6">
            <h2 id="s4" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              4. Dados que coletamos
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">
                4.1. Dados fornecidos diretamente pelo titular
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Coletamos os dados que você nos fornece de forma voluntária ao entrar em contato conosco, por meio de:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-1 text-muted-foreground">
                <li>
                  <strong className="text-facioflow-dark-foreground">Formulário de contato do site:</strong> nome, e-mail,
                  telefone, empresa e o conteúdo da mensagem enviada.
                </li>
                <li>
                  <strong className="text-facioflow-dark-foreground">WhatsApp:</strong> nome, número de telefone e o conteúdo
                  das mensagens trocadas.
                </li>
                <li>
                  <strong className="text-facioflow-dark-foreground">E-mail direto:</strong> nome, endereço de e-mail e
                  quaisquer informações que você opte por compartilhar.
                </li>
              </ul>
              <p className="text-base leading-relaxed text-muted-foreground">
                Em todos os casos, coletamos apenas os dados estritamente necessários ao atendimento da sua solicitação ou
                à prestação dos nossos serviços.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">4.2. Dados coletados automaticamente</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Ao navegar em nosso site, alguns dados são coletados automaticamente por meio de cookies e tecnologias
                similares, tais como:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-1 text-muted-foreground">
                <li>endereço IP;</li>
                <li>tipo de navegador e dispositivo;</li>
                <li>sistema operacional;</li>
                <li>páginas visitadas e tempo de permanência;</li>
                <li>origem do acesso (por exemplo, anúncio, busca orgânica ou link direto);</li>
                <li>identificadores de navegação para fins estatísticos e de marketing.</li>
              </ul>
              <p className="text-base leading-relaxed text-muted-foreground">
                A coleta de dados de navegação por cookies analíticos e de marketing ocorre{" "}
                <strong className="text-facioflow-dark-foreground">somente após o seu consentimento</strong>, conforme
                descrito na Seção 5.
              </p>
            </div>
          </section>

          <section aria-labelledby="s5" className="space-y-6">
            <h2 id="s5" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              5. Cookies e tecnologias de rastreamento
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Utilizamos cookies e tecnologias similares para melhorar a sua experiência, medir o desempenho do site e
              veicular comunicações de marketing.
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">5.1. Gestão de consentimento</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Ao acessar nosso site pela primeira vez, é exibido um{" "}
                <strong className="text-facioflow-dark-foreground">banner de consentimento de cookies</strong>. Os cookies{" "}
                <strong className="text-facioflow-dark-foreground">analíticos</strong> e de{" "}
                <strong className="text-facioflow-dark-foreground">marketing</strong> não são ativados antes da sua
                manifestação. Você pode <strong className="text-facioflow-dark-foreground">aceitar</strong>,{" "}
                <strong className="text-facioflow-dark-foreground">rejeitar</strong> ou{" "}
                <strong className="text-facioflow-dark-foreground">personalizar</strong> suas preferências a qualquer
                momento, e pode revogar o consentimento posteriormente por meio das configurações de cookies disponíveis no
                site ou das configurações do seu navegador.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Os cookies estritamente necessários ao funcionamento do site dispensam consentimento, por serem
                indispensáveis à sua operação.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">5.2. Categorias de cookies utilizadas</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/60 dark:border-white/10">
                      <th className="py-3 pr-4 font-semibold text-facioflow-dark-foreground">Categoria</th>
                      <th className="py-3 pr-4 font-semibold text-facioflow-dark-foreground">Finalidade</th>
                      <th className="py-3 font-semibold text-facioflow-dark-foreground">Exige consentimento?</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/40 dark:border-white/5">
                      <td className="py-3 pr-4 align-top">
                        <strong className="text-facioflow-dark-foreground">Essenciais</strong>
                      </td>
                      <td className="py-3 pr-4 align-top">
                        Garantem o funcionamento básico e a segurança do site. Não coletam dados para fins de marketing.
                      </td>
                      <td className="py-3 align-top">Não</td>
                    </tr>
                    <tr className="border-b border-border/40 dark:border-white/5">
                      <td className="py-3 pr-4 align-top">
                        <strong className="text-facioflow-dark-foreground">Analíticos</strong>
                      </td>
                      <td className="py-3 pr-4 align-top">
                        Permitem medir audiência, comportamento de navegação e desempenho do site. Ferramenta utilizada:{" "}
                        <strong className="text-facioflow-dark-foreground">Google Analytics (GA4)</strong>.
                      </td>
                      <td className="py-3 align-top">Sim</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 align-top">
                        <strong className="text-facioflow-dark-foreground">Marketing / Publicidade</strong>
                      </td>
                      <td className="py-3 pr-4 align-top">
                        Permitem mensurar campanhas e exibir anúncios personalizados (remarketing) em plataformas de
                        terceiros. Ferramentas utilizadas:{" "}
                        <strong className="text-facioflow-dark-foreground">Meta Pixel (Facebook/Instagram)</strong> e{" "}
                        <strong className="text-facioflow-dark-foreground">Google Ads</strong> (gerenciados via Google Tag
                        Manager).
                      </td>
                      <td className="py-3 align-top">Sim</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">
                5.3. Remarketing e anúncios personalizados
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Mediante o seu consentimento, utilizamos dados de navegação coletados pelo{" "}
                <strong className="text-facioflow-dark-foreground">Meta Pixel</strong> e pelo{" "}
                <strong className="text-facioflow-dark-foreground">Google Ads</strong> para mensurar a eficácia de campanhas
                e para exibir anúncios personalizados da FacioFlow em plataformas de terceiros (como Facebook, Instagram,
                Google e sites parceiros), inclusive para pessoas que já visitaram nosso site (remarketing). Você pode
                ajustar suas preferências de anúncios diretamente nas configurações de cada plataforma.
              </p>
            </div>
          </section>

          <section aria-labelledby="s6" className="space-y-4">
            <h2 id="s6" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              6. Finalidades e bases legais do tratamento
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Tratamos dados pessoais para as seguintes finalidades, com base nas hipóteses legais previstas na LGPD:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border/60 dark:border-white/10">
                    <th className="py-3 pr-4 font-semibold text-facioflow-dark-foreground">Finalidade</th>
                    <th className="py-3 font-semibold text-facioflow-dark-foreground">Base legal (LGPD)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/40 dark:border-white/5">
                    <td className="py-3 pr-4 align-top">
                      Responder a contatos, dúvidas e solicitações de orçamento
                    </td>
                    <td className="py-3 align-top">
                      Procedimentos preliminares relacionados a contrato (art. 7º, V) e legítimo interesse (art. 7º, IX)
                    </td>
                  </tr>
                  <tr className="border-b border-border/40 dark:border-white/5">
                    <td className="py-3 pr-4 align-top">Executar e gerir contratos de prestação de serviços</td>
                    <td className="py-3 align-top">Execução de contrato (art. 7º, V)</td>
                  </tr>
                  <tr className="border-b border-border/40 dark:border-white/5">
                    <td className="py-3 pr-4 align-top">Cumprir obrigações legais, fiscais e regulatórias</td>
                    <td className="py-3 align-top">Cumprimento de obrigação legal/regulatória (art. 7º, II)</td>
                  </tr>
                  <tr className="border-b border-border/40 dark:border-white/5">
                    <td className="py-3 pr-4 align-top">Medir audiência e desempenho do site (cookies analíticos)</td>
                    <td className="py-3 align-top">Consentimento (art. 7º, I)</td>
                  </tr>
                  <tr className="border-b border-border/40 dark:border-white/5">
                    <td className="py-3 pr-4 align-top">Veicular anúncios e realizar remarketing (cookies de marketing)</td>
                    <td className="py-3 align-top">Consentimento (art. 7º, I)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 align-top">
                      Exercício regular de direitos em processo judicial ou administrativo
                    </td>
                    <td className="py-3 align-top">Art. 7º, VI</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="s7" className="space-y-6">
            <h2 id="s7" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              7. Compartilhamento de dados com terceiros
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              A FacioFlow{" "}
              <strong className="text-facioflow-dark-foreground">
                não vende dados pessoais mediante contraprestação financeira
              </strong>
              . O compartilhamento ocorre apenas quando necessário e nas seguintes hipóteses:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-1 text-muted-foreground">
              <li>
                <strong className="text-facioflow-dark-foreground">Operadores e prestadores de serviço:</strong> empresas
                que tratam dados em nome da FacioFlow para viabilizar nossas operações, como provedores de hospedagem e
                infraestrutura em nuvem, serviços de envio de e-mail, ferramentas de análise e de marketing. Esses
                fornecedores estão contratualmente obrigados a tratar os dados de forma segura e exclusivamente para as
                finalidades determinadas pela FacioFlow.
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">Plataformas de análise e publicidade:</strong> Google e
                Meta, no contexto dos cookies analíticos e de marketing, mediante o seu consentimento.
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">Autoridades públicas:</strong> mediante determinação
                legal, requisição ou ordem judicial de autoridade competente.
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">Operações societárias:</strong> em caso de fusão,
                aquisição ou incorporação, hipótese em que os dados poderão ser transferidos ao sucessor, observada esta
                Política.
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">Defesa de direitos:</strong> para proteção dos direitos
                da FacioFlow em conflitos de qualquer natureza, inclusive judiciais.
              </li>
            </ul>
            <p className="text-base leading-relaxed text-muted-foreground">
              O compartilhamento limita-se sempre aos dados essenciais para cada finalidade.
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">
                7.1. Compartilhamento para fins de publicidade
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Mediante o seu consentimento, dados de navegação são compartilhados com{" "}
                <strong className="text-facioflow-dark-foreground">Google</strong> e{" "}
                <strong className="text-facioflow-dark-foreground">Meta</strong> por meio dos cookies de marketing,
                permitindo a essas plataformas exibir anúncios personalizados e mensurar campanhas. Como parte desse
                processo, tais plataformas podem utilizar os dados também para suas próprias finalidades.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Esclarecemos, com transparência, que esse tipo de compartilhamento — embora{" "}
                <strong className="text-facioflow-dark-foreground">não constitua venda de dados sob a LGPD</strong>, por não
                envolver contraprestação financeira pelos dados — pode ser caracterizado como "venda" ou "compartilhamento"
                de dados pessoais sob determinadas legislações estrangeiras de proteção de dados, como a{" "}
                <em>California Consumer Privacy Act</em> (CCPA). Você pode, a qualquer momento, recusar ou revogar esse
                compartilhamento por meio das configurações de cookies do site, sem prejuízo ao acesso ao conteúdo.
              </p>
            </div>
          </section>

          <section aria-labelledby="s8" className="space-y-4">
            <h2 id="s8" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              8. Transferência internacional de dados
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Algumas das ferramentas que utilizamos — como{" "}
              <strong className="text-facioflow-dark-foreground">Google Analytics</strong>,{" "}
              <strong className="text-facioflow-dark-foreground">Google Ads</strong> e{" "}
              <strong className="text-facioflow-dark-foreground">Meta Pixel</strong> —, bem como determinados serviços de
              hospedagem e infraestrutura, podem processar e armazenar dados em servidores localizados{" "}
              <strong className="text-facioflow-dark-foreground">fora do Brasil</strong>, inclusive nos Estados Unidos.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Nessas situações, há{" "}
              <strong className="text-facioflow-dark-foreground">transferência internacional de dados</strong>, realizada em
              conformidade com os artigos 33 a 36 da LGPD. A FacioFlow adota medidas para assegurar que tais transferências
              ocorram para países ou organizações que ofereçam grau de proteção adequado ou mediante garantias contratuais
              apropriadas.
            </p>
          </section>

          <section aria-labelledby="s9" className="space-y-6">
            <h2 id="s9" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              9. Conformidade com o GDPR
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">9.1. Aplicação do regulamento europeu</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Quando a FacioFlow realiza tratamento de dados pessoais de titulares localizados no Espaço Econômico
                Europeu, ou quando atua em projetos cujo escopo envolve operações sob a jurisdição da União Europeia,
                observa integralmente os requisitos estabelecidos pelo <em>General Data Protection Regulation</em> (GDPR).
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">9.2. Bases legais sob o GDPR</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                O tratamento é fundamentado nas bases legais previstas no artigo 6º do GDPR, com destaque para a execução
                contratual, o cumprimento de obrigação legal, o legítimo interesse e o consentimento, conforme aplicável a
                cada operação.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">
                9.3. Transferência internacional de dados sob o GDPR
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Eventuais transferências internacionais de dados pessoais são realizadas exclusivamente para países que
                oferecem nível adequado de proteção, conforme reconhecido pela autoridade competente, ou mediante a adoção
                de salvaguardas adequadas previstas no regulamento, incluindo cláusulas contratuais padrão.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">
                9.4. Direitos garantidos a titulares na União Europeia
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Aos titulares localizados no Espaço Econômico Europeu são garantidos os direitos previstos nos artigos 15 a
                22 do GDPR, incluindo o direito de acesso, retificação, apagamento, limitação do tratamento, portabilidade,
                oposição e direito de não ser submetido a decisões automatizadas. As solicitações devem ser encaminhadas
                pelo mesmo canal designado para titulares brasileiros (Seção 13).
              </p>
            </div>
          </section>

          <section aria-labelledby="s10" className="space-y-6">
            <h2 id="s10" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              10. Armazenamento e práticas de segurança
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              A FacioFlow adota um conjunto de medidas técnicas e organizacionais voltadas à proteção dos dados pessoais sob
              seu tratamento, conforme detalhado a seguir.
            </p>

            <div className="space-y-6 border-l-2 border-primary/30 pl-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Governança de dados</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Manutenção de políticas internas formalizadas que disciplinam o tratamento de dados pessoais em todas as
                  etapas operacionais, com revisão periódica para adequação contínua às melhores práticas e às atualizações
                  regulatórias.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Controle de acesso</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Aplicação do princípio do menor privilégio, com concessão de acessos a dados pessoais restrita a
                  colaboradores e prestadores de serviço cuja função efetivamente requeira tal acesso. As permissões são
                  auditadas regularmente e revogadas quando deixam de ser necessárias.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Criptografia</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Adoção de criptografia em trânsito, mediante a utilização de protocolos seguros, e em repouso, quando
                  aplicável à natureza do dado e à infraestrutura envolvida, garantindo a confidencialidade das informações
                  ao longo de todo o ciclo de tratamento.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Backup e continuidade operacional</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Procedimentos de backup periódicos e planos de continuidade operacional são mantidos para assegurar a
                  disponibilidade e a integridade dos dados em situações de incidente, falha técnica ou interrupção de
                  serviço.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Auditoria e revisão periódica</h3>
                <p className="text-muted-foreground leading-relaxed">
                  As práticas de segurança e privacidade são submetidas a revisões periódicas, com identificação de
                  oportunidades de melhoria e implementação de ajustes necessários para manter o nível de proteção
                  compatível com a evolução das ameaças e das exigências regulatórias.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Provedores e infraestrutura</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A FacioFlow trabalha exclusivamente com provedores e ferramentas em conformidade com as exigências da
                  LGPD, do GDPR e demais normas aplicáveis à segurança da informação e ao tratamento de dados pessoais. A
                  seleção de fornecedores considera, entre outros critérios, a existência de medidas técnicas e
                  organizacionais adequadas, a localização dos servidores, as bases legais aplicáveis ao tratamento e as
                  garantias contratuais oferecidas.
                </p>
              </div>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              Nenhum sistema é completamente imune a riscos. Em caso de incidente de segurança que possa acarretar risco ou
              dano relevante aos titulares, a FacioFlow comunicará os afetados e a ANPD, conforme exigido pela LGPD.
            </p>
          </section>

          <section aria-labelledby="s11" className="space-y-4">
            <h2 id="s11" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              11. Retenção e eliminação dos dados
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Os dados são mantidos apenas pelo tempo necessário ao cumprimento das finalidades para as quais foram
              coletados ou pelo prazo exigido por obrigação legal ou regulatória.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Encerrada a finalidade ou findo o prazo de guarda, os dados serão eliminados ou anonimizados, ressalvadas as
              hipóteses de conservação previstas no art. 16 da LGPD (cumprimento de obrigação legal, estudo por órgão de
              pesquisa com anonimização, transferência a terceiro conforme a lei ou uso exclusivo do controlador, vedado o
              acesso por terceiros).
            </p>
          </section>

          <section aria-labelledby="s12" className="space-y-4">
            <h2 id="s12" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              12. Direitos do titular
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Nos termos do art. 18 da LGPD, você pode, a qualquer tempo e gratuitamente:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-1 text-muted-foreground">
              <li>
                <strong className="text-facioflow-dark-foreground">a)</strong> confirmar a existência de tratamento de seus
                dados;
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">b)</strong> acessar seus dados;
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">c)</strong> corrigir dados incompletos, inexatos ou
                desatualizados;
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">d)</strong> solicitar a anonimização, bloqueio ou
                eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">e)</strong> solicitar a portabilidade dos dados a outro
                fornecedor de serviço ou produto;
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">f)</strong> solicitar a eliminação dos dados tratados com
                base no consentimento;
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">g)</strong> obter informação sobre as entidades com as
                quais a FacioFlow compartilhou seus dados;
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">h)</strong> ser informado sobre a possibilidade de não
                fornecer consentimento e sobre as consequências da negativa;
              </li>
              <li>
                <strong className="text-facioflow-dark-foreground">i)</strong> revogar o consentimento a qualquer momento.
              </li>
            </ul>
            <p className="text-base leading-relaxed text-muted-foreground">
              Para exercer esses direitos, entre em contato pelo e-mail indicado na Seção 13. A revogação do consentimento
              pode limitar o acesso a determinadas funcionalidades que dependam do tratamento.
            </p>
          </section>

          <section aria-labelledby="s13" className="space-y-4">
            <h2 id="s13" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              13. Encarregado de Proteção de Dados (DPO) e contato
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Para dúvidas sobre esta Política, solicitações relacionadas aos seus dados pessoais ou exercício de direitos,
              entre em contato com o Encarregado de Proteção de Dados da FacioFlow:
            </p>
            <p className="text-facioflow-dark-foreground">
              <span className="font-semibold">E-mail:</span>{" "}
              <a
                href="mailto:privacidade@facioflow.com.br"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                privacidade@facioflow.com.br
              </a>
            </p>
          </section>

          <section aria-labelledby="s14" className="space-y-4 border-t border-border/60 pt-12 dark:border-white/10">
            <h2 id="s14" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              14. Alterações desta Política
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              A FacioFlow poderá atualizar esta Política de Privacidade a qualquer tempo, especialmente em razão de
              alterações legislativas ou de mudanças em seus serviços. A versão vigente estará sempre disponível em
              facioflow.com.br, com a indicação da data da última atualização. Recomendamos a revisão periódica deste
              documento.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Alterações entram em vigor a partir de sua publicação.
            </p>
            <p className="text-facioflow-dark-foreground">
              <span className="font-semibold">Última atualização:</span> {LAST_UPDATED}
            </p>
          </section>

          <p className="border-t border-border/60 pt-8 text-sm italic leading-relaxed text-muted-foreground dark:border-white/10">
            Este documento foi elaborado com base na Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Privacy;

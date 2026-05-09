import SiteHeader from "@/components/SiteHeader";

/** Data da publicação ou revisão substantiva da política (PT-BR, DD/MM/AAAA) */
export const LAST_UPDATED = "08/05/2026";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-facioflow-dark font-sans text-facioflow-dark-foreground">
      <SiteHeader />

      <main className="border-t border-border/40 dark:border-white/5">
        <section className="border-b border-border/60 bg-facioflow-dark py-16 md:py-20 dark:border-white/10">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-facioflow-dark-foreground md:text-4xl lg:text-5xl">
              Privacidade e proteção de dados
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Como a FacioFlow trata, armazena e protege as informações dos nossos clientes e dos titulares de dados
              envolvidos em nossas operações.
            </p>
          </div>
        </section>

        <article className="container mx-auto max-w-3xl space-y-16 px-4 py-14 md:py-20">
          <section aria-labelledby="s2" className="space-y-4">
            <h2 id="s2" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              Compromisso institucional
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                A FacioFlow reconhece que a proteção de dados pessoais é um direito fundamental e um pilar essencial
                da confiança que sustenta toda relação comercial. Por essa razão, adotamos a privacidade como princípio
                orientador de cada projeto que desenvolvemos, desde a concepção até a operação contínua.
              </p>
              <p>
                Nossas práticas são construídas para atender plenamente às exigências da Lei Geral de Proteção de Dados
                (LGPD — Lei nº 13.709/2018) e do General Data Protection Regulation (GDPR — Regulamento UE 2016/679),
                assegurando o tratamento adequado de dados pessoais em conformidade com a legislação aplicável tanto
                no Brasil quanto na União Europeia.
              </p>
              <p>
                Cada solução desenvolvida pela FacioFlow incorpora medidas técnicas e administrativas que garantem a
                integridade, a confidencialidade e a disponibilidade dos dados tratados, respeitando os direitos dos
                titulares e os deveres impostos aos agentes de tratamento.
              </p>
            </div>
          </section>

          <section aria-labelledby="s3" className="space-y-6">
            <h2 id="s3" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              Conformidade com a LGPD
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Bases legais para o tratamento</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                O tratamento de dados pessoais pela FacioFlow é realizado com fundamento nas hipóteses autorizativas
                previstas no artigo 7º da LGPD, em especial:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-1 text-muted-foreground">
                <li>Cumprimento de obrigação legal ou regulatória</li>
                <li>Execução de contrato ou de procedimentos preliminares relacionados a contrato</li>
                <li>Atendimento ao legítimo interesse da FacioFlow ou de terceiros</li>
                <li>Consentimento expresso do titular, quando aplicável</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Direitos do titular</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Em conformidade com o artigo 18 da LGPD, todo titular de dados pessoais tem direito a obter da
                FacioFlow, a qualquer momento e mediante requisição:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-1 text-muted-foreground">
                <li>Confirmação da existência de tratamento de seus dados pessoais</li>
                <li>Acesso aos dados pessoais tratados</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                <li>
                  Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em
                  desconformidade com a LGPD
                </li>
                <li>Portabilidade dos dados a outro fornecedor de serviço ou produto</li>
                <li>Eliminação dos dados pessoais tratados com o consentimento do titular</li>
                <li>
                  Informação sobre as entidades públicas e privadas com as quais a FacioFlow realizou uso compartilhado
                  de dados
                </li>
                <li>Informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa</li>
                <li>Revogação do consentimento previamente concedido</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Como exercer seus direitos</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                As solicitações relacionadas ao exercício dos direitos previstos na LGPD devem ser encaminhadas ao endereço
                eletrônico{" "}
                <a
                  href="mailto:privacidade@facioflow.com.br"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  privacidade@facioflow.com.br
                </a>
                , contendo a identificação do titular e a descrição clara da requisição. As solicitações são analisadas e
                respondidas no prazo legal estabelecido pela autoridade competente.
              </p>
            </div>
          </section>

          <section aria-labelledby="s4" className="space-y-6">
            <h2 id="s4" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              Conformidade com o GDPR
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Aplicação do regulamento europeu</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Quando a FacioFlow realiza tratamento de dados pessoais de titulares localizados no Espaço Econômico
                Europeu, ou quando atua em projetos cujo escopo envolve operações sob a jurisdição da União Europeia,
                observa integralmente os requisitos estabelecidos pelo General Data Protection Regulation.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Bases legais sob o GDPR</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                O tratamento é fundamentado nas bases legais previstas no artigo 6º do GDPR, com destaque para a execução
                contratual, o cumprimento de obrigação legal, o legítimo interesse e o consentimento, conforme aplicável a
                cada operação.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Transferência internacional de dados</h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Eventuais transferências internacionais de dados pessoais são realizadas exclusivamente para países que
                oferecem nível adequado de proteção, conforme reconhecido pela autoridade competente, ou mediante a adoção
                de salvaguardas adequadas previstas no regulamento, incluindo cláusulas contratuais padrão.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-facioflow-dark-foreground">
                Direitos garantidos a titulares na União Europeia
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Aos titulares localizados no Espaço Econômico Europeu são garantidos os direitos previstos nos artigos 15
                a 22 do GDPR, incluindo o direito de acesso, retificação, apagamento, limitação do tratamento,
                portabilidade, oposição e direito de não ser submetido a decisões automatizadas. As solicitações devem
                ser encaminhadas pelo mesmo canal designado para titulares brasileiros.
              </p>
            </div>
          </section>

          <section aria-labelledby="s5" className="space-y-6">
            <h2 id="s5" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              Práticas internas de segurança
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              A FacioFlow adota um conjunto de medidas técnicas e organizacionais voltadas à proteção dos dados pessoais
              sob seu tratamento, conforme detalhado a seguir.
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
                  aplicável à natureza do dado e à infraestrutura envolvida, garantindo a confidencialidade das informações ao
                  longo de todo o ciclo de tratamento.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Política de retenção e descarte</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Os dados pessoais são mantidos pelo tempo estritamente necessário ao cumprimento das finalidades para as
                  quais foram coletados ou ao atendimento de obrigações legais e regulatórias aplicáveis. Findo o prazo de
                  retenção, os dados são eliminados ou anonimizados de forma segura.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Backup e continuidade operacional</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Procedimentos de backup periódicos e planos de continuidade operacional são mantidos para assegurar a
                  disponibilidade e a integridade dos dados em situações de incidente, falha técnica ou interrupção de serviço.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-facioflow-dark-foreground">Auditoria e revisão periódica</h3>
                <p className="text-muted-foreground leading-relaxed">
                  As práticas de segurança e privacidade são submetidas a revisões periódicas, com identificação de oportunidades
                  de melhoria e implementação de ajustes necessários para manter o nível de proteção compatível com a evolução
                  das ameaças e das exigências regulatórias.
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="s6" className="space-y-4">
            <h2 id="s6" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              Provedores e infraestrutura
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              A FacioFlow trabalha exclusivamente com provedores e ferramentas em conformidade com as exigências da LGPD,
              do GDPR e demais normas aplicáveis à segurança da informação e ao tratamento de dados pessoais. A seleção
              de fornecedores considera, entre outros critérios, a existência de medidas técnicas e organizacionais
              adequadas, a localização dos servidores, as bases legais aplicáveis ao tratamento e as garantias
              contratuais oferecidas.
            </p>
          </section>

          <section aria-labelledby="s7" className="space-y-4">
            <h2 id="s7" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              Contato para questões de privacidade
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Para questões relacionadas a esta política, exercício de direitos do titular, denúncias ou qualquer outro
              assunto vinculado ao tratamento de dados pessoais, o canal oficial é:
            </p>
            <p className="text-facioflow-dark-foreground">
              <span className="font-semibold">E-mail do Encarregado de Proteção de Dados:</span>{" "}
              <a
                href="mailto:privacidade@facioflow.com.br"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                privacidade@facioflow.com.br
              </a>
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              As solicitações são respondidas dentro do prazo legal aplicável a cada caso. Recomenda-se que o titular
              informe, no momento da solicitação, dados que permitam sua identificação e a descrição clara da requisição, a fim de
              viabilizar o atendimento adequado.
            </p>
          </section>

          <section aria-labelledby="s8" className="space-y-4 border-t border-border/60 pt-12 dark:border-white/10">
            <h2 id="s8" className="text-xl font-bold text-facioflow-dark-foreground md:text-2xl">
              Atualizações desta política
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Esta política pode ser atualizada periodicamente para refletir alterações em nossas práticas operacionais,
              em ferramentas utilizadas ou em exigências regulatórias aplicáveis. A versão vigente estará sempre disponível nesta página, com
              indicação da data da última atualização.
            </p>
            <p className="text-facioflow-dark-foreground">
              <span className="font-semibold">Última atualização:</span> {LAST_UPDATED}
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default Privacy;

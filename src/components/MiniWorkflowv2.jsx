import React, { useState, useEffect, useRef } from "react";
import {
  Database,
  Users,
  Megaphone,
  ShoppingCart,
  Wallet,
  Truck,
  Cpu,
  CheckCircle2,
} from "lucide-react";

/**
 * MiniWorkflow — FacioFlow
 * Componente decorativo para a categoria "Automação de processos e integrações".
 * Estilo n8n: nodes conectados por curvas Bezier com pacotes de dados em trânsito.
 * Tamanho máximo: 550x550. Light + clean, paleta azul tech.
 *
 * Animação de execução (loop):
 *  1. Trigger acende
 *  2. Pacote de dados percorre a conexão até o hub central
 *  3. Hub processa (pulsa)
 *  4. Pacote sai para todos os destinos em paralelo
 *  5. Destinos confirmam (check verde)
 *  6. Log escreve as etapas no rodapé
 *  7. Reinicia com outro trigger
 *
 * Hover:
 *  - Card eleva
 *  - Node em hover destaca, demais ficam dimmed
 */

const NODE_W = 110;
const NODE_H = 44;
const SVG_W = 510;
const SVG_H = 340;

// Layout dos nodes
const triggers = [
  { id: "erp", label: "ERP", icon: Database, x: 0, y: 30, color: "#2563eb" },
  { id: "crm", label: "CRM", icon: Users, x: 0, y: 130, color: "#2563eb" },
  { id: "mkt", label: "Marketing", icon: Megaphone, x: 0, y: 230, color: "#2563eb" },
];

const hub = {
  id: "hub",
  label: "FacioFlow",
  sub: "Workflow Engine",
  icon: Cpu,
  x: SVG_W / 2 - NODE_W / 2,
  y: 130,
  color: "#1e40af",
};

const destinations = [
  { id: "vd", label: "Vendas", icon: ShoppingCart, x: SVG_W - NODE_W, y: 30, color: "#2563eb" },
  { id: "fn", label: "Financeiro", icon: Wallet, x: SVG_W - NODE_W, y: 130, color: "#2563eb" },
  { id: "lg", label: "Logística", icon: Truck, x: SVG_W - NODE_W, y: 230, color: "#2563eb" },
];

// Centro de cada node (para conectar curvas)
const center = (n) => ({ x: n.x + NODE_W / 2, y: n.y + NODE_H / 2 });
const rightAnchor = (n) => ({ x: n.x + NODE_W, y: n.y + NODE_H / 2 });
const leftAnchor = (n) => ({ x: n.x, y: n.y + NODE_H / 2 });

// Curva Bezier suave entre dois pontos
function bezierPath(from, to) {
  const dx = (to.x - from.x) * 0.5;
  return `M ${from.x},${from.y} C ${from.x + dx},${from.y} ${to.x - dx},${to.y} ${to.x},${to.y}`;
}

// Cenários de execução (cada um destaca uma área da operação)
const flows = [
  {
    triggerId: "erp",
    label: "Novo pedido",
    log: [
      "→ Pedido recebido no ERP",
      "✓ Estoque e crédito validados",
      "✓ Oportunidade atualizada em Vendas",
      "✓ Fatura gerada no Financeiro",
      "✓ Expedição agendada na Logística",
    ],
  },
  {
    triggerId: "mkt",
    label: "Lead qualificado",
    log: [
      "→ Lead capturado em campanha",
      "✓ Dados enriquecidos e validados",
      "✓ Cadastro sincronizado no CRM",
      "✓ Oportunidade criada em Vendas",
      "✓ Time comercial notificado",
    ],
  },
  {
    triggerId: "crm",
    label: "Cobrança automática",
    log: [
      "→ Status do contrato atualizado no CRM",
      "✓ Regras de negócio aplicadas",
      "✓ Cobrança disparada no Financeiro",
      "✓ Vendas notificada da renovação",
      "✓ Execução registrada em log auditável",
    ],
  },
];

export default function MiniWorkflow() {
  const [mounted, setMounted] = useState(false);
  const [hoverCard, setHoverCard] = useState(false);
  const [hoverNode, setHoverNode] = useState(null);
  const [activeTrigger, setActiveTrigger] = useState(null);
  const [hubActive, setHubActive] = useState(false);
  const [activeDestinations, setActiveDestinations] = useState([]);
  const [logLines, setLogLines] = useState([]);
  const [flowIdx, setFlowIdx] = useState(0);

  const containerRef = useRef(null);
  const timersRef = useRef([]);
  const packetsLayerRef = useRef(null);

  // Envia um pacote animado por uma path SVG existente, criando os
  // elementos <circle> + <animateMotion> imperativamente para evitar
  // o problema de re-render do React reiniciar/quebrar a animação.
  const sendPacket = (pathD, durationSec) => {
    const layer = packetsLayerRef.current;
    if (!layer) return;
    const ns = "http://www.w3.org/2000/svg";

    const glow = document.createElementNS(ns, "circle");
    glow.setAttribute("r", "8");
    glow.setAttribute("fill", "url(#packetGlow)");

    const dot = document.createElementNS(ns, "circle");
    dot.setAttribute("r", "3.5");
    dot.setAttribute("fill", "#2563eb");

    [glow, dot].forEach((el) => {
      const motion = document.createElementNS(ns, "animateMotion");
      motion.setAttribute("dur", durationSec + "s");
      motion.setAttribute("repeatCount", "1");
      motion.setAttribute("path", pathD);
      motion.setAttribute("fill", "freeze");
      el.appendChild(motion);
      layer.appendChild(el);
      // beginElement garante que a animação dispare mesmo após inserção tardia
      try {
        motion.beginElement();
      } catch (e) {
        // alguns navegadores precisam de um tick antes
        requestAnimationFrame(() => {
          try {
            motion.beginElement();
          } catch (_) {}
        });
      }
    });

    // Limpa do DOM ao terminar pra não acumular elementos
    setTimeout(() => {
      glow.remove();
      dot.remove();
    }, durationSec * 1000 + 100);
  };

  // Entrada via viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setMounted(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Loop de execução
  useEffect(() => {
    if (!mounted) return;

    const clearAll = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    const t = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    const runFlow = (idx) => {
      const flow = flows[idx];
      setLogLines([]);
      setActiveTrigger(null);
      setHubActive(false);
      setActiveDestinations([]);

      // 1. Trigger acende
      t(() => {
        setActiveTrigger(flow.triggerId);
        setLogLines([flow.log[0]]);
      }, 400);

      // 2. Pacote vai do trigger até o hub
      t(() => {
        const path = bezierPath(
          rightAnchor(triggers.find((tr) => tr.id === flow.triggerId)),
          leftAnchor(hub)
        );
        sendPacket(path, 1);
      }, 900);

      // 3. Hub processa
      t(() => {
        setHubActive(true);
        setLogLines((l) => [...l, flow.log[1]]);
      }, 2000);

      // 4. Pacotes do hub para destinos (um para cada)
      t(() => {
        destinations.forEach((dest) => {
          const path = bezierPath(rightAnchor(hub), leftAnchor(dest));
          sendPacket(path, 1.4);
        });
      }, 2400);

      // 5. Destinos confirmam (em sequência)
      t(() => {
        setActiveDestinations(["vd"]);
        setLogLines((l) => [...l, flow.log[2]]);
      }, 3500);
      t(() => {
        setActiveDestinations(["vd", "fn"]);
        setLogLines((l) => [...l, flow.log[3]]);
      }, 3900);
      t(() => {
        setActiveDestinations(["vd", "fn", "lg"]);
        setLogLines((l) => [...l, flow.log[4]]);
      }, 4300);

      // 6. Pausa, reset e próximo flow
      t(() => {
        setActiveTrigger(null);
        setHubActive(false);
        setActiveDestinations([]);
      }, 6500);

      t(() => {
        const next = (idx + 1) % flows.length;
        setFlowIdx(next);
        runFlow(next);
      }, 7200);
    };

    runFlow(flowIdx);
    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // Determina conexões ativas (para destacar)
  const activeConnections = new Set();
  if (activeTrigger) activeConnections.add(`${activeTrigger}-hub`);
  if (hubActive || activeDestinations.length > 0) {
    destinations.forEach((d) => activeConnections.add(`hub-${d.id}`));
  }

  return (
    <div ref={containerRef} style={styles.wrapper}>
      <div
        style={{
          ...styles.card,
          borderColor: hoverCard ? "#bfdbfe" : "#e2e8f0",
          boxShadow: hoverCard
            ? "0 1px 3px rgba(15,23,42,0.04), 0 12px 32px rgba(37,99,235,0.10)"
            : "0 1px 3px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.04)",
          transform: hoverCard ? "translateY(-2px)" : "translateY(0)",
        }}
        onMouseEnter={() => setHoverCard(true)}
        onMouseLeave={() => setHoverCard(false)}
      >
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.dot} />
            <span style={styles.title}>Workflow em execução</span>
          </div>
          <div style={styles.live}>
            <span style={styles.liveDot} />
            <span>{flows[flowIdx].label}</span>
          </div>
        </div>

        {/* Canvas SVG */}
        <div style={styles.canvas}>
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            width="100%"
            style={{ display: "block", maxHeight: 320 }}
          >
            {/* Grid de fundo sutil */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#eef2f7" strokeWidth="0.5" />
              </pattern>
              <radialGradient id="packetGlow">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width={SVG_W} height={SVG_H} fill="url(#grid)" />

            {/* Conexões trigger → hub */}
            {triggers.map((tr) => {
              const path = bezierPath(rightAnchor(tr), leftAnchor(hub));
              const isActive = activeConnections.has(`${tr.id}-hub`);
              const dimmed =
                hoverNode && hoverNode !== tr.id && hoverNode !== "hub";
              return (
                <path
                  key={`c-${tr.id}`}
                  d={path}
                  fill="none"
                  stroke={isActive ? "#2563eb" : "#cbd5e1"}
                  strokeWidth={isActive ? 2 : 1.5}
                  style={{
                    opacity: dimmed ? 0.25 : 1,
                    transition: "all 0.3s ease",
                  }}
                />
              );
            })}

            {/* Conexões hub → destinos */}
            {destinations.map((dest) => {
              const path = bezierPath(rightAnchor(hub), leftAnchor(dest));
              const isActive = activeConnections.has(`hub-${dest.id}`);
              const dimmed =
                hoverNode && hoverNode !== dest.id && hoverNode !== "hub";
              return (
                <path
                  key={`c-${dest.id}`}
                  d={path}
                  fill="none"
                  stroke={isActive ? "#2563eb" : "#cbd5e1"}
                  strokeWidth={isActive ? 2 : 1.5}
                  style={{
                    opacity: dimmed ? 0.25 : 1,
                    transition: "all 0.3s ease",
                  }}
                />
              );
            })}

            {/* Layer dos pacotes (gerenciada imperativamente) */}
            <g ref={packetsLayerRef} />


            {/* Nodes - triggers */}
            {triggers.map((tr) => (
              <Node
                key={tr.id}
                node={tr}
                active={activeTrigger === tr.id}
                hover={hoverNode === tr.id}
                dimmed={hoverNode && hoverNode !== tr.id}
                onHover={setHoverNode}
                badge="trigger"
              />
            ))}

            {/* Hub central */}
            <Node
              node={hub}
              active={hubActive}
              hover={hoverNode === "hub"}
              dimmed={hoverNode && hoverNode !== "hub"}
              onHover={setHoverNode}
              isHub
            />

            {/* Nodes - destinos */}
            {destinations.map((dest) => (
              <Node
                key={dest.id}
                node={dest}
                active={activeDestinations.includes(dest.id)}
                hover={hoverNode === dest.id}
                dimmed={hoverNode && hoverNode !== dest.id}
                onHover={setHoverNode}
                badge="action"
              />
            ))}
          </svg>
        </div>

        {/* Log de execução */}
        <div style={styles.logBox}>
          <div style={styles.logHeader}>
            <span style={styles.logTitle}>Execução</span>
            <span style={styles.logStatus}>
              <span style={styles.logStatusDot} />
              <span>{logLines.length === 5 ? "Concluído" : "Processando..."}</span>
            </span>
          </div>
          <div style={styles.logLines}>
            {/* Sempre renderizamos 5 slots fixos para o container não oscilar.
                Slots ainda não preenchidos ficam invisíveis mas ocupam espaço. */}
            {Array.from({ length: 5 }).map((_, i) => {
              const line = logLines[i];
              const filled = !!line;
              return (
                <div
                  key={`${flowIdx}-${i}`}
                  style={{
                    ...styles.logLine,
                    color: filled
                      ? line.startsWith("✓")
                        ? "#16a34a"
                        : "#475569"
                      : "transparent",
                    animation: filled ? "ffLogIn 0.3s ease both" : "none",
                  }}
                >
                  {filled ? line : "\u00A0"}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Node({ node, active, hover, dimmed, onHover, isHub, badge }) {
  const Icon = node.icon;
  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        cursor: "pointer",
        opacity: dimmed ? 0.35 : 1,
        transition: "opacity 0.25s ease",
      }}
    >
      {/* Glow quando ativo */}
      {active && (
        <rect
          x={-4}
          y={-4}
          width={NODE_W + 8}
          height={NODE_H + 8}
          rx={isHub ? 12 : 10}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          opacity="0.4"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.15;0.4"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </rect>
      )}
      <rect
        width={NODE_W}
        height={NODE_H}
        rx={isHub ? 10 : 8}
        fill={
          isHub
            ? active
              ? "#1e40af"
              : "#2563eb"
            : active
            ? "#dbeafe"
            : hover
            ? "#ffffff"
            : "#f8fafc"
        }
        stroke={
          isHub
            ? "#1e40af"
            : active
            ? "#2563eb"
            : hover
            ? "#3b82f6"
            : "#e2e8f0"
        }
        strokeWidth={isHub ? 1.5 : active || hover ? 1.5 : 1}
        style={{ transition: "all 0.25s ease" }}
      />
      <foreignObject x={0} y={0} width={NODE_W} height={NODE_H}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 10px",
            boxSizing: "border-box",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: isHub
                ? "rgba(255,255,255,0.18)"
                : active
                ? "#2563eb"
                : "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.25s ease",
            }}
          >
            <Icon
              size={14}
              color={isHub ? "#ffffff" : active ? "#ffffff" : "#2563eb"}
              strokeWidth={2.2}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                color: isHub ? "#ffffff" : "#0f172a",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.2,
              }}
            >
              {node.label}
            </div>
            <div
              style={{
                fontSize: 9.5,
                color: isHub ? "rgba(255,255,255,0.75)" : "#94a3b8",
                fontWeight: 500,
                marginTop: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {isHub ? node.sub : badge === "trigger" ? "Trigger" : "Ação"}
            </div>
          </div>
          {active && !isHub && badge === "action" && (
            <CheckCircle2 size={14} color="#16a34a" strokeWidth={2.4} style={{ flexShrink: 0 }} />
          )}
        </div>
      </foreignObject>
    </g>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: 550,
    margin: "0 auto",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 8 },
  dot: { width: 8, height: 8, borderRadius: "50%", background: "#2563eb" },
  title: {
    fontSize: 14,
    fontWeight: 600,
    color: "#0f172a",
    letterSpacing: "-0.01em",
  },
  live: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    color: "#1e40af",
    background: "#dbeafe",
    padding: "4px 10px",
    borderRadius: 999,
    fontWeight: 600,
    transition: "all 0.3s ease",
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#2563eb",
    animation: "ffPulse 1.6s ease-in-out infinite",
  },
  canvas: {
    background: "#fafbfc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 10,
    overflow: "hidden",
  },
  logBox: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "10px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  logHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logTitle: { fontSize: 11, fontWeight: 600, color: "#0f172a" },
  logStatus: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 10,
    color: "#64748b",
    fontWeight: 500,
  },
  logStatusDot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "#22c55e",
    animation: "ffPulse 1.6s ease-in-out infinite",
  },
  logLines: {
    fontFamily:
      "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
    fontSize: 10.5,
    lineHeight: 1.6,
    // 5 linhas × 10.5px × 1.6 line-height = 84px — altura fixa pra não oscilar
    height: 84,
    overflow: "hidden",
  },
  logLine: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "1.6em",
  },
};

if (typeof document !== "undefined" && !document.getElementById("ff-mini-wf-keys")) {
  const s = document.createElement("style");
  s.id = "ff-mini-wf-keys";
  s.textContent = `
    @keyframes ffPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }
    @keyframes ffLogIn { from{opacity:0;transform:translateX(-4px);} to{opacity:1;transform:translateX(0);} }
  `;
  document.head.appendChild(s);
}

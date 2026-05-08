import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

/**
 * MiniDashboard — FacioFlow
 * Componente decorativo para a categoria "Dashboards e inteligência de dados".
 * Tamanho máximo: 650x650. Light + clean, paleta azul tech.
 *
 * Animações:
 *  - KPIs com contadores subindo na entrada
 *  - Barras crescem em altura
 *  - Linha (sparkline) desenha-se via stroke-dashoffset
 *  - Donut "preenche" o arco
 *  - Loop sutil: a cada ~4s um KPI pisca como se tivesse atualizado em tempo real
 */
export default function MiniDashboard() {
  const [mounted, setMounted] = useState(false);
  const [pulseIdx, setPulseIdx] = useState(-1);
  const containerRef = useRef(null);

  // Dispara a animação de entrada quando o componente entra em viewport
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

  // Loop de "live update" — pisca um KPI aleatório de tempos em tempos
  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => {
      setPulseIdx(Math.floor(Math.random() * 4));
      setTimeout(() => setPulseIdx(-1), 900);
    }, 3800);
    return () => clearInterval(id);
  }, [mounted]);

  // ---- Dados mockados ----
  const kpis = [
    { label: "Receita", value: 84.2, prefix: "R$ ", suffix: "k", delta: "+12,4%", icon: DollarSign },
    { label: "Leads", value: 1284, suffix: "", delta: "+8,1%", icon: Users },
    { label: "Conversão", value: 6.7, suffix: "%", delta: "+1,2pp", icon: TrendingUp },
    { label: "Sessões", value: 23.4, suffix: "k", delta: "+4,9%", icon: Activity },
  ];

  const barData = [42, 58, 49, 71, 63, 88, 76]; // últimos 7 dias
  const barLabels = ["S", "T", "Q", "Q", "S", "S", "D"];
  const barMax = Math.max(...barData);

  // Sparkline points
  const lineData = [12, 18, 15, 24, 22, 30, 28, 36, 33, 42, 40, 48];
  const lineMax = Math.max(...lineData);
  const lineMin = Math.min(...lineData);
  const lineW = 280;
  const lineH = 70;
  const linePoints = lineData
    .map((v, i) => {
      const x = (i / (lineData.length - 1)) * lineW;
      const y = lineH - ((v - lineMin) / (lineMax - lineMin)) * lineH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const lineAreaPath = `M0,${lineH} L${linePoints
    .split(" ")
    .map((p) => p)
    .join(" L")} L${lineW},${lineH} Z`;

  // Donut — distribuição de canais
  const donut = [
    { label: "Orgânico", value: 42, color: "#1e40af" },
    { label: "Pago", value: 28, color: "#3b82f6" },
    { label: "Direto", value: 18, color: "#60a5fa" },
    { label: "Social", value: 12, color: "#93c5fd" },
  ];
  const donutTotal = donut.reduce((s, d) => s + d.value, 0);
  const donutR = 42;
  const donutC = 2 * Math.PI * donutR;
  let acc = 0;
  const donutSegs = donut.map((d) => {
    const frac = d.value / donutTotal;
    const dash = frac * donutC;
    const offset = -acc;
    acc += dash;
    return { ...d, dash, offset };
  });

  return (
    <div ref={containerRef} style={styles.wrapper}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.dot} />
            <span style={styles.title}>Visão geral</span>
          </div>
          <div style={styles.live}>
            <span style={styles.liveDot} />
            <span>ao vivo</span>
          </div>
        </div>

        {/* KPIs */}
        <div style={styles.kpiGrid}>
          {kpis.map((k, i) => {
            const Icon = k.icon;
            const isPulse = pulseIdx === i;
            return (
              <div
                key={k.label}
                style={{
                  ...styles.kpiCard,
                  transform: mounted ? "translateY(0)" : "translateY(8px)",
                  opacity: mounted ? 1 : 0,
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
                  boxShadow: isPulse
                    ? "0 0 0 2px rgba(59,130,246,0.35), 0 4px 12px rgba(59,130,246,0.18)"
                    : "0 1px 2px rgba(15,23,42,0.04)",
                }}
              >
                <div style={styles.kpiHeader}>
                  <Icon size={14} color="#3b82f6" strokeWidth={2.2} />
                  <span style={styles.kpiLabel}>{k.label}</span>
                </div>
                <div style={styles.kpiValue}>
                  {k.prefix || ""}
                  <CountUp to={k.value} run={mounted} decimals={k.value % 1 !== 0 ? 1 : 0} />
                  {k.suffix}
                </div>
                <div style={styles.kpiDelta}>{k.delta}</div>
              </div>
            );
          })}
        </div>

        {/* Linha + Donut lado a lado */}
        <div style={styles.row}>
          {/* Sparkline */}
          <div style={{ ...styles.subCard, flex: 1.4 }}>
            <div style={styles.subHeader}>
              <span style={styles.subTitle}>Receita (12 sem.)</span>
              <span style={styles.subDelta}>+27%</span>
            </div>
            <svg width="100%" height="80" viewBox={`0 0 ${lineW} ${lineH + 6}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Área */}
              <path
                d={lineAreaPath}
                fill="url(#lineFill)"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: "opacity 1.2s ease 0.6s",
                }}
              />
              {/* Linha */}
              <polyline
                points={linePoints}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 600,
                  strokeDashoffset: mounted ? 0 : 600,
                  transition: "stroke-dashoffset 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.3s",
                }}
              />
              {/* Ponto final */}
              <circle
                cx={lineW}
                cy={lineH - ((lineData[lineData.length - 1] - lineMin) / (lineMax - lineMin)) * lineH}
                r="3.5"
                fill="#2563eb"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: "opacity 0.3s ease 1.7s",
                }}
              />
            </svg>
          </div>

          {/* Donut */}
          <div style={{ ...styles.subCard, flex: 1 }}>
            <div style={styles.subHeader}>
              <span style={styles.subTitle}>Canais</span>
            </div>
            <div style={styles.donutWrap}>
              <svg width="96" height="96" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={donutR} fill="none" stroke="#eef2f7" strokeWidth="12" />
                <g transform="rotate(-90 50 50)">
                  {donutSegs.map((s, i) => (
                    <circle
                      key={i}
                      cx="50"
                      cy="50"
                      r={donutR}
                      fill="none"
                      stroke={s.color}
                      strokeWidth="12"
                      strokeDasharray={`${mounted ? s.dash : 0} ${donutC}`}
                      strokeDashoffset={s.offset}
                      style={{
                        transition: `stroke-dasharray 1.1s cubic-bezier(0.65, 0, 0.35, 1) ${0.4 + i * 0.15}s`,
                      }}
                    />
                  ))}
                </g>
                <text
                  x="50"
                  y="48"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#64748b"
                  fontWeight="500"
                >
                  Total
                </text>
                <text
                  x="50"
                  y="62"
                  textAnchor="middle"
                  fontSize="14"
                  fill="#0f172a"
                  fontWeight="600"
                >
                  100%
                </text>
              </svg>
              <div style={styles.donutLegend}>
                {donut.map((d, i) => (
                  <div
                    key={d.label}
                    style={{
                      ...styles.legendItem,
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateX(0)" : "translateX(-4px)",
                      transition: `all 0.4s ease ${0.6 + i * 0.1}s`,
                    }}
                  >
                    <span style={{ ...styles.legendDot, background: d.color }} />
                    <span style={styles.legendLabel}>{d.label}</span>
                    <span style={styles.legendValue}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Barras */}
        <div style={styles.subCard}>
          <div style={styles.subHeader}>
            <span style={styles.subTitle}>Conversões na semana</span>
            <span style={styles.subDelta}>+18%</span>
          </div>
          <div style={styles.barChart}>
            {barData.map((v, i) => {
              const h = (v / barMax) * 100;
              const isHigh = v === barMax;
              return (
                <div key={i} style={styles.barCol}>
                  <div style={styles.barTrack}>
                    <div
                      style={{
                        ...styles.barFill,
                        height: mounted ? `${h}%` : "0%",
                        background: isHigh ? "#1e40af" : "#3b82f6",
                        transition: `height 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.06}s`,
                      }}
                    />
                  </div>
                  <span style={styles.barLabel}>{barLabels[i]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Contador animado simples */
function CountUp({ to, run, decimals = 0, duration = 1400 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(eased * to);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, duration]);
  return <span>{val.toFixed(decimals).replace(".", ",")}</span>;
}

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: 650,
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
    gap: 14,
    boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.04)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 8 },
  dot: { width: 8, height: 8, borderRadius: "50%", background: "#2563eb" },
  title: { fontSize: 14, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" },
  live: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    color: "#64748b",
    background: "#f1f5f9",
    padding: "4px 10px",
    borderRadius: 999,
    fontWeight: 500,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#22c55e",
    animation: "ffPulse 1.6s ease-in-out infinite",
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 10,
  },
  kpiCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "10px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  kpiHeader: { display: "flex", alignItems: "center", gap: 6 },
  kpiLabel: { fontSize: 11, color: "#64748b", fontWeight: 500 },
  kpiValue: {
    fontSize: 18,
    fontWeight: 600,
    color: "#0f172a",
    letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
  },
  kpiDelta: { fontSize: 10.5, color: "#16a34a", fontWeight: 500 },
  row: { display: "flex", gap: 10 },
  subCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  subHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subTitle: { fontSize: 12, fontWeight: 600, color: "#0f172a" },
  subDelta: {
    fontSize: 10.5,
    color: "#1e40af",
    background: "#dbeafe",
    padding: "2px 8px",
    borderRadius: 999,
    fontWeight: 600,
  },
  donutWrap: { display: "flex", alignItems: "center", gap: 10 },
  donutLegend: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flex: 1,
    minWidth: 0,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 10.5,
  },
  legendDot: { width: 8, height: 8, borderRadius: 2, flexShrink: 0 },
  legendLabel: { color: "#475569", flex: 1, whiteSpace: "nowrap" },
  legendValue: { color: "#0f172a", fontWeight: 600, fontVariantNumeric: "tabular-nums" },
  barChart: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 6,
    height: 80,
  },
  barCol: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" },
  barTrack: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
    background: "transparent",
  },
  barFill: {
    width: "100%",
    borderRadius: "4px 4px 0 0",
    minHeight: 2,
  },
  barLabel: { fontSize: 10, color: "#94a3b8", fontWeight: 500 },
};

// keyframe injetada uma vez
if (typeof document !== "undefined" && !document.getElementById("ff-mini-dash-keys")) {
  const s = document.createElement("style");
  s.id = "ff-mini-dash-keys";
  s.textContent = `@keyframes ffPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }`;
  document.head.appendChild(s);
}

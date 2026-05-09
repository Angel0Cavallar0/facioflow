import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

/**
 * MiniDashboard — FacioFlow
 * Componente decorativo para a categoria "Dashboards e inteligência de dados".
 * Tamanho máximo: 650x650. Light + clean, paleta azul tech.
 *
 * Animações de entrada:
 *  - KPIs com contadores subindo
 *  - Barras crescem em altura
 *  - Sparkline desenha-se via stroke-dashoffset
 *  - Donut "preenche" o arco
 *  - Loop sutil: a cada ~4s um KPI pisca como se tivesse atualizado
 *
 * Microinterações de hover:
 *  - Card principal: leve elevação + borda azul
 *  - KPIs: sobem 2px, borda azul, ícone aumenta, valor escurece
 *  - Sparkline: pontos aparecem em todos os meses + linha mais grossa
 *  - Donut: segmento em hover destacado, demais opacidade reduzida + label central muda
 *  - Barras: barra em hover azul escuro + título mostra valor
 */
export default function MiniDashboard() {
  const [mounted, setMounted] = useState(false);
  const [pulseIdx, setPulseIdx] = useState(-1);
  const [hoverKpi, setHoverKpi] = useState(-1);
  const [hoverLine, setHoverLine] = useState(false);
  const [hoverDonut, setHoverDonut] = useState(-1);
  const [hoverBar, setHoverBar] = useState(-1);
  const [hoverCard, setHoverCard] = useState(false);
  const containerRef = useRef(null);

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

  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => {
      setPulseIdx(Math.floor(Math.random() * 4));
      setTimeout(() => setPulseIdx(-1), 900);
    }, 3800);
    return () => clearInterval(id);
  }, [mounted]);

  const kpis = [
    { label: "Receita", value: 84.2, prefix: "R$ ", suffix: "k", delta: "+12,4%", icon: DollarSign },
    { label: "Leads", value: 1284, suffix: "", delta: "+8,1%", icon: Users },
    { label: "Conversão", value: 6.7, suffix: "%", delta: "+1,2pp", icon: TrendingUp },
    { label: "Sessões", value: 23.4, suffix: "k", delta: "+4,9%", icon: Activity },
  ];

  const barData = [42, 58, 49, 71, 63, 88, 76];
  const barLabels = ["S", "T", "Q", "Q", "S", "S", "D"];
  const barMax = Math.max(...barData);

  const lineData = [12, 18, 15, 24, 22, 30, 28, 36, 33, 42, 40, 48];
  const lineMax = Math.max(...lineData);
  const lineMin = Math.min(...lineData);
  const lineW = 280;
  const lineH = 70;
  const linePoints = lineData.map((v, i) => {
    const x = (i / (lineData.length - 1)) * lineW;
    const y = lineH - ((v - lineMin) / (lineMax - lineMin)) * lineH;
    return { x, y, v };
  });
  const linePointsStr = linePoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const lineAreaPath = `M0,${lineH} L${linePoints
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" L")} L${lineW},${lineH} Z`;

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

        <div style={styles.kpiGrid}>
          {kpis.map((k, i) => {
            const Icon = k.icon;
            const isPulse = pulseIdx === i;
            const isHover = hoverKpi === i;
            return (
              <div
                key={k.label}
                onMouseEnter={() => setHoverKpi(i)}
                onMouseLeave={() => setHoverKpi(-1)}
                style={{
                  ...styles.kpiCard,
                  cursor: "pointer",
                  background: isHover ? "#ffffff" : "#f8fafc",
                  borderColor: isHover ? "#3b82f6" : "#e2e8f0",
                  transform: mounted
                    ? isHover
                      ? "translateY(-2px)"
                      : "translateY(0)"
                    : "translateY(8px)",
                  opacity: mounted ? 1 : 0,
                  transition: mounted
                    ? "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                    : `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
                  boxShadow: isPulse
                    ? "0 0 0 2px rgba(59,130,246,0.35), 0 4px 12px rgba(59,130,246,0.18)"
                    : isHover
                    ? "0 4px 12px rgba(59,130,246,0.15)"
                    : "0 1px 2px rgba(15,23,42,0.04)",
                }}
              >
                <div style={styles.kpiHeader}>
                  <Icon
                    size={isHover ? 16 : 14}
                    color={isHover ? "#1e40af" : "#3b82f6"}
                    strokeWidth={2.2}
                    style={{ transition: "all 0.25s ease" }}
                  />
                  <span
                    style={{
                      ...styles.kpiLabel,
                      color: isHover ? "#1e40af" : "#64748b",
                      fontWeight: isHover ? 600 : 500,
                      transition: "all 0.25s ease",
                    }}
                  >
                    {k.label}
                  </span>
                </div>
                <div
                  style={{
                    ...styles.kpiValue,
                    color: isHover ? "#1e3a8a" : "#0f172a",
                    transition: "color 0.25s ease",
                  }}
                >
                  {k.prefix || ""}
                  <CountUp to={k.value} run={mounted} decimals={k.value % 1 !== 0 ? 1 : 0} />
                  {k.suffix}
                </div>
                <div style={styles.kpiDelta}>{k.delta}</div>
              </div>
            );
          })}
        </div>

        <div style={styles.row}>
          <div
            style={{
              ...styles.subCard,
              flex: 1.4,
              background: hoverLine ? "#ffffff" : "#f8fafc",
              borderColor: hoverLine ? "#bfdbfe" : "#e2e8f0",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={() => setHoverLine(true)}
            onMouseLeave={() => setHoverLine(false)}
          >
            <div style={styles.subHeader}>
              <span style={styles.subTitle}>Receita (12 sem.)</span>
              <span style={styles.subDelta}>+27%</span>
            </div>
            <svg width="100%" height="80" viewBox={`0 0 ${lineW} ${lineH + 6}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={hoverLine ? "0.35" : "0.25"} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={lineAreaPath}
                fill="url(#lineFill)"
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: "opacity 1.2s ease 0.6s, fill 0.25s ease",
                }}
              />
              <polyline
                points={linePointsStr}
                fill="none"
                stroke={hoverLine ? "#1e40af" : "#2563eb"}
                strokeWidth={hoverLine ? "2.5" : "2"}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 600,
                  strokeDashoffset: mounted ? 0 : 600,
                  transition:
                    "stroke-dashoffset 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.3s, stroke 0.25s ease, stroke-width 0.25s ease",
                }}
              />
              {linePoints.map((p, i) => {
                const isLast = i === linePoints.length - 1;
                const visible = mounted && (hoverLine || isLast);
                return (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={isLast ? 3.5 : 2.5}
                    fill={isLast ? "#1e40af" : "#2563eb"}
                    style={{
                      opacity: visible ? 1 : 0,
                      transition: `opacity 0.3s ease ${isLast ? "1.7s" : `${i * 0.03}s`}`,
                    }}
                  />
                );
              })}
            </svg>
          </div>

          <div
            style={{
              ...styles.subCard,
              flex: 1,
              background: hoverDonut !== -1 ? "#ffffff" : "#f8fafc",
              borderColor: hoverDonut !== -1 ? "#bfdbfe" : "#e2e8f0",
              transition: "all 0.25s ease",
            }}
          >
            <div style={styles.subHeader}>
              <span style={styles.subTitle}>Canais</span>
            </div>
            <div style={styles.donutWrap}>
              <svg width="96" height="96" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={donutR} fill="none" stroke="#eef2f7" strokeWidth="12" />
                <g transform="rotate(-90 50 50)">
                  {donutSegs.map((s, i) => {
                    const isHover = hoverDonut === i;
                    const dimmed = hoverDonut !== -1 && !isHover;
                    return (
                      <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r={donutR}
                        fill="none"
                        stroke={s.color}
                        strokeWidth={isHover ? "14" : "12"}
                        strokeDasharray={`${mounted ? s.dash : 0} ${donutC}`}
                        strokeDashoffset={s.offset}
                        style={{
                          opacity: dimmed ? 0.35 : 1,
                          cursor: "pointer",
                          transition: `stroke-dasharray 1.1s cubic-bezier(0.65, 0, 0.35, 1) ${
                            0.4 + i * 0.15
                          }s, opacity 0.25s ease, stroke-width 0.25s ease`,
                        }}
                        onMouseEnter={() => setHoverDonut(i)}
                        onMouseLeave={() => setHoverDonut(-1)}
                      />
                    );
                  })}
                </g>
                <text
                  x="50"
                  y="48"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#64748b"
                  fontWeight="500"
                  style={{ transition: "all 0.25s ease" }}
                >
                  {hoverDonut !== -1 ? donut[hoverDonut].label : "Total"}
                </text>
                <text
                  x="50"
                  y="62"
                  textAnchor="middle"
                  fontSize="14"
                  fill={hoverDonut !== -1 ? donut[hoverDonut].color : "#0f172a"}
                  fontWeight="600"
                  style={{ transition: "all 0.25s ease" }}
                >
                  {hoverDonut !== -1 ? `${donut[hoverDonut].value}%` : "100%"}
                </text>
              </svg>
              <div style={styles.donutLegend}>
                {donut.map((d, i) => {
                  const isHover = hoverDonut === i;
                  const dimmed = hoverDonut !== -1 && !isHover;
                  return (
                    <div
                      key={d.label}
                      onMouseEnter={() => setHoverDonut(i)}
                      onMouseLeave={() => setHoverDonut(-1)}
                      style={{
                        ...styles.legendItem,
                        cursor: "pointer",
                        opacity: mounted ? (dimmed ? 0.45 : 1) : 0,
                        transform: mounted ? "translateX(0)" : "translateX(-4px)",
                        transition: mounted
                          ? "opacity 0.25s ease"
                          : `all 0.4s ease ${0.6 + i * 0.1}s`,
                      }}
                    >
                      <span
                        style={{
                          ...styles.legendDot,
                          background: d.color,
                          transform: isHover ? "scale(1.3)" : "scale(1)",
                          transition: "transform 0.25s ease",
                        }}
                      />
                      <span
                        style={{
                          ...styles.legendLabel,
                          color: isHover ? "#0f172a" : "#475569",
                          fontWeight: isHover ? 600 : 400,
                          transition: "all 0.25s ease",
                        }}
                      >
                        {d.label}
                      </span>
                      <span style={styles.legendValue}>{d.value}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            ...styles.subCard,
            background: hoverBar !== -1 ? "#ffffff" : "#f8fafc",
            borderColor: hoverBar !== -1 ? "#bfdbfe" : "#e2e8f0",
            transition: "all 0.25s ease",
          }}
        >
          <div style={styles.subHeader}>
            <span style={styles.subTitle}>
              {hoverBar !== -1 ? `${barData[hoverBar]} conversões` : "Conversões na semana"}
            </span>
            <span style={styles.subDelta}>+18%</span>
          </div>
          <div style={styles.barChart}>
            {barData.map((v, i) => {
              const h = (v / barMax) * 100;
              const isHigh = v === barMax;
              const isHover = hoverBar === i;
              const dimmed = hoverBar !== -1 && !isHover;
              return (
                <div
                  key={i}
                  style={styles.barCol}
                  onMouseEnter={() => setHoverBar(i)}
                  onMouseLeave={() => setHoverBar(-1)}
                >
                  <div style={styles.barTrack}>
                    <div
                      style={{
                        ...styles.barFill,
                        height: mounted ? `${h}%` : "0%",
                        background: isHover ? "#1e3a8a" : isHigh ? "#1e40af" : "#3b82f6",
                        opacity: dimmed ? 0.4 : 1,
                        cursor: "pointer",
                        transition: mounted
                          ? "background 0.2s ease, opacity 0.2s ease"
                          : `height 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.06}s`,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      ...styles.barLabel,
                      color: isHover ? "#1e40af" : "#94a3b8",
                      fontWeight: isHover ? 600 : 500,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {barLabels[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function CountUp({ to, run, decimals = 0, duration = 1400 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
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
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between" },
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
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 },
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
  subHeader: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  subTitle: { fontSize: 12, fontWeight: 600, color: "#0f172a", transition: "all 0.2s ease" },
  subDelta: {
    fontSize: 10.5,
    color: "#1e40af",
    background: "#dbeafe",
    padding: "2px 8px",
    borderRadius: 999,
    fontWeight: 600,
  },
  donutWrap: { display: "flex", alignItems: "center", gap: 10 },
  donutLegend: { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 },
  legendItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 10.5 },
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
  barCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    height: "100%",
  },
  barTrack: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "flex-end",
    background: "transparent",
  },
  barFill: { width: "100%", borderRadius: "4px 4px 0 0", minHeight: 2 },
  barLabel: { fontSize: 10, color: "#94a3b8", fontWeight: 500 },
};

if (typeof document !== "undefined" && !document.getElementById("ff-mini-dash-keys")) {
  const s = document.createElement("style");
  s.id = "ff-mini-dash-keys";
  s.textContent = `@keyframes ffPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }`;
  document.head.appendChild(s);
}

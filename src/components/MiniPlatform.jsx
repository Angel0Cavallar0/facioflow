import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  CircleUserRound,
  Code2,
} from "lucide-react";

/**
 * MiniPlatform — FacioFlow
 * Componente decorativo para "Plataformas sob medida".
 * Tamanho máximo: 550x550. Light + clean, paleta azul tech.
 *
 * Conceito split: editor de código à esquerda digitando linha por linha,
 * preview da UI à direita renderizando conforme cada bloco é "construído".
 */

const codeScript = [
  { text: "// 01_app.tsx", color: "#94a3b8" },
  { text: "import { useAuth, useRealtime } from '@core'", color: "#475569" },
  { text: "", spacer: true },
  { text: "export function App() {", color: "#0f172a", trigger: "frontend" },
  { text: "  const user = useAuth()", color: "#0f172a", trigger: "auth" },
  { text: "  const role = usePermissions()", color: "#0f172a", trigger: "perms" },
  { text: "  const data = useQuery('records')", color: "#0f172a", trigger: "backend" },
  { text: "  const live = useRealtime(data)", color: "#0f172a", trigger: "realtime" },
  { text: "", spacer: true },
  { text: "  return <Dashboard data={live} />", color: "#0f172a", trigger: "db" },
  { text: "}", color: "#0f172a" },
];

function colorize(text) {
  if (!text) return null;
  if (text.startsWith("//")) {
    return <span style={{ color: "#94a3b8" }}>{text}</span>;
  }
  const parts = text.split(
    /(\bimport\b|\bexport\b|\bfunction\b|\bconst\b|\breturn\b|\bfrom\b|'[^']*'|<\/?\w+|\{|\}|\(|\))/g
  );
  return parts.map((p, i) => {
    if (!p) return null;
    if (
      p === "import" ||
      p === "export" ||
      p === "function" ||
      p === "const" ||
      p === "return" ||
      p === "from"
    ) {
      return (
        <span key={i} style={{ color: "#7c3aed", fontWeight: 600 }}>
          {p}
        </span>
      );
    }
    if (p.startsWith("'")) {
      return (
        <span key={i} style={{ color: "#16a34a" }}>
          {p}
        </span>
      );
    }
    if (p.startsWith("<") || p === "{" || p === "}" || p === "(" || p === ")") {
      return (
        <span key={i} style={{ color: "#2563eb" }}>
          {p}
        </span>
      );
    }
    return (
      <span key={i} style={{ color: "#0f172a" }}>
        {p}
      </span>
    );
  });
}

export default function MiniPlatform() {
  const [mounted, setMounted] = useState(false);
  const [hoverCard, setHoverCard] = useState(false);
  const [typedLines, setTypedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [uiState, setUiState] = useState({
    frontend: false,
    auth: false,
    perms: false,
    backend: false,
    realtime: false,
    db: false,
  });
  const [tableRowsVisible, setTableRowsVisible] = useState(0);
  const [liveTick, setLiveTick] = useState(0);

  const containerRef = useRef(null);
  const timersRef = useRef([]);
  const codeBoxRef = useRef(null);

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

    const t = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    const reset = () => {
      setTypedLines([]);
      setCurrentLine("");
      setUiState({
        frontend: false,
        auth: false,
        perms: false,
        backend: false,
        realtime: false,
        db: false,
      });
      setTableRowsVisible(0);
    };

    let lineIdx = 0;
    let charIdx = 0;
    let active = true;

    function typeNext() {
      if (!active) return;
      if (lineIdx >= codeScript.length) {
        t(() => {
          if (!active) return;
          reset();
          lineIdx = 0;
          charIdx = 0;
          typeNext();
        }, 4000);
        return;
      }

      const line = codeScript[lineIdx];

      if (line.spacer || line.text === "") {
        setTypedLines((prev) => [
          ...prev,
          { text: "", color: line.color || "#0f172a" },
        ]);
        lineIdx++;
        charIdx = 0;
        t(typeNext, 80);
        return;
      }

      if (charIdx <= line.text.length) {
        setCurrentLine(line.text.slice(0, charIdx));
        if (codeBoxRef.current) {
          codeBoxRef.current.scrollTop = codeBoxRef.current.scrollHeight;
        }
        charIdx++;
        const baseDelay = line.text.startsWith("//") ? 18 : 22;
        const jitter = Math.random() * 18;
        t(typeNext, baseDelay + jitter);
      } else {
        setTypedLines((prev) => [
          ...prev,
          { text: line.text, color: line.color || "#0f172a" },
        ]);
        setCurrentLine("");
        if (line.trigger) {
          setUiState((prev) => ({ ...prev, [line.trigger]: true }));
          if (line.trigger === "db") {
            t(() => setTableRowsVisible(1), 200);
            t(() => setTableRowsVisible(2), 400);
            t(() => setTableRowsVisible(3), 600);
          }
        }
        lineIdx++;
        charIdx = 0;
        t(typeNext, 220);
      }
    }

    typeNext();

    return () => {
      active = false;
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [mounted]);

  useEffect(() => {
    if (!uiState.realtime) return;
    const id = setInterval(() => setLiveTick((t) => t + 1), 1400);
    return () => clearInterval(id);
  }, [uiState.realtime]);

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
        <div style={styles.split}>
          <div style={styles.codePane}>
            <div style={styles.paneTab}>
              <Code2 size={11} color="#64748b" strokeWidth={2.4} />
              <span>app.tsx</span>
            </div>
            <div ref={codeBoxRef} style={styles.codeBox}>
              {typedLines.map((line, i) => (
                <div key={i} style={styles.codeLine}>
                  <span style={styles.lineNum}>{i + 1}</span>
                  <span style={styles.lineContent}>
                    {line.text === "" ? "\u00A0" : colorize(line.text)}
                  </span>
                </div>
              ))}
              <div style={styles.codeLine}>
                <span style={styles.lineNum}>{typedLines.length + 1}</span>
                <span style={styles.lineContent}>
                  {colorize(currentLine)}
                  <span style={styles.caret}>▍</span>
                </span>
              </div>
            </div>
          </div>

          <div style={styles.previewPane}>
            <div style={styles.paneTab}>
              <span style={{ ...styles.previewDot, background: "#22c55e" }} />
              <span>preview</span>
            </div>
            <div style={styles.preview}>
              <div style={styles.miniBrowser}>
                <div style={styles.miniBrowserBar}>
                  <span style={{ ...styles.miniDot, background: "#f87171" }} />
                  <span style={{ ...styles.miniDot, background: "#fbbf24" }} />
                  <span style={{ ...styles.miniDot, background: "#4ade80" }} />
                </div>
                <div style={styles.miniBody}>
                  <div
                    style={{
                      ...styles.topbar,
                      opacity: uiState.frontend ? 1 : 0,
                      transform: uiState.frontend
                        ? "translateY(0)"
                        : "translateY(-3px)",
                      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div style={styles.brand}>
                      <div style={styles.brandSquare} />
                    </div>
                    <div style={styles.searchBox}>
                      <Search size={8} color="#94a3b8" strokeWidth={2.2} />
                    </div>
                    <div style={styles.topbarRight}>
                      <div style={styles.bellWrap}>
                        <Bell size={10} color="#64748b" strokeWidth={2.2} />
                        {uiState.realtime && (
                          <span
                            key={liveTick}
                            style={{
                              ...styles.bellBadge,
                              animation: "ffPing 0.8s ease-out",
                            }}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          ...styles.avatar,
                          boxShadow: uiState.auth
                            ? "0 0 0 2px rgba(59,130,246,0.4)"
                            : "none",
                          transition: "box-shadow 0.4s ease",
                        }}
                      >
                        <CircleUserRound
                          size={11}
                          color="#ffffff"
                          strokeWidth={2.2}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={styles.miniLayout}>
                    <div
                      style={{
                        ...styles.sidebar,
                        opacity: uiState.perms ? 1 : 0,
                        transform: uiState.perms
                          ? "translateX(0)"
                          : "translateX(-4px)",
                        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <SidebarItem icon={LayoutDashboard} active />
                      <SidebarItem icon={Users} />
                      <SidebarItem icon={BarChart3} />
                      <SidebarItem icon={Settings} />
                    </div>

                    <div style={styles.main}>
                      <div
                        style={{
                          ...styles.kpiRow,
                          opacity: uiState.backend ? 1 : 0,
                          transform: uiState.backend
                            ? "translateY(0)"
                            : "translateY(4px)",
                          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        <Kpi value="1.2k" />
                        <Kpi
                          value="84k"
                          highlight={uiState.realtime}
                          tick={liveTick}
                        />
                        <Kpi value="47" />
                      </div>

                      <div
                        style={{
                          ...styles.tableCard,
                          opacity: uiState.db ? 1 : 0,
                          transform: uiState.db
                            ? "translateY(0)"
                            : "translateY(4px)",
                          transition:
                            "all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                        }}
                      >
                        {[
                          { dot: "#22c55e" },
                          { dot: "#22c55e" },
                          { dot: "#f59e0b" },
                        ].map((row, i) => (
                          <div
                            key={i}
                            style={{
                              ...styles.tableRow,
                              opacity: tableRowsVisible > i ? 1 : 0,
                              transform:
                                tableRowsVisible > i
                                  ? "translateX(0)"
                                  : "translateX(-3px)",
                              transition: "all 0.3s ease",
                            }}
                          >
                            <span
                              style={{
                                ...styles.rowDotInner,
                                background: row.dot,
                              }}
                            />
                            <span style={styles.rowBar} />
                            <span style={styles.rowBarShort} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon: Icon, active }) {
  return (
    <div
      style={{
        ...styles.sideItem,
        background: active ? "#dbeafe" : "transparent",
      }}
    >
      <Icon size={9} color={active ? "#2563eb" : "#94a3b8"} strokeWidth={2.2} />
    </div>
  );
}

function Kpi({ value, highlight, tick }) {
  return (
    <div
      style={{
        ...styles.kpi,
        borderColor: highlight ? "#3b82f6" : "#e2e8f0",
        boxShadow: highlight ? "0 0 0 2px rgba(59,130,246,0.15)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div style={styles.kpiBar} />
      <div
        key={highlight ? tick : "static"}
        style={{
          ...styles.kpiValue,
          animation: highlight ? "ffFlash 0.6s ease" : "none",
        }}
      >
        {value}
      </div>
    </div>
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
  split: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    minHeight: 280,
  },
  codePane: {
    background: "#fafbfc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  previewPane: {
    background: "#fafbfc",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  paneTab: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 10px",
    background: "#f1f5f9",
    borderBottom: "1px solid #e2e8f0",
    fontSize: 10,
    color: "#64748b",
    fontWeight: 600,
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
  },
  previewDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    animation: "ffPulse 1.6s ease-in-out infinite",
  },
  codeBox: {
    flex: 1,
    padding: "8px 6px 8px 0",
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
    fontSize: 9.5,
    lineHeight: 1.65,
    overflowY: "auto",
    overflowX: "hidden",
    minHeight: 230,
    maxHeight: 260,
  },
  codeLine: { display: "flex", gap: 6, padding: "0 4px", whiteSpace: "nowrap" },
  lineNum: {
    color: "#cbd5e1",
    minWidth: 16,
    textAlign: "right",
    userSelect: "none",
    fontVariantNumeric: "tabular-nums",
  },
  lineContent: { flex: 1, overflow: "hidden", textOverflow: "ellipsis" },
  caret: {
    color: "#2563eb",
    animation: "ffCaret 0.8s steps(2) infinite",
    marginLeft: 1,
  },
  preview: {
    flex: 1,
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  miniBrowser: {
    width: "100%",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  miniBrowserBar: {
    display: "flex",
    gap: 3,
    padding: "5px 6px",
    background: "#f1f5f9",
    borderBottom: "1px solid #e2e8f0",
  },
  miniDot: { width: 5, height: 5, borderRadius: "50%" },
  miniBody: {
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "5px 6px",
    borderBottom: "1px solid #f1f5f9",
  },
  brand: { display: "flex", alignItems: "center" },
  brandSquare: {
    width: 12,
    height: 12,
    borderRadius: 3,
    background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
  },
  searchBox: {
    flex: 1,
    height: 14,
    background: "#f8fafc",
    borderRadius: 4,
    border: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    paddingLeft: 5,
    maxWidth: 60,
  },
  topbarRight: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginLeft: "auto",
  },
  bellWrap: { position: "relative", display: "flex" },
  bellBadge: {
    position: "absolute",
    top: -1,
    right: -1,
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "#ef4444",
    border: "1px solid #ffffff",
  },
  avatar: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  miniLayout: { display: "flex", flex: 1 },
  sidebar: {
    width: 24,
    padding: "5px 4px",
    borderRight: "1px solid #f1f5f9",
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  sideItem: {
    width: 16,
    height: 16,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    padding: 6,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    minWidth: 0,
  },
  kpiRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 },
  kpi: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 5,
    padding: "4px 5px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  kpiBar: { width: "60%", height: 2, background: "#cbd5e1", borderRadius: 1 },
  kpiValue: {
    fontSize: 9,
    fontWeight: 700,
    color: "#0f172a",
    letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
    padding: "0 1px",
    borderRadius: 2,
  },
  tableCard: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 5,
    padding: 5,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  tableRow: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "3px 5px",
    background: "#ffffff",
    borderRadius: 3,
    border: "1px solid #e2e8f0",
  },
  rowDotInner: { width: 4, height: 4, borderRadius: "50%", flexShrink: 0 },
  rowBar: { flex: 1, height: 3, background: "#cbd5e1", borderRadius: 1 },
  rowBarShort: { width: 18, height: 3, background: "#e2e8f0", borderRadius: 1 },
};

if (
  typeof document !== "undefined" &&
  !document.getElementById("ff-mini-platform-keys")
) {
  const s = document.createElement("style");
  s.id = "ff-mini-platform-keys";
  s.textContent = `
    @keyframes ffPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }
    @keyframes ffPing { 0%{transform:scale(0.5);opacity:1;} 80%,100%{transform:scale(1.6);opacity:0;} }
    @keyframes ffFlash { 0%{background:transparent;} 50%{background:#dbeafe;} 100%{background:transparent;} }
    @keyframes ffCaret { 0%,50%{opacity:1;} 51%,100%{opacity:0;} }
  `;
  document.head.appendChild(s);
}

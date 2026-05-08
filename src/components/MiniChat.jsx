import React, { useState, useEffect, useRef } from "react";
import { Bot, User, CheckCheck } from "lucide-react";

/**
 * MiniChat — FacioFlow
 * Componente decorativo para a categoria "Agentes de IA e atendimento automatizado".
 * Simula uma conversa entre cliente e bot da FacioFlow.
 *
 * Comportamento:
 *  - Auto-roda o roteiro de mensagens com timing realista
 *  - Mostra "digitando..." antes de cada resposta do bot
 *  - Mensagens do cliente aparecem após pequeno delay simulando "escrita humana"
 *  - Auto-scroll suave conforme a conversa evolui
 *  - Loop: ao terminar, espera ~5s e reinicia a conversa
 *  - Hover: card eleva-se, bolhas individuais destacam levemente
 */
export default function MiniChat() {
  const script = [
    {
      from: "client",
      text: "Oi, como a FacioFlow pode me ajudar?",
      typingMs: 1100,
    },
    {
      from: "bot",
      text:
        "Olá! Nós automatizamos processos repetitivos do seu negócio: atendimento, dashboards, chatbots com IA e integrações de sistemas. Como podemos te ajudar?",
      typingMs: 1800,
    },
    {
      from: "client",
      text: "Atendimento. Perco muito lead por demora.",
      typingMs: 1300,
    },
    {
      from: "bot",
      text:
        "Cenário clássico! Podemos montar um bot que responde na hora, qualifica o lead e só passa pro time quando tá pronto pra fechar. O que acha?",
      typingMs: 1900,
    },
    {
      from: "client",
      text: "Perfeito!",
      typingMs: 800,
    },
  ];

  const [visibleMsgs, setVisibleMsgs] = useState([]);
  const [typing, setTyping] = useState(null); // 'client' | 'bot' | null
  const [hoverCard, setHoverCard] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(-1);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const timersRef = useRef([]);

  // Inicia quando entra na viewport
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
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Loop do roteiro
  useEffect(() => {
    if (!mounted) return;

    const clearAll = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    const runConversation = () => {
      setVisibleMsgs([]);
      setTyping(null);

      let elapsed = 600; // delay inicial

      script.forEach((msg, i) => {
        // Mostra "digitando"
        timersRef.current.push(
          setTimeout(() => setTyping(msg.from), elapsed)
        );
        elapsed += msg.typingMs;

        // Adiciona a mensagem
        timersRef.current.push(
          setTimeout(() => {
            setTyping(null);
            setVisibleMsgs((prev) => [...prev, { ...msg, idx: i }]);
          }, elapsed)
        );
        elapsed += 700; // pausa entre mensagens
      });

      // Reinicia o ciclo após 10 segundos
      timersRef.current.push(
        setTimeout(() => {
          runConversation();
        }, elapsed + 10000)
      );
    };

    runConversation();
    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visibleMsgs, typing]);

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
            <div style={styles.botAvatar}>
              <Bot size={18} color="#ffffff" strokeWidth={2.2} />
              <span style={styles.onlineDot} />
            </div>
            <div>
              <div style={styles.botName}>FacioFlow Bot</div>
              <div style={styles.botStatus}>
                <span style={styles.statusDot} />
                online · responde em segundos
              </div>
            </div>
          </div>
          <div style={styles.live}>
            <span style={styles.liveDot} />
            <span>IA</span>
          </div>
        </div>

        {/* Mensagens */}
        <div ref={scrollRef} style={styles.messages}>
          {visibleMsgs.map((msg, i) => {
            const isBot = msg.from === "bot";
            const isHover = hoverIdx === i;
            return (
              <div
                key={i}
                style={{
                  ...styles.row,
                  justifyContent: isBot ? "flex-start" : "flex-end",
                  animation: "ffMsgIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
                }}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(-1)}
              >
                {isBot && (
                  <div style={styles.smallAvatar}>
                    <Bot size={12} color="#ffffff" strokeWidth={2.4} />
                  </div>
                )}
                <div
                  style={{
                    ...styles.bubble,
                    background: isBot
                      ? isHover
                        ? "#ffffff"
                        : "#f1f5f9"
                      : isHover
                      ? "#1e40af"
                      : "#2563eb",
                    color: isBot ? "#0f172a" : "#ffffff",
                    borderColor: isBot
                      ? isHover
                        ? "#3b82f6"
                        : "#e2e8f0"
                      : "transparent",
                    borderTopLeftRadius: isBot ? 4 : 14,
                    borderTopRightRadius: isBot ? 14 : 4,
                    transform: isHover ? "translateY(-1px)" : "translateY(0)",
                    boxShadow: isHover
                      ? isBot
                        ? "0 2px 8px rgba(59,130,246,0.12)"
                        : "0 4px 12px rgba(37,99,235,0.25)"
                      : "none",
                  }}
                >
                  <div style={styles.bubbleText}>{msg.text}</div>
                  <div
                    style={{
                      ...styles.timestamp,
                      color: isBot ? "#94a3b8" : "rgba(255,255,255,0.75)",
                      justifyContent: isBot ? "flex-start" : "flex-end",
                    }}
                  >
                    <span>{formatTime(i)}</span>
                    {!isBot && (
                      <CheckCheck
                        size={12}
                        strokeWidth={2.4}
                        style={{ marginLeft: 4 }}
                      />
                    )}
                  </div>
                </div>
                {!isBot && (
                  <div style={styles.smallAvatarClient}>
                    <User size={12} color="#475569" strokeWidth={2.4} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Digitando */}
          {typing && (
            <div
              style={{
                ...styles.row,
                justifyContent: typing === "bot" ? "flex-start" : "flex-end",
                animation: "ffMsgIn 0.3s ease both",
              }}
            >
              {typing === "bot" && (
                <div style={styles.smallAvatar}>
                  <Bot size={12} color="#ffffff" strokeWidth={2.4} />
                </div>
              )}
              <div
                style={{
                  ...styles.typingBubble,
                  background: typing === "bot" ? "#f1f5f9" : "#2563eb",
                  borderTopLeftRadius: typing === "bot" ? 4 : 14,
                  borderTopRightRadius: typing === "bot" ? 14 : 4,
                }}
              >
                <span
                  style={{
                    ...styles.typingDot,
                    background: typing === "bot" ? "#94a3b8" : "rgba(255,255,255,0.85)",
                    animationDelay: "0s",
                  }}
                />
                <span
                  style={{
                    ...styles.typingDot,
                    background: typing === "bot" ? "#94a3b8" : "rgba(255,255,255,0.85)",
                    animationDelay: "0.2s",
                  }}
                />
                <span
                  style={{
                    ...styles.typingDot,
                    background: typing === "bot" ? "#94a3b8" : "rgba(255,255,255,0.85)",
                    animationDelay: "0.4s",
                  }}
                />
              </div>
              {typing === "client" && (
                <div style={styles.smallAvatarClient}>
                  <User size={12} color="#475569" strokeWidth={2.4} />
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function formatTime(i) {
  // Timestamps fictícios crescendo aos poucos
  const base = 14 * 60 + 32; // 14:32
  const m = base + i;
  const hh = String(Math.floor(m / 60)).padStart(2, "0");
  const mm = String(m % 60).padStart(2, "0");
  return `${hh}:${mm}`;
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
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    height: 550,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    borderBottom: "1px solid #e2e8f0",
    background: "#ffffff",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  botAvatar: {
    position: "relative",
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    background: "#22c55e",
    border: "2px solid #ffffff",
    borderRadius: "50%",
  },
  botName: { fontSize: 14, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.01em" },
  botStatus: {
    fontSize: 11,
    color: "#64748b",
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginTop: 1,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#22c55e",
    animation: "ffPulse 1.6s ease-in-out infinite",
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
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "#2563eb",
  },
  messages: {
    flex: 1,
    padding: "18px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    background: "#fafbfc",
    scrollBehavior: "smooth",
  },
  row: { display: "flex", alignItems: "flex-end", gap: 8, maxWidth: "100%" },
  smallAvatar: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginBottom: 4,
  },
  smallAvatarClient: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginBottom: 4,
  },
  bubble: {
    maxWidth: "75%",
    padding: "10px 14px",
    borderRadius: 14,
    border: "1px solid",
    fontSize: 13.5,
    lineHeight: 1.5,
    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    cursor: "default",
  },
  bubbleText: { whiteSpace: "pre-wrap" },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  typingBubble: {
    padding: "12px 16px",
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    animation: "ffTyping 1.2s ease-in-out infinite",
    display: "inline-block",
  },
};

// Keyframes globais (uma única injeção)
if (typeof document !== "undefined" && !document.getElementById("ff-mini-chat-keys")) {
  const s = document.createElement("style");
  s.id = "ff-mini-chat-keys";
  s.textContent = `
    @keyframes ffMsgIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ffTyping {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-3px); opacity: 1; }
    }
    @keyframes ffPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.4); }
    }
  `;
  document.head.appendChild(s);
}

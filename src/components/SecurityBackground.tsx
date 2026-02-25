import { useEffect, useRef } from "react";

interface DataParticle {
  x: number;
  y: number;
  char: string;
  opacity: number;
  speed: number;
  size: number;
  hue: number;
}

const BINARY_CHARS = "010011010110100101110011".split("");
const HEX_CHARS = "0123456789ABCDEF".split("");
const PARTICLE_COUNT = 38;

const SecurityBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    const particles: DataParticle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      mouseX = canvas.width / 2;
      mouseY = canvas.height / 2;
    };

    const randomChar = () =>
      Math.random() > 0.5
        ? BINARY_CHARS[Math.floor(Math.random() * BINARY_CHARS.length)]
        : HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          char: randomChar(),
          opacity: Math.random() * 0.5 + 0.15,
          speed: Math.random() * 0.6 + 0.2,
          size: Math.floor(Math.random() * 6) + 10,
          hue: Math.random() > 0.5 ? 270 : 190,
        });
      }
    };

    const drawGrid = (vanishX: number, horizon: number) => {
      ctx.save();

      // Vertical lines converging to vanishing point
      const numV = 14;
      for (let i = 0; i <= numV; i++) {
        const t = i / numV;
        const startX = t * canvas.width;
        const alpha = 0.08 + Math.abs(t - 0.5) * 0.12;
        ctx.beginPath();
        ctx.moveTo(startX, canvas.height);
        ctx.lineTo(vanishX, horizon);
        ctx.strokeStyle = `hsla(270, 85%, 65%, ${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // Horizontal lines (perspective spacing)
      const numH = 10;
      for (let i = 0; i <= numH; i++) {
        const t = i / numH;
        const perspT = Math.pow(t, 1.8);
        const y = canvas.height - (canvas.height - horizon) * perspT;
        const halfW = (canvas.width / 2) * (t * 0.9 + 0.1);
        const alpha = 0.04 + t * 0.18;
        ctx.beginPath();
        ctx.moveTo(vanishX - halfW, y);
        ctx.lineTo(vanishX + halfW, y);
        ctx.strokeStyle = `hsla(270, 85%, 65%, ${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawGlow = (vanishX: number, horizon: number) => {
      // Horizon glow
      const glowGrad = ctx.createRadialGradient(
        vanishX, horizon, 0,
        vanishX, horizon, canvas.width * 0.5
      );
      glowGrad.addColorStop(0, "hsla(270, 80%, 55%, 0.22)");
      glowGrad.addColorStop(0.4, "hsla(220, 80%, 50%, 0.08)");
      glowGrad.addColorStop(1, "hsla(270, 80%, 55%, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.ellipse(vanishX, horizon, canvas.width * 0.5, 120, 0, 0, Math.PI * 2);
      ctx.fill();

      // Mouse glow
      const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 160);
      mouseGrad.addColorStop(0, "hsla(200, 90%, 65%, 0.12)");
      mouseGrad.addColorStop(1, "hsla(200, 90%, 65%, 0)");
      ctx.fillStyle = mouseGrad;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 160, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      time += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark background gradient
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, "hsl(240, 55%, 6%)");
      bg.addColorStop(0.5, "hsl(255, 50%, 8%)");
      bg.addColorStop(1, "hsl(245, 55%, 5%)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const vanishX = canvas.width / 2 + (mouseX - canvas.width / 2) * 0.08;
      const horizon = canvas.height * 0.38 + Math.sin(time * 0.25) * 6;

      drawGrid(vanishX, horizon);
      drawGlow(vanishX, horizon);

      // Floating data characters
      ctx.textBaseline = "top";
      for (const p of particles) {
        p.y -= p.speed;
        p.opacity = 0.15 + Math.abs(Math.sin(time * 0.8 + p.x * 0.02)) * 0.5;

        if (p.y < -30) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
          p.char = randomChar();
          p.hue = Math.random() > 0.5 ? 270 : 190;
        }

        ctx.font = `${p.size}px monospace`;
        ctx.fillStyle = `hsla(${p.hue}, 85%, 70%, ${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = canvas.width / 2;
      mouseY = canvas.height / 2;
    };

    const handleResize = () => {
      resize();
      initParticles();
    };

    resize();
    initParticles();
    draw();

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
    />
  );
};

export default SecurityBackground;

import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number; size: number; opacity: number;
  twinkleSpeed: number; twinklePhase: number;
}

interface ShootingStar {
  x: number; y: number; length: number; speed: number;
  angle: number; opacity: number; life: number; maxLife: number;
}

interface Nebula {
  x: number; y: number; radius: number; hue: number;
  driftX: number; driftY: number; phase: number; pulseSpeed: number;
}

interface WavePoint {
  x: number; y: number; amplitude: number; frequency: number; phase: number; speed: number;
}

const CyberSkyCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const animRef = useRef(0);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const nebulaeRef = useRef<Nebula[]>([]);
  const wavesRef = useRef<WavePoint[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();

    const starCount = Math.floor((canvas.width * canvas.height) / 8000);
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.3,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    const nebulaCount = Math.floor(canvas.height / 600) + 3;
    nebulaeRef.current = Array.from({ length: nebulaCount }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: 300 + i * 500 + Math.random() * 200,
      radius: 120 + Math.random() * 100,
      hue: [185, 260, 35, 300, 200][i % 5],
      driftX: (Math.random() - 0.5) * 0.15,
      driftY: (Math.random() - 0.5) * 0.05,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.005 + Math.random() * 0.008,
    }));

    // Water wave lines
    wavesRef.current = Array.from({ length: 6 }, (_, i) => ({
      x: 0,
      y: canvas.height * 0.7 + i * 40,
      amplitude: 8 + Math.random() * 12,
      frequency: 0.003 + Math.random() * 0.004,
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.012,
    }));

    const handleScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", resize);

    const draw = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars
      for (const star of starsRef.current) {
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.twinklePhase) * 0.4 + 0.6;
        const alpha = star.opacity * twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(200, 20%, 92%, ${alpha})`;
        ctx.fill();

        if (star.size > 1.2) {
          const g = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
          g.addColorStop(0, `hsla(185, 80%, 75%, ${alpha * 0.3})`);
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Nebulae
      for (const nebula of nebulaeRef.current) {
        nebula.x += nebula.driftX;
        nebula.y += nebula.driftY;
        if (nebula.x < -nebula.radius) nebula.x = canvas.width + nebula.radius;
        if (nebula.x > canvas.width + nebula.radius) nebula.x = -nebula.radius;

        const pulse = Math.sin(timeRef.current * nebula.pulseSpeed + nebula.phase) * 0.3 + 0.7;
        const r = nebula.radius * pulse;
        const grad = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, r);
        grad.addColorStop(0, `hsla(${nebula.hue}, 60%, 50%, 0.04)`);
        grad.addColorStop(0.4, `hsla(${nebula.hue}, 50%, 40%, 0.02)`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Water reflection waves
      for (const wave of wavesRef.current) {
        wave.phase += wave.speed;
        ctx.beginPath();
        ctx.moveTo(0, wave.y);
        for (let x = 0; x < canvas.width; x += 4) {
          const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude
            + Math.sin(x * wave.frequency * 0.5 + wave.phase * 1.3) * wave.amplitude * 0.4;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(185, 60%, 55%, 0.03)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Shooting stars
      if (shootingStarsRef.current.length < 2 && Math.random() < 0.004) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width * 0.8,
          y: scrollRef.current + Math.random() * window.innerHeight * 0.5,
          length: 60 + Math.random() * 140,
          speed: 5 + Math.random() * 8,
          angle: (Math.PI / 7) + Math.random() * (Math.PI / 5),
          opacity: 1,
          life: 0,
          maxLife: 50 + Math.random() * 50,
        });
      }

      shootingStarsRef.current = shootingStarsRef.current.filter((s) => {
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity = 1 - s.life / s.maxLife;
        if (s.opacity <= 0) return false;

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.6, `hsla(185, 80%, 70%, ${s.opacity * 0.4})`);
        grad.addColorStop(1, `hsla(185, 90%, 90%, ${s.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const headGlow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 10);
        headGlow.addColorStop(0, `hsla(185, 90%, 95%, ${s.opacity * 0.8})`);
        headGlow.addColorStop(1, "transparent");
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  );
};

export default CyberSkyCanvas;

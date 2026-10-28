import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../utils/portfolio.ts';

interface MatrixRainProps {
  enabled: boolean;
  theme: ThemeMode;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ enabled, theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンλπΩΨΣ<>/{}[];:=+*~#';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    let lastDraw = 0;
    const interval = 45; // ~22fps for smooth, low CPU usage

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (time - lastDraw < interval) return;
      lastDraw = time;

      // Soft trailing opacity fade
      ctx.fillStyle = 'rgba(7, 9, 13, 0.1)';
      ctx.fillRect(0, 0, width, height);

      const colorMap: Record<ThemeMode, string> = {
        green: '#B6FF5C',
        purple: '#A855F7',
        cyan: '#46E7FF',
      };
      const primaryColor = colorMap[theme] || '#B6FF5C';

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Glowing lead character
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(text, x, y);

        // Body character
        ctx.fillStyle = primaryColor;
        ctx.fillText(text, x, y - fontSize);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, theme]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-25"
    />
  );
};

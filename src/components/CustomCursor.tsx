import React, { useEffect, useState } from 'react';
import { ThemeMode } from '../utils/portfolio.ts';

interface CustomCursorProps {
  enabled: boolean;
  theme: ThemeMode;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled, theme }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    let rafId: number;
    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2,
      }));
      rafId = requestAnimationFrame(follow);
    };
    rafId = requestAnimationFrame(follow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, [pos.x, pos.y]);

  if (!enabled || isTouch) return null;

  const colorMap: Record<ThemeMode, string> = {
    green: '#B6FF5C',
    purple: '#A855F7',
    cyan: '#46E7FF',
  };
  const themeColor = colorMap[theme] || '#B6FF5C';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Precision Core Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${isClicking ? 0.7 : 1})`,
          backgroundColor: themeColor,
          boxShadow: `0 0 10px ${themeColor}`,
        }}
      />

      {/* Cyber Reticle Follower */}
      <div
        className="fixed top-0 left-0 rounded-full border -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
        style={{
          width: isHovering ? 44 : 26,
          height: isHovering ? 44 : 26,
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) scale(${isClicking ? 0.85 : 1})`,
          borderColor: isHovering ? themeColor : 'rgba(232, 237, 245, 0.3)',
          backgroundColor: isHovering ? `${themeColor}15` : 'transparent',
          boxShadow: isHovering ? `0 0 16px ${themeColor}40` : 'none',
        }}
      />
    </div>
  );
};

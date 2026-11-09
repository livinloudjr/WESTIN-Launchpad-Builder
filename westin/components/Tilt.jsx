'use client';
import { useRef } from 'react';

export default function Tilt({ children }) {
  const ref = useRef(null);
  const move = (e) => {
    if (e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  };
  const leave = () => { ref.current.style.transform = ''; };
  return (
    <div style={{ perspective: 900 }} onPointerMove={move} onPointerLeave={leave}>
      <div ref={ref} style={{ transition: 'transform .25s ease-out', transformStyle: 'preserve-3d' }}>{children}</div>
    </div>
  );
}

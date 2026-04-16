import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      raf.current = requestAnimationFrame(animateRing);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    const interactiveEls = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    window.addEventListener('mousemove', moveCursor);
    raf.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(raf.current);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor"
        style={{
          width: isHovering ? '8px' : '12px',
          height: isHovering ? '8px' : '12px',
          background: isHovering ? '#7B2FFF' : '#00F5FF',
          boxShadow: isHovering
            ? '0 0 10px rgba(123,47,255,0.9), 0 0 20px rgba(123,47,255,0.5)'
            : '0 0 10px rgba(0,245,255,0.9), 0 0 20px rgba(0,245,255,0.5)',
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          width: isHovering ? '56px' : '36px',
          height: isHovering ? '56px' : '36px',
          borderColor: isHovering ? 'rgba(123,47,255,0.6)' : 'rgba(0,245,255,0.5)',
          background: isHovering ? 'rgba(123,47,255,0.05)' : 'transparent',
        }}
      />
    </>
  );
};

export default CustomCursor;

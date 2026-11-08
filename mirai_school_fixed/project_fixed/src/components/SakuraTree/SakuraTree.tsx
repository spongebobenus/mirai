import { useEffect, useRef } from 'react';
import { useIntersection } from '../../hooks/useIntersection';
import { Renderer } from './Renderer';
import type { SakuraTreeProps } from './Types';

const DEFAULT_PROPS: Required<SakuraTreeProps> = {
  className: '',
  width: 0,
  height: 0,
  blossomColor: '#F3A6C6',
  petalCount: 70,
  particleCount: 10000,
  windStrength: 2.2,
  enableInteraction: true,
};

export default function SakuraTree(userProps: SakuraTreeProps = {}) {
  const props: Required<SakuraTreeProps> = { ...DEFAULT_PROPS, ...userProps };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const triggeredRef = useRef(false);

  const [intersectionRef, isVisible] = useIntersection(0.45);

  // Merge refs
  const setContainerRef = (el: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    (intersectionRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  // Init renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const renderer = new Renderer(canvas, props);
    rendererRef.current = renderer;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.resize(w, h);
    };

    resize();
    renderer.start();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Reduced motion fallback
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      renderer.trigger(); // Skip dot phase, form immediately
    }

    return () => {
      ro.disconnect();
      renderer.destroy();
      rendererRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Trigger animation on intersection
  useEffect(() => {
    if (isVisible && !triggeredRef.current && rendererRef.current) {
      triggeredRef.current = true;
      // Let user see the 4 labeled dots clearly before the burst begins
      setTimeout(() => {
        rendererRef.current?.trigger();
      }, 1800);
    }
  }, [isVisible]);

  // Mouse interaction
  useEffect(() => {
    if (!props.enableInteraction) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      rendererRef.current?.onMouseMove(e.clientX - rect.left, e.clientY - rect.top);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [props.enableInteraction]);

  return (
    <div
      ref={setContainerRef}
      className={`relative w-full h-full ${props.className}`}
      style={{ minHeight: 360 }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Анимированное дерево сакуры"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}

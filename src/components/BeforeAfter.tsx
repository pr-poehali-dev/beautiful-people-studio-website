import { useRef, useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';

interface Props {
  before: string;
  after: string;
}

const BeforeAfter = ({ before, after }: Props) => {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[4/5] overflow-hidden rounded-lg select-none cursor-ew-resize bg-muted"
      onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => move(e.touches[0].clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      <img src={after} alt="После" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <span className="absolute top-3 right-3 bg-gold text-primary-foreground text-xs px-3 py-1 rounded z-10">ПОСЛЕ</span>
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="До" className="absolute inset-0 h-full object-cover grayscale" style={{ width: `${ref.current?.offsetWidth || 600}px`, maxWidth: 'none' }} draggable={false} />
        <span className="absolute top-3 left-3 bg-foreground/70 text-white text-xs px-3 py-1 rounded">ДО</span>
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gold">
          <Icon name="ChevronsLeftRight" size={18} />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;

import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useSchoolGallery } from '../context/ContentContext';

function Lightbox({ photos, start, onClose }: { photos: string[]; start: number; onClose: () => void }) {
  const [idx, setIdx] = useState(start);
  const prev = () => setIdx(i => (i - 1 + photos.length) % photos.length);
  const next = () => setIdx(i => (i + 1) % photos.length);

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Prev */}
      <button onClick={e => { e.stopPropagation(); prev(); }}
        style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,.12)', border: 'none', color: '#fff', fontSize: 28, width: 48, height: 48, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ‹
      </button>

      {/* Image */}
      <img
        src={photos[idx]}
        alt=""
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: 12, boxShadow: '0 32px 80px rgba(0,0,0,.6)' }}
      />

      {/* Next */}
      <button onClick={e => { e.stopPropagation(); next(); }}
        style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,.12)', border: 'none', color: '#fff', fontSize: 28, width: 48, height: 48, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ›
      </button>

      {/* Close */}
      <button onClick={onClose}
        style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,.12)', border: 'none', color: '#fff', fontSize: 22, width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        ✕
      </button>

      {/* Counter */}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,.5)', fontSize: 13 }}>
        {idx + 1} / {photos.length}
      </div>
    </div>
  );
}

export default function SchoolLife() {
  const ct = useContent();
  const photos = useSchoolGallery();
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (photos.length === 0) return null;

  const sl = (ct as any).schoolLife;

  return (
    <section className="py-20 px-[5%]" style={{ background: '#050F1C' }}>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{ background: 'rgba(220,38,38,.12)', color: '#f87171', border: '1px solid rgba(220,38,38,.2)' }}>
          {sl?.eyebrow ?? 'Мектеп өмірі'}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
          dangerouslySetInnerHTML={{ __html: sl?.title ?? 'Мектеп <em>ішінен</em>' }} />
        {sl?.subtitle && (
          <p className="mt-3 text-white/50 text-base max-w-xl mx-auto">{sl.subtitle}</p>
        )}
      </div>

      {/* Masonry grid */}
      <div
        style={{
          columns: '3 240px',
          columnGap: '12px',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {photos.map((src, i) => (
          <div
            key={i}
            onClick={() => setLightbox(i)}
            style={{
              breakInside: 'avoid',
              marginBottom: 12,
              borderRadius: 10,
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              display: 'block',
            }}
            className="group"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              style={{ width: '100%', display: 'block', objectFit: 'cover', transition: 'transform .35s ease' }}
              className="group-hover:scale-105"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            {/* Hover overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background .25s' }}
              className="group-hover:bg-black/30 flex items-center justify-center">
              <svg className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <Lightbox photos={photos} start={lightbox} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}

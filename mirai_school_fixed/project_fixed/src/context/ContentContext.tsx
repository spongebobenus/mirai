import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { t as defaultT } from '../data/content';
import { IMAGES as defaultImages } from '../data/images';
import { useLang } from './LangContext';

const CONTENT_KEY = 'mirai_content_v1';

type LangContent = typeof defaultT['ru'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AllContent = { kz: any; ru: any; en: any };
type ImageOverrides = Record<string, string>;

function deepMerge(base: any, override: any): any {
  if (override === undefined || override === null) return base;
  if (typeof base !== 'object' || Array.isArray(base)) return override ?? base;
  const out: any = { ...base };
  for (const k of Object.keys(override)) {
    out[k] = k in base && typeof base[k] === 'object' && !Array.isArray(base[k])
      ? deepMerge(base[k], override[k])
      : override[k];
  }
  return out;
}

function mergeAll(raw: any): AllContent {
  return {
    kz: deepMerge(defaultT.kz, raw?.kz ?? {}),
    ru: deepMerge(defaultT.ru, raw?.ru ?? {}),
    en: deepMerge(defaultT.en, raw?.en ?? {}),
  };
}

interface ContentCtx {
  content: AllContent;
  images: ImageOverrides;
  schoolGallery: string[];
  updateAll: (content: AllContent, images: ImageOverrides, gallery: string[]) => void;
  resetAll: () => void;
}

const Ctx = createContext<ContentCtx>({
  content: defaultT as AllContent,
  images: {},
  schoolGallery: [],
  updateAll: () => {},
  resetAll: () => {},
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<AllContent>(() => {
    try {
      const raw = localStorage.getItem(CONTENT_KEY);
      return raw ? mergeAll(JSON.parse(raw)) : defaultT as AllContent;
    } catch { return defaultT as AllContent; }
  });
  const [images, setImages] = useState<ImageOverrides>({});
  const [schoolGallery, setSchoolGallery] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(CONTENT_KEY);
      if (!raw) return [];
      return JSON.parse(raw)?.schoolGallery ?? [];
    } catch { return []; }
  });

  useEffect(() => {
    fetch('/content.json?v=' + Date.now(), { cache: 'no-cache' })
      .then(r => r.ok ? r.json() : null)
      .catch(() => null)
      .then(data => {
        if (!data || Object.keys(data).length === 0) return;
        const merged = mergeAll(data);
        setContent(merged);
        setImages(data.images ?? {});
        setSchoolGallery(data.schoolGallery ?? []);
        localStorage.setItem(CONTENT_KEY, JSON.stringify({ ...merged, images: data.images, schoolGallery: data.schoolGallery ?? [] }));
      });
  }, []);

  const updateAll = useCallback((c: AllContent, img: ImageOverrides, gallery: string[]) => {
    setContent(c);
    setImages(img);
    setSchoolGallery(gallery);
    localStorage.setItem(CONTENT_KEY, JSON.stringify({ ...c, images: img, schoolGallery: gallery }));
  }, []);

  const resetAll = useCallback(() => {
    localStorage.removeItem(CONTENT_KEY);
    setContent(defaultT as AllContent);
    setImages({});
    setSchoolGallery([]);
  }, []);

  const value = useMemo(
    () => ({ content, images, schoolGallery, updateAll, resetAll }),
    [content, images, schoolGallery, updateAll, resetAll],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Use in page components */
export function useContent(): LangContent {
  const { lang } = useLang();
  return useContext(Ctx).content[lang] as LangContent;
}

/** Use in Admin panel */
export function useAdminContent() {
  return useContext(Ctx);
}

/** School life gallery */
export function useSchoolGallery(): string[] {
  return useContext(Ctx).schoolGallery;
}

/** Returns IMAGES merged with any admin overrides */
export function useImages() {
  const { images, content } = useContext(Ctx);
  return useMemo(() => {
    const reviewCount: number = (content.ru as any)?.reviews?.items?.length ?? defaultImages.reviews.length;
    const reviewPhotos = Array.from({ length: reviewCount }, (_, i) =>
      images[`review_${i}`] ?? defaultImages.reviews[i] ?? '/images/avatar-default.jpg',
    );
    return {
      hero: images['hero'] ?? defaultImages.hero,
      heroVideo: images['heroVideo'] ?? defaultImages.heroVideo,
      classroom: images['classroom'] ?? defaultImages.classroom,
      gallery: defaultImages.gallery.map((v, i) => images[`gallery_${i}`] ?? v),
      team: defaultImages.team.map((v, i) => images[`team_${i}`] ?? v),
      reviews: reviewPhotos,
      branches: {
        isayeva: images['branch_isayeva'] ?? defaultImages.branches.isayeva,
        askarova: images['branch_askarova'] ?? defaultImages.branches.askarova,
      },
    };
  }, [images, content]);
}

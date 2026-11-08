export type UILang = 'kz' | 'ru' | 'en';

const CODES: Record<UILang, string> = {
  kz: 'kk',
  ru: 'ru',
  en: 'en-GB',
};

export async function translateText(
  text: string,
  from: UILang,
  to: UILang,
): Promise<string> {
  if (from === to || !text.trim()) return text;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${CODES[from]}|${CODES[to]}`;
  const res = await fetch(url);
  const json = await res.json();
  if (json.responseStatus === 200) return json.responseData.translatedText as string;
  throw new Error(json.responseMessage ?? 'Ошибка перевода');
}

export async function translateToOthers(
  text: string,
  from: UILang,
): Promise<Partial<Record<UILang, string>>> {
  const others: UILang[] = (['kz', 'ru', 'en'] as UILang[]).filter(l => l !== from);
  const results: Partial<Record<UILang, string>> = {};
  await Promise.all(
    others.map(async to => {
      results[to] = await translateText(text, from, to);
    }),
  );
  return results;
}

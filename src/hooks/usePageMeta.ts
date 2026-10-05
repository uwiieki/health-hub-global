import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description?: string;
  image?: string | null;
  type?: 'website' | 'article';
}

const setMeta = (selector: string, attr: 'name' | 'property', key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  const prev = el.getAttribute('content');
  el.setAttribute('content', value);
  return () => { if (prev !== null) el!.setAttribute('content', prev); else el!.remove(); };
};

/** Устанавливает title / description / Open Graph для страницы и возвращает прежние значения при уходе. */
export const usePageMeta = ({ title, description, image, type = 'website' }: PageMeta) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    const restore: Array<() => void> = [];
    if (description) {
      restore.push(setMeta('meta[name="description"]', 'name', 'description', description));
      restore.push(setMeta('meta[property="og:description"]', 'property', 'og:description', description));
    }
    restore.push(setMeta('meta[property="og:title"]', 'property', 'og:title', title));
    restore.push(setMeta('meta[property="og:type"]', 'property', 'og:type', type));
    if (image) restore.push(setMeta('meta[property="og:image"]', 'property', 'og:image', image));
    return () => {
      document.title = prevTitle;
      restore.forEach((fn) => fn());
    };
  }, [title, description, image, type]);
};

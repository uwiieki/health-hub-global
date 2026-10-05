import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { fallbackBlogPosts } from '@/data/blogPosts';

export interface BlogPost {
  id: string;
  slug: string;
  title_ru: string; title_kz: string; title_en: string;
  excerpt_ru: string; excerpt_kz: string; excerpt_en: string;
  content_ru: string; content_kz: string; content_en: string;
  cover_image_url: string | null;
  publish_date: string;
}

type Lang = 'ru' | 'kz' | 'en';

// Если перевод не заполнен — показываем русский вариант
const pick = (post: BlogPost, field: 'title' | 'excerpt' | 'content', lang: Lang) =>
  ((post as unknown as Record<string, string>)[`${field}_${lang}`] || '').trim() ||
  ((post as unknown as Record<string, string>)[`${field}_ru`] || '');

export const getPostTitle = (p: BlogPost, lang: Lang) => pick(p, 'title', lang);
export const getPostExcerpt = (p: BlogPost, lang: Lang) => {
  const ex = pick(p, 'excerpt', lang);
  if (ex) return ex;
  return pick(p, 'content', lang).split(/\n\s*\n/)[1]?.slice(0, 200) ?? '';
};
export const getPostParagraphs = (p: BlogPost, lang: Lang) =>
  pick(p, 'content', lang).split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);

export const formatPostDate = (dateStr: string, lang: Lang) =>
  new Date(dateStr + 'T00:00:00').toLocaleDateString(
    lang === 'en' ? 'en-US' : lang === 'kz' ? 'kk-KZ' : 'ru-RU',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

/** Список опубликованных записей (новые первыми). */
export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('publish_date', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) {
          // Таблицы нет / база недоступна — показываем резервную копию, чтобы раздел не был пустым
          setPosts(fallbackBlogPosts);
          setError(true);
        } else {
          setPosts((data ?? []) as BlogPost[]);
        }
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { posts, loading, error };
};

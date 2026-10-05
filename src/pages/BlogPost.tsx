import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Calendar } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageMeta } from '@/hooks/usePageMeta';
import { leaders } from '@/data/leaders';
import { BlogBreadcrumb } from '@/components/blog/BlogBreadcrumb';
import { DirectorMessageForm } from '@/components/blog/DirectorMessageForm';
import { Button } from '@/components/ui/button';
import { formatPostDate, getPostExcerpt, getPostParagraphs, getPostTitle, useBlogPosts } from '@/lib/blog';
import NotFound from './NotFound';

const ORG_NAME = 'Центр спортивной медицины Актюбинской области';
const director = leaders.find((l) => l.id === 'nurmatov');

const BlogPost = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const { posts, loading, error } = useBlogPosts();

  // Список отсортирован от новых к старым: «следующая» запись — более новая, «предыдущая» — более старая
  const index = posts.findIndex((p) => p.slug === slug);
  const post = index >= 0 ? posts[index] : null;
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

  usePageMeta({
    title: post ? `${getPostTitle(post, language)} — ${ORG_NAME}` : `${t('blog.title')} — ${ORG_NAME}`,
    description: post ? getPostExcerpt(post, language) : t('blog.subtitle'),
    image: post?.cover_image_url,
    type: 'article',
  });

  if (loading) {
    return <Layout><p className="py-24 text-center text-muted-foreground">{t('common.loading')}</p></Layout>;
  }
  if (!post) {
    if (error) {
      return (
        <Layout>
          <div className="container py-24 text-center">
            <p className="mb-6 text-muted-foreground">{t('blog.loadError')}</p>
            <Button asChild><Link to="/blog-rukovoditelya">{t('blog.all')}</Link></Button>
          </div>
        </Layout>
      );
    }
    return <NotFound />;
  }

  const title = getPostTitle(post, language);

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <BlogBreadcrumb items={[
            { label: t('blog.home'), href: '/' },
            { label: t('blog.title'), href: '/blog-rukovoditelya' },
            { label: title },
          ]} />

          <article>
            <header className="mb-8">
              <h1 className="break-words font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-[2.75rem]">
                {title}
              </h1>
              <time dateTime={post.publish_date} className="mt-4 flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatPostDate(post.publish_date, language)}
              </time>
            </header>

            <figure className="mb-8 overflow-hidden rounded-[22px] border border-primary/10 shadow-sm">
              <div className="aspect-[16/8] w-full">
                {post.cover_image_url ? (
                  <img src={post.cover_image_url} alt={title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-primary/5 to-white">
                    <BookOpen className="h-16 w-16 text-primary/30" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            </figure>

            <div className="space-y-5 text-base leading-[1.8] text-foreground/90 md:text-lg">
              {getPostParagraphs(post, language).map((para, i) => (
                <p key={i} className={i === 0 ? 'font-semibold text-foreground' : ''}>{para}</p>
              ))}
            </div>

            {director && (
              <footer className="mt-8">
                <p className="text-foreground/90">{t('blog.signature')}</p>
                <p className="mt-3 font-display text-lg font-bold text-foreground">{director.name[language]}</p>
                <p className="text-muted-foreground">
                  {director.role[language]} {t('blog.directorOf')}
                </p>
              </footer>
            )}
          </article>

          <div className="mt-12"><DirectorMessageForm /></div>

          <nav aria-label="Навигация по записям" className="mt-10 grid gap-4 sm:grid-cols-2">
            {older ? (
              <Link to={`/blog-rukovoditelya/${older.slug}`}
                className="group flex min-w-0 flex-col gap-1 rounded-[22px] border border-primary/10 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className="flex items-center gap-2 text-sm font-medium text-primary">
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />{t('blog.prev')}
                </span>
                <span className="line-clamp-2 break-words font-display font-bold text-foreground">{getPostTitle(older, language)}</span>
              </Link>
            ) : <span aria-hidden="true" className="hidden sm:block" />}
            {newer ? (
              <Link to={`/blog-rukovoditelya/${newer.slug}`}
                className="group flex min-w-0 flex-col gap-1 rounded-[22px] border border-primary/10 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:items-end sm:text-right">
                <span className="flex items-center gap-2 text-sm font-medium text-primary">
                  {t('blog.next')}<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="line-clamp-2 break-words font-display font-bold text-foreground">{getPostTitle(newer, language)}</span>
              </Link>
            ) : null}
          </nav>

          <div className="mt-6 text-center">
            <Link to="/blog-rukovoditelya" className="text-sm font-medium text-primary hover:underline">{t('blog.all')}</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;

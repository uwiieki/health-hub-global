import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageMeta } from '@/hooks/usePageMeta';
import { BlogBreadcrumb } from '@/components/blog/BlogBreadcrumb';
import { formatPostDate, getPostExcerpt, getPostTitle, useBlogPosts } from '@/lib/blog';

const ORG_NAME = 'Центр спортивной медицины Актюбинской области';

const Blog = () => {
  const { t, language } = useLanguage();
  const { posts, loading } = useBlogPosts();

  usePageMeta({
    title: `${t('blog.title')} — ${ORG_NAME}`,
    description: t('blog.subtitle'),
  });

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container max-w-5xl">
          <BlogBreadcrumb items={[
            { label: t('blog.home'), href: '/' },
            { label: t('blog.title') },
          ]} />

          <header className="mb-10 max-w-2xl">
            <h1 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              {t('blog.title')}
            </h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">{t('blog.subtitle')}</p>
          </header>

          {loading ? (
            <p className="py-12 text-center text-muted-foreground">{t('common.loading')}</p>
          ) : posts.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">{t('blog.empty')}</p>
          ) : (
            <ul className="space-y-5">
              {posts.map((post) => (
                <li key={post.id}>
                  <article>
                    <Link
                      to={`/blog-rukovoditelya/${post.slug}`}
                      className="group flex flex-col overflow-hidden rounded-[22px] border border-primary/10 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card md:flex-row"
                    >
                      <div className="aspect-[16/9] overflow-hidden md:aspect-auto md:w-2/5 md:shrink-0">
                        {post.cover_image_url ? (
                          <img
                            src={post.cover_image_url}
                            alt={getPostTitle(post, language)}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full min-h-[10rem] w-full items-center justify-center bg-gradient-to-br from-primary/15 via-primary/5 to-white">
                            <BookOpen className="h-12 w-12 text-primary/30" strokeWidth={1.5} />
                          </div>
                        )}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 md:p-7">
                        <time dateTime={post.publish_date} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatPostDate(post.publish_date, language)}
                        </time>
                        <h2 className="break-words font-display text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary md:text-2xl">
                          {getPostTitle(post, language)}
                        </h2>
                        <p className="line-clamp-3 break-words text-[15px] leading-relaxed text-muted-foreground">
                          {getPostExcerpt(post, language)}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <span className="text-sm font-semibold text-primary">{t('blog.readMore')}</span>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-primary/10">
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;

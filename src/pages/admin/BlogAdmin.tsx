import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

interface AdminPost extends BlogPost { status: string }

interface DirectorMessage {
  id: string; name: string; phone: string; email: string; message: string;
  mail_sent: boolean; created_at: string;
}

const emptyPost: Omit<AdminPost, 'id'> = {
  slug: '',
  title_ru: '', title_kz: '', title_en: '',
  excerpt_ru: '', excerpt_kz: '', excerpt_en: '',
  content_ru: '', content_kz: '', content_en: '',
  cover_image_url: null,
  publish_date: new Date().toISOString().split('T')[0],
  status: 'draft',
};

// Транслитерация заголовка в адрес страницы
const translit = (text: string) => {
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm',
    н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
    ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya', ә: 'a', ғ: 'g', қ: 'k', ң: 'n', ө: 'o', ұ: 'u', ү: 'u', һ: 'h', і: 'i',
  };
  return text.toLowerCase().split('').map((c) => map[c] ?? c).join('')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
};

const BlogAdmin = () => {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [messages, setMessages] = useState<DirectorMessage[]>([]);
  const [editItem, setEditItem] = useState<Partial<AdminPost> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const fetchAll = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('publish_date', { ascending: false });
    if (data) setPosts(data as AdminPost[]);
    const { data: msgs } = await supabase.from('director_messages').select('*').order('created_at', { ascending: false }).limit(50);
    if (msgs) setMessages(msgs as DirectorMessage[]);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSave = async () => {
    if (!editItem) return;
    const { id, ...rest } = editItem as AdminPost;
    const slug = (rest.slug || translit(rest.title_ru || '')).trim();
    if (!rest.title_ru?.trim() || !slug) {
      toast({ title: 'Укажите заголовок (RU)', variant: 'destructive' });
      return;
    }
    const payload = { ...rest, slug, cover_image_url: rest.cover_image_url?.trim() || null };
    let error;
    if (id) ({ error } = await supabase.from('blog_posts').update(payload).eq('id', id));
    else ({ error } = await supabase.from('blog_posts').insert(payload));
    if (error) {
      const dup = error.message.includes('duplicate') || error.message.includes('unique');
      toast({ title: 'Ошибка', description: dup ? 'Запись с таким адресом (slug) уже есть' : error.message, variant: 'destructive' });
    } else { toast({ title: 'Сохранено' }); setIsOpen(false); setEditItem(null); fetchAll(); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Удалить публикацию?')) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    else fetchAll();
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Удалить обращение?')) return;
    const { error } = await supabase.from('director_messages').delete().eq('id', id);
    if (error) toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    else fetchAll();
  };

  const set = (patch: Partial<AdminPost>) => setEditItem((prev) => ({ ...prev, ...patch }));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold">Блог руководителя</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditItem({ ...emptyPost })}><Plus className="mr-2 h-4 w-4" />Добавить</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
            <DialogHeader><DialogTitle>{editItem?.id ? 'Редактировать' : 'Добавить'} публикацию</DialogTitle></DialogHeader>
            {editItem && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Заголовок (RU)</label><Input value={editItem.title_ru || ''} onChange={(e) => set({ title_ru: e.target.value, ...(editItem.id ? {} : { slug: translit(e.target.value) }) })} /></div>
                  <div><label className="text-sm font-medium">Заголовок (KZ)</label><Input value={editItem.title_kz || ''} onChange={(e) => set({ title_kz: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Заголовок (EN)</label><Input value={editItem.title_en || ''} onChange={(e) => set({ title_en: e.target.value })} /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Краткое описание (RU)</label><Textarea rows={3} value={editItem.excerpt_ru || ''} onChange={(e) => set({ excerpt_ru: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Краткое описание (KZ)</label><Textarea rows={3} value={editItem.excerpt_kz || ''} onChange={(e) => set({ excerpt_kz: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Краткое описание (EN)</label><Textarea rows={3} value={editItem.excerpt_en || ''} onChange={(e) => set({ excerpt_en: e.target.value })} /></div>
                </div>
                <p className="text-xs text-muted-foreground">Текст: абзацы разделяйте пустой строкой. Подпись руководителя добавляется автоматически. Если перевод не заполнен, показывается русский вариант.</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Текст (RU)</label><Textarea rows={10} value={editItem.content_ru || ''} onChange={(e) => set({ content_ru: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Текст (KZ)</label><Textarea rows={10} value={editItem.content_kz || ''} onChange={(e) => set({ content_kz: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Текст (EN)</label><Textarea rows={10} value={editItem.content_en || ''} onChange={(e) => set({ content_en: e.target.value })} /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Адрес (slug)</label><Input value={editItem.slug || ''} onChange={(e) => set({ slug: e.target.value.toLowerCase() })} placeholder="o-razvitii-..." /></div>
                  <div><label className="text-sm font-medium">Дата публикации</label><Input type="date" value={editItem.publish_date || ''} onChange={(e) => set({ publish_date: e.target.value })} /></div>
                  <div>
                    <label className="text-sm font-medium">Статус</label>
                    <Select value={editItem.status || 'draft'} onValueChange={(v) => set({ status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Черновик</SelectItem>
                        <SelectItem value="published">Опубликовано</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><label className="text-sm font-medium">URL изображения</label><Input value={editItem.cover_image_url || ''} onChange={(e) => set({ cover_image_url: e.target.value })} /></div>
                <Button onClick={handleSave} className="w-full">Сохранить</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {posts.map((p) => (
          <Card key={p.id}>
            <CardContent className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{p.title_ru}</span>
                  <Badge variant={p.status === 'published' ? 'default' : 'secondary'}>{p.status === 'published' ? 'Опубликовано' : 'Черновик'}</Badge>
                </div>
                <p className="truncate text-sm text-muted-foreground">/{p.slug} · {p.publish_date}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="ghost" size="icon" onClick={() => { setEditItem(p); setIsOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && <p className="py-8 text-center text-muted-foreground">Нет публикаций. Добавьте первую!</p>}
      </div>

      <h2 className="mb-4 mt-12 font-display text-2xl font-bold">Обращения к руководителю</h2>
      <div className="space-y-3">
        {messages.map((m) => (
          <Card key={m.id}>
            <CardContent className="flex items-start justify-between gap-3 p-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{m.name}</span>
                  <Badge variant={m.mail_sent ? 'default' : 'destructive'}>{m.mail_sent ? 'Письмо отправлено' : 'Письмо не доставлено'}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{m.email}{m.phone ? ` · ${m.phone}` : ''} · {new Date(m.created_at).toLocaleString('ru-RU')}</p>
                <p className="mt-2 whitespace-pre-wrap break-words text-sm">{m.message}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteMessage(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </CardContent>
          </Card>
        ))}
        {messages.length === 0 && <p className="py-4 text-center text-muted-foreground">Обращений пока нет.</p>}
      </div>
    </div>
  );
};

export default BlogAdmin;

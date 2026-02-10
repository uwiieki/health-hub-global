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

interface NewsItem {
  id: string;
  title_ru: string; title_kz: string; title_en: string;
  content_ru: string; content_kz: string; content_en: string;
  cover_image_url: string | null;
  category: string;
  publish_date: string;
  status: string;
}

const emptyNews: Omit<NewsItem, 'id'> = {
  title_ru: '', title_kz: '', title_en: '',
  content_ru: '', content_kz: '', content_en: '',
  cover_image_url: null, category: '', publish_date: new Date().toISOString().split('T')[0], status: 'draft',
};

const NewsAdmin = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editItem, setEditItem] = useState<Partial<NewsItem> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const fetchNews = async () => {
    const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    if (data) setNews(data as NewsItem[]);
  };

  useEffect(() => { fetchNews(); }, []);

  const handleSave = async () => {
    if (!editItem) return;
    const { id, ...rest } = editItem as NewsItem;
    let error;
    if (id) {
      ({ error } = await supabase.from('news').update(rest).eq('id', id));
    } else {
      ({ error } = await supabase.from('news').insert(rest));
    }
    if (error) toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Сохранено' }); setIsOpen(false); setEditItem(null); fetchNews(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    else fetchNews();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Управление новостями</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditItem({ ...emptyNews })}><Plus className="mr-2 h-4 w-4" />Добавить</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader><DialogTitle>{editItem?.id ? 'Редактировать' : 'Добавить'} новость</DialogTitle></DialogHeader>
            {editItem && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Заголовок (RU)</label><Input value={editItem.title_ru || ''} onChange={(e) => setEditItem({ ...editItem, title_ru: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Заголовок (KZ)</label><Input value={editItem.title_kz || ''} onChange={(e) => setEditItem({ ...editItem, title_kz: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Заголовок (EN)</label><Input value={editItem.title_en || ''} onChange={(e) => setEditItem({ ...editItem, title_en: e.target.value })} /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Контент (RU)</label><Textarea rows={5} value={editItem.content_ru || ''} onChange={(e) => setEditItem({ ...editItem, content_ru: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Контент (KZ)</label><Textarea rows={5} value={editItem.content_kz || ''} onChange={(e) => setEditItem({ ...editItem, content_kz: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Контент (EN)</label><Textarea rows={5} value={editItem.content_en || ''} onChange={(e) => setEditItem({ ...editItem, content_en: e.target.value })} /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Категория</label><Input value={editItem.category || ''} onChange={(e) => setEditItem({ ...editItem, category: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Дата публикации</label><Input type="date" value={editItem.publish_date || ''} onChange={(e) => setEditItem({ ...editItem, publish_date: e.target.value })} /></div>
                  <div>
                    <label className="text-sm font-medium">Статус</label>
                    <Select value={editItem.status || 'draft'} onValueChange={(v) => setEditItem({ ...editItem, status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Черновик</SelectItem>
                        <SelectItem value="published">Опубликовано</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><label className="text-sm font-medium">URL обложки</label><Input value={editItem.cover_image_url || ''} onChange={(e) => setEditItem({ ...editItem, cover_image_url: e.target.value })} /></div>
                <Button onClick={handleSave} className="w-full">Сохранить</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-3">
        {news.map((n) => (
          <Card key={n.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{n.title_ru}</span>
                  <Badge variant={n.status === 'published' ? 'default' : 'secondary'}>{n.status === 'published' ? 'Опубликовано' : 'Черновик'}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{n.category} · {n.publish_date}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => { setEditItem(n); setIsOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(n.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {news.length === 0 && <p className="text-center text-muted-foreground py-8">Нет новостей. Добавьте первую!</p>}
      </div>
    </div>
  );
};

export default NewsAdmin;

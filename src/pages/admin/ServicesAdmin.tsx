import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Service {
  id: string;
  title_ru: string;
  title_kz: string;
  title_en: string;
  description_ru: string;
  description_kz: string;
  description_en: string;
  category: string;
  price: string;
  status: string;
  image_url: string | null;
}

const emptyService: Omit<Service, 'id'> = {
  title_ru: '', title_kz: '', title_en: '',
  description_ru: '', description_kz: '', description_en: '',
  category: '', price: '', status: 'active', image_url: null,
};

const ServicesAdmin = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editItem, setEditItem] = useState<Partial<Service> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const fetchServices = async () => {
    const { data } = await supabase.from('services').select('*').order('created_at', { ascending: false });
    if (data) setServices(data as Service[]);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSave = async () => {
    if (!editItem) return;
    const { id, ...rest } = editItem as Service;
    let error;
    if (id) {
      ({ error } = await supabase.from('services').update(rest).eq('id', id));
    } else {
      ({ error } = await supabase.from('services').insert(rest));
    }
    if (error) {
      toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Сохранено' });
      setIsOpen(false);
      setEditItem(null);
      fetchServices();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    else fetchServices();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Управление услугами</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditItem({ ...emptyService })}><Plus className="mr-2 h-4 w-4" />Добавить</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader><DialogTitle>{editItem?.id ? 'Редактировать' : 'Добавить'} услугу</DialogTitle></DialogHeader>
            {editItem && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Название (RU)</label><Input value={editItem.title_ru || ''} onChange={(e) => setEditItem({ ...editItem, title_ru: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Название (KZ)</label><Input value={editItem.title_kz || ''} onChange={(e) => setEditItem({ ...editItem, title_kz: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Название (EN)</label><Input value={editItem.title_en || ''} onChange={(e) => setEditItem({ ...editItem, title_en: e.target.value })} /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Описание (RU)</label><Textarea value={editItem.description_ru || ''} onChange={(e) => setEditItem({ ...editItem, description_ru: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Описание (KZ)</label><Textarea value={editItem.description_kz || ''} onChange={(e) => setEditItem({ ...editItem, description_kz: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Описание (EN)</label><Textarea value={editItem.description_en || ''} onChange={(e) => setEditItem({ ...editItem, description_en: e.target.value })} /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Категория</label><Input value={editItem.category || ''} onChange={(e) => setEditItem({ ...editItem, category: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Цена</label><Input value={editItem.price || ''} onChange={(e) => setEditItem({ ...editItem, price: e.target.value })} /></div>
                  <div>
                    <label className="text-sm font-medium">Статус</label>
                    <Select value={editItem.status || 'active'} onValueChange={(v) => setEditItem({ ...editItem, status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Активна</SelectItem>
                        <SelectItem value="inactive">Неактивна</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleSave} className="w-full">Сохранить</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-3">
        {services.map((s) => (
          <Card key={s.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{s.title_ru}</span>
                  <Badge variant={s.status === 'active' ? 'default' : 'secondary'}>{s.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{s.category} · {s.price}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => { setEditItem(s); setIsOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {services.length === 0 && <p className="text-center text-muted-foreground py-8">Нет услуг. Добавьте первую!</p>}
      </div>
    </div>
  );
};

export default ServicesAdmin;

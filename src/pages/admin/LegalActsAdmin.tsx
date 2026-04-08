import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface LegalAct {
  id: string;
  title_ru: string;
  title_kz: string;
  title_en: string;
  document_number: string;
  adoption_date: string;
  document_url: string | null;
  status: string;
}

const emptyAct: Omit<LegalAct, 'id'> = {
  title_ru: '', title_kz: '', title_en: '',
  document_number: '',
  adoption_date: new Date().toISOString().split('T')[0],
  document_url: null,
  status: 'active',
};

const LegalActsAdmin = () => {
  const [acts, setActs] = useState<LegalAct[]>([]);
  const [editItem, setEditItem] = useState<Partial<LegalAct> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const fetchActs = async () => {
    const { data } = await supabase.from('legal_acts').select('*').order('adoption_date', { ascending: false });
    if (data) setActs(data as LegalAct[]);
  };

  useEffect(() => { fetchActs(); }, []);

  const handleSave = async () => {
    if (!editItem) return;
    const { id, ...rest } = editItem as LegalAct;
    let error;
    if (id) {
      ({ error } = await supabase.from('legal_acts').update(rest).eq('id', id));
    } else {
      ({ error } = await supabase.from('legal_acts').insert(rest));
    }
    if (error) toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Сохранено' }); setIsOpen(false); setEditItem(null); fetchActs(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('legal_acts').delete().eq('id', id);
    if (error) toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    else fetchActs();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Нормативно-правовые акты</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditItem({ ...emptyAct })}><Plus className="mr-2 h-4 w-4" />Добавить</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader><DialogTitle>{editItem?.id ? 'Редактировать' : 'Добавить'} акт</DialogTitle></DialogHeader>
            {editItem && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Название (RU)</label><Input value={editItem.title_ru || ''} onChange={(e) => setEditItem({ ...editItem, title_ru: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Название (KZ)</label><Input value={editItem.title_kz || ''} onChange={(e) => setEditItem({ ...editItem, title_kz: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Название (EN)</label><Input value={editItem.title_en || ''} onChange={(e) => setEditItem({ ...editItem, title_en: e.target.value })} /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Номер документа</label><Input value={editItem.document_number || ''} onChange={(e) => setEditItem({ ...editItem, document_number: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Дата принятия</label><Input type="date" value={editItem.adoption_date || ''} onChange={(e) => setEditItem({ ...editItem, adoption_date: e.target.value })} /></div>
                  <div>
                    <label className="text-sm font-medium">Статус</label>
                    <Select value={editItem.status || 'active'} onValueChange={(v) => setEditItem({ ...editItem, status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Активный</SelectItem>
                        <SelectItem value="inactive">Неактивный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><label className="text-sm font-medium">Ссылка на документ (необязательно)</label><Input value={editItem.document_url || ''} onChange={(e) => setEditItem({ ...editItem, document_url: e.target.value || null })} /></div>
                <Button onClick={handleSave} className="w-full">Сохранить</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-3">
        {acts.map((act) => (
          <Card key={act.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{act.title_ru}</span>
                  <Badge variant={act.status === 'active' ? 'default' : 'secondary'}>{act.status === 'active' ? 'Активный' : 'Неактивный'}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{act.document_number} · {act.adoption_date}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => { setEditItem(act); setIsOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(act.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {acts.length === 0 && <p className="text-center text-muted-foreground py-8">Нет актов. Добавьте первый!</p>}
      </div>
    </div>
  );
};

export default LegalActsAdmin;

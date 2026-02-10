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

interface Doctor {
  id: string;
  name_ru: string; name_kz: string; name_en: string;
  specialization_ru: string; specialization_kz: string; specialization_en: string;
  bio_ru: string; bio_kz: string; bio_en: string;
  education: string | null;
  experience_years: number;
  photo_url: string | null;
  status: string;
}

const emptyDoctor: Omit<Doctor, 'id'> = {
  name_ru: '', name_kz: '', name_en: '',
  specialization_ru: '', specialization_kz: '', specialization_en: '',
  bio_ru: '', bio_kz: '', bio_en: '',
  education: '', experience_years: 0, photo_url: null, status: 'active',
};

const DoctorsAdmin = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [editItem, setEditItem] = useState<Partial<Doctor> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const fetchDoctors = async () => {
    const { data } = await supabase.from('doctors').select('*').order('created_at', { ascending: false });
    if (data) setDoctors(data as Doctor[]);
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleSave = async () => {
    if (!editItem) return;
    const { id, ...rest } = editItem as Doctor;
    let error;
    if (id) {
      ({ error } = await supabase.from('doctors').update(rest).eq('id', id));
    } else {
      ({ error } = await supabase.from('doctors').insert(rest));
    }
    if (error) toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Сохранено' }); setIsOpen(false); setEditItem(null); fetchDoctors(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('doctors').delete().eq('id', id);
    if (error) toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    else fetchDoctors();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Управление врачами</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditItem({ ...emptyDoctor })}><Plus className="mr-2 h-4 w-4" />Добавить</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader><DialogTitle>{editItem?.id ? 'Редактировать' : 'Добавить'} врача</DialogTitle></DialogHeader>
            {editItem && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Имя (RU)</label><Input value={editItem.name_ru || ''} onChange={(e) => setEditItem({ ...editItem, name_ru: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Имя (KZ)</label><Input value={editItem.name_kz || ''} onChange={(e) => setEditItem({ ...editItem, name_kz: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Имя (EN)</label><Input value={editItem.name_en || ''} onChange={(e) => setEditItem({ ...editItem, name_en: e.target.value })} /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Специализация (RU)</label><Input value={editItem.specialization_ru || ''} onChange={(e) => setEditItem({ ...editItem, specialization_ru: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Специализация (KZ)</label><Input value={editItem.specialization_kz || ''} onChange={(e) => setEditItem({ ...editItem, specialization_kz: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Специализация (EN)</label><Input value={editItem.specialization_en || ''} onChange={(e) => setEditItem({ ...editItem, specialization_en: e.target.value })} /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Био (RU)</label><Textarea value={editItem.bio_ru || ''} onChange={(e) => setEditItem({ ...editItem, bio_ru: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Био (KZ)</label><Textarea value={editItem.bio_kz || ''} onChange={(e) => setEditItem({ ...editItem, bio_kz: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Био (EN)</label><Textarea value={editItem.bio_en || ''} onChange={(e) => setEditItem({ ...editItem, bio_en: e.target.value })} /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="text-sm font-medium">Образование</label><Input value={editItem.education || ''} onChange={(e) => setEditItem({ ...editItem, education: e.target.value })} /></div>
                  <div><label className="text-sm font-medium">Опыт (лет)</label><Input type="number" value={editItem.experience_years || 0} onChange={(e) => setEditItem({ ...editItem, experience_years: parseInt(e.target.value) || 0 })} /></div>
                  <div>
                    <label className="text-sm font-medium">Статус</label>
                    <Select value={editItem.status || 'active'} onValueChange={(v) => setEditItem({ ...editItem, status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Активен</SelectItem>
                        <SelectItem value="inactive">Неактивен</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><label className="text-sm font-medium">URL фото</label><Input value={editItem.photo_url || ''} onChange={(e) => setEditItem({ ...editItem, photo_url: e.target.value })} /></div>
                <Button onClick={handleSave} className="w-full">Сохранить</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-3">
        {doctors.map((d) => (
          <Card key={d.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                {d.photo_url && <img src={d.photo_url} alt="" className="h-12 w-12 rounded-full object-cover" />}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{d.name_ru}</span>
                    <Badge variant={d.status === 'active' ? 'default' : 'secondary'}>{d.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{d.specialization_ru} · {d.experience_years} лет</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => { setEditItem(d); setIsOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(d.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {doctors.length === 0 && <p className="text-center text-muted-foreground py-8">Нет врачей. Добавьте первого!</p>}
      </div>
    </div>
  );
};

export default DoctorsAdmin;

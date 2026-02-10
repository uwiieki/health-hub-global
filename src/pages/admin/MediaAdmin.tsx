import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2, Copy } from 'lucide-react';

interface FileItem {
  name: string;
  id: string;
  created_at: string;
}

const MediaAdmin = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchFiles = async () => {
    const { data } = await supabase.storage.from('media').list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
    if (data) setFiles(data as FileItem[]);
  };

  useEffect(() => { fetchFiles(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('media').upload(fileName, file);
    if (error) toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Загружено' }); fetchFiles(); }
    setUploading(false);
  };

  const getPublicUrl = (name: string) => {
    const { data } = supabase.storage.from('media').getPublicUrl(name);
    return data.publicUrl;
  };

  const handleCopyUrl = (name: string) => {
    navigator.clipboard.writeText(getPublicUrl(name));
    toast({ title: 'URL скопирован' });
  };

  const handleDelete = async (name: string) => {
    const { error } = await supabase.storage.from('media').remove([name]);
    if (error) toast({ title: 'Ошибка', description: error.message, variant: 'destructive' });
    else fetchFiles();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Медиа библиотека</h1>
        <div>
          <input ref={fileRef} type="file" className="hidden" onChange={handleUpload} accept="image/*" />
          <Button onClick={() => fileRef.current?.click()} disabled={uploading}>
            <Upload className="mr-2 h-4 w-4" />{uploading ? 'Загрузка...' : 'Загрузить'}
          </Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((f) => (
          <Card key={f.id}>
            <CardContent className="p-3">
              <img src={getPublicUrl(f.name)} alt={f.name} className="mb-2 aspect-video w-full rounded-md object-cover" />
              <p className="truncate text-sm font-medium">{f.name}</p>
              <div className="mt-2 flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleCopyUrl(f.name)}><Copy className="mr-1 h-3 w-3" />URL</Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(f.name)}><Trash2 className="mr-1 h-3 w-3 text-destructive" />Удалить</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {files.length === 0 && <p className="col-span-full text-center text-muted-foreground py-8">Нет файлов</p>}
      </div>
    </div>
  );
};

export default MediaAdmin;

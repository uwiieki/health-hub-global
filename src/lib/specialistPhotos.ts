import p1 from '@/assets/specialist-1.jpg';
import p2 from '@/assets/specialist-2.jpg';
import p3 from '@/assets/specialist-3.jpg';
import p4 from '@/assets/specialist-4.jpg';

const photos = [p1, p2, p3, p4];

export function getSpecialistPhoto(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return photos[hash % photos.length];
}
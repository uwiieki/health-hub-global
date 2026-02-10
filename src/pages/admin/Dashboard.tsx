import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, Users, Newspaper } from 'lucide-react';

const Dashboard = () => {
  const [counts, setCounts] = useState({ services: 0, doctors: 0, news: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const [s, d, n] = await Promise.all([
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('doctors').select('id', { count: 'exact', head: true }),
        supabase.from('news').select('id', { count: 'exact', head: true }),
      ]);
      setCounts({
        services: s.count || 0,
        doctors: d.count || 0,
        news: n.count || 0,
      });
    };
    fetchCounts();
  }, []);

  const stats = [
    { label: 'Услуги', count: counts.services, icon: Stethoscope },
    { label: 'Врачи', count: counts.doctors, icon: Users },
    { label: 'Новости', count: counts.news, icon: Newspaper },
  ];

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Панель управления</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{s.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Stethoscope, Users, Newspaper, LogOut, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Панель', icon: LayoutDashboard },
  { href: '/admin/services', label: 'Услуги', icon: Stethoscope },
  { href: '/admin/doctors', label: 'Врачи', icon: Users },
  { href: '/admin/news', label: 'Новости', icon: Newspaper },
  { href: '/admin/media', label: 'Медиа', icon: Image },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) return <div className="flex min-h-screen items-center justify-center">Загрузка...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen bg-secondary/30">
      <aside className="hidden w-64 border-r border-border bg-background p-6 md:block">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero">
            <span className="text-lg font-bold text-primary-foreground">M</span>
          </div>
          <span className="font-display text-lg font-semibold">Admin</span>
        </Link>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                location.pathname === item.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={signOut}>
            <LogOut className="h-5 w-5" />
            Выйти
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

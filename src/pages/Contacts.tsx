import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const Contacts = () => {
  const { t } = useLanguage();
  const contactInfo = [
    { icon: MapPin, labelKey: 'contact.address', value: t('contact.address.value') },
    { icon: Phone, labelKey: 'contact.phone', value: '+7 (777) 123-45-67', href: 'tel:+77771234567' },
    { icon: Mail, labelKey: 'contact.email', value: 'csm.aktobe@yandex.kz', href: 'mailto:csm.aktobe@yandex.kz' },
    { icon: Clock, labelKey: 'contact.hours', value: t('contact.hours.value') },
  ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contact.toast.title'),
      description: t('contact.toast.desc'),
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              {t('contact.title')}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Info & Map */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {contactInfo.map((item, index) => (
                  <Card key={index} className="border-border/50 bg-card">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {t(item.labelKey)}
                        </p>
                        {item.href ? (
                          <a href={item.href} className="text-foreground hover:text-primary transition-colors font-medium">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{item.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map */}
              <Card className="overflow-hidden border-border/50">
                <div className="aspect-video bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.509089453886!2d76.9286!3d43.2389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE0JzIwLjAiTiA3NsKwNTUnNDMuMCJF!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  />
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-border/50 bg-card">
              <CardContent className="p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  {t('contact.form.message')}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                      {t('contact.form.name')}
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                        {t('contact.form.email')}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                        {t('contact.form.phone')}
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                      {t('contact.form.message')}
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="bg-background resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2 bg-gradient-hero hover:opacity-90">
                    <Send className="h-5 w-5" />
                    {t('contact.form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;

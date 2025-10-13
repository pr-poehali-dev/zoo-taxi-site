import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  contacts: {
    phone: string;
    telegram: string;
    whatsapp: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ contacts }) => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Безопасные поездки для ваших питомцев
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Профессиональный сервис перевозки животных с комфортными автомобилями 
              и опытными водителями. Работаем круглосуточно.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="animate-scale-in" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="Phone" size={20} className="mr-2" />
                Заказать сейчас
              </Button>
              <Button 
                size="lg" 
                className="animate-scale-in bg-green-500 hover:bg-green-600 text-white"
                onClick={() => window.open(`https://wa.me/${contacts.whatsapp}?text=Здравствуйте! Хочу заказать зоотакси для моего питомца`, '_blank')}
              >
                <Icon name="MessageCircle" size={20} className="mr-2" />
                WhatsApp
              </Button>
              <Button 
                size="lg" 
                className="animate-scale-in bg-[#0088cc] hover:bg-[#0077b5] text-white"
                onClick={() => window.open(`https://t.me/${contacts.telegram}?text=Здравствуйте! Хочу заказать зоотакси для моего питомца`, '_blank')}
              >
                <Icon name="Send" size={20} className="mr-2" />
                Telegram
              </Button>
            </div>
          </div>
          
          <div className="animate-fade-in lg:animate-slide-up">
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">Быстрый заказ</CardTitle>
                <CardDescription>Заполните форму и мы перезвоним в течение 15 минут</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quick-pet">Питомец</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cat">Кошка</SelectItem>
                        <SelectItem value="dog">Собака</SelectItem>
                        <SelectItem value="bird">Птица</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quick-size">Размер</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Маленький</SelectItem>
                        <SelectItem value="medium">Средний</SelectItem>
                        <SelectItem value="large">Крупный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="quick-from">Откуда</Label>
                  <Input 
                    id="quick-from"
                    placeholder="Адрес подачи"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label htmlFor="quick-to">Куда</Label>
                  <Input 
                    id="quick-to"
                    placeholder="Адрес назначения"
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quick-date">Дата</Label>
                    <Input 
                      id="quick-date"
                      type="date"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quick-time">Время</Label>
                    <Input 
                      id="quick-time"
                      type="time"
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="quick-phone">Телефон</Label>
                  <Input 
                    id="quick-phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    className="w-full"
                  />
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => alert('Заявка отправлена! Мы перезвоним в течение 5 минут.')}
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Заказать поездку
                </Button>
                
                <p className="text-sm text-center text-gray-500">
                  Или звоните: <a href="tel:+79685227272" className="text-primary font-semibold">+7 (968) 522-72-72</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16 animate-slide-up text-center">
          <img
            src="/img/f3f0bbce-15c9-47b5-8bd8-1deeae4b98a2.jpg"
            alt="Зоотакси - безопасная перевозка питомцев"
            className="rounded-lg shadow-2xl mx-auto max-w-4xl w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

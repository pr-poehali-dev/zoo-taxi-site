import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import PriceCalculator from '@/components/PriceCalculator';

interface BookingForm {
  petType: string;
  petName: string;
  pickupAddress: string;
  dropoffAddress: string;
  date: string;
  time: string;
  phone: string;
  notes: string;
}

const Index = () => {
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    petType: '',
    petName: '',
    pickupAddress: '',
    dropoffAddress: '',
    date: '',
    time: '',
    phone: '',
    notes: ''
  });

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', bookingForm);
    alert('Заявка отправлена! Мы свяжемся с вами в течение 10 минут.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Car" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-primary">ЗооТакси</h1>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
              <a href="#pricing" className="hover:text-primary transition-colors">Стоимость</a>
              <a href="#booking" className="hover:text-primary transition-colors">Заказать</a>
              <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
            </div>
            <Button className="md:hidden">
              <Icon name="Menu" size={20} />
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Безопасные поездки для ваших питомцев
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Профессиональный сервис перевозки животных с комфортными автомобилями 
              и опытными водителями. Работаем круглосуточно.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="animate-scale-in" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="Phone" size={20} className="mr-2" />
                Заказать сейчас
              </Button>
              <Button variant="outline" size="lg" className="animate-scale-in">
                <Icon name="Play" size={20} className="mr-2" />
                Как это работает
              </Button>
            </div>
          </div>
          <div className="mt-12 animate-slide-up">
            <img
              src="/img/a2ad5d94-ce72-4edc-aa65-294ee1d96c14.jpg"
              alt="Зоотакси - безопасная перевозка питомцев"
              className="rounded-lg shadow-2xl mx-auto max-w-4xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Наши услуги</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader>
                <Icon name="Heart" className="text-primary mb-4" size={48} />
                <CardTitle>Ветеринарные поездки</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Доставка к ветеринару с комфортом и минимальным стрессом для питомца</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader>
                <Icon name="Home" className="text-primary mb-4" size={48} />
                <CardTitle>Переезды</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Безопасная перевозка при переезде или временном размещении</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader>
                <Icon name="Plane" className="text-primary mb-4" size={48} />
                <CardTitle>Аэропорт</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Доставка в аэропорт и встреча с соблюдением всех требований</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Рассчитать стоимость</h3>
          
          {/* Price Calculator */}
          <div className="flex justify-center">
            <PriceCalculator />
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-2xl">
          <h3 className="text-3xl font-bold text-center mb-12">Заказать поездку</h3>
          <Card>
            <CardHeader>
              <CardTitle>Форма заказа</CardTitle>
              <CardDescription>
                Заполните форму и мы свяжемся с вами в течение 10 минут
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="petType">Тип питомца</Label>
                    <Select onValueChange={(value) => handleInputChange('petType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">Собака</SelectItem>
                        <SelectItem value="cat">Кот/Кошка</SelectItem>
                        <SelectItem value="bird">Птица</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="petName">Кличка питомца</Label>
                    <Input
                      id="petName"
                      value={bookingForm.petName}
                      onChange={(e) => handleInputChange('petName', e.target.value)}
                      placeholder="Как зовут питомца"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="pickupAddress">Адрес подачи</Label>
                  <Input
                    id="pickupAddress"
                    value={bookingForm.pickupAddress}
                    onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                    placeholder="Откуда забрать питомца"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dropoffAddress">Адрес назначения</Label>
                  <Input
                    id="dropoffAddress"
                    value={bookingForm.dropoffAddress}
                    onChange={(e) => handleInputChange('dropoffAddress', e.target.value)}
                    placeholder="Куда доставить питомца"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Дата</Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Время</Label>
                    <Select onValueChange={(value) => handleInputChange('time', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите время" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00</SelectItem>
                        <SelectItem value="10:00">10:00</SelectItem>
                        <SelectItem value="11:00">11:00</SelectItem>
                        <SelectItem value="12:00">12:00</SelectItem>
                        <SelectItem value="13:00">13:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="16:00">16:00</SelectItem>
                        <SelectItem value="17:00">17:00</SelectItem>
                        <SelectItem value="18:00">18:00</SelectItem>
                        <SelectItem value="asap">Как можно скорее</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Дополнительные пожелания</Label>
                  <Textarea
                    id="notes"
                    value={bookingForm.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Особенности характера питомца, специальные требования..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Контакты</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <Icon name="Phone" className="text-primary mb-4 mx-auto" size={48} />
              <h4 className="text-xl font-semibold mb-2">Телефон</h4>
              <p className="text-gray-600">+7 (495) 123-45-67</p>
              <p className="text-sm text-gray-500">Круглосуточно</p>
            </div>
            <div className="animate-fade-in">
              <Icon name="Mail" className="text-primary mb-4 mx-auto" size={48} />
              <h4 className="text-xl font-semibold mb-2">Email</h4>
              <p className="text-gray-600">info@zootaxi.ru</p>
              <p className="text-sm text-gray-500">Ответим в течение часа</p>
            </div>
            <div className="animate-fade-in">
              <Icon name="MapPin" className="text-primary mb-4 mx-auto" size={48} />
              <h4 className="text-xl font-semibold mb-2">Работаем</h4>
              <p className="text-gray-600">По всей Москве и области</p>
              <p className="text-sm text-gray-500">Выезд в любую точку</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Car" className="text-primary" size={32} />
            <h5 className="text-2xl font-bold">ЗооТакси</h5>
          </div>
          <p className="text-gray-400 mb-4">Безопасные поездки для ваших питомцев</p>
          <div className="flex justify-center space-x-6">
            <a href="tel:+74951234567" className="hover:text-primary transition-colors">
              <Icon name="Phone" size={20} />
            </a>
            <a href="mailto:info@zootaxi.ru" className="hover:text-primary transition-colors">
              <Icon name="Mail" size={20} />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Icon name="MessageCircle" size={20} />
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-sm text-gray-400">
            © 2024 ЗооТакси. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
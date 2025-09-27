import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import PriceCalculator from '@/components/PriceCalculator';
import WhatsAppButton from '@/components/WhatsAppButton';
import OrderForm from '@/components/OrderForm';

const Index = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Car" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold text-primary">ЗооТакси УЮТ</h1>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
              <a href="#pricing" className="hover:text-primary transition-colors">Стоимость</a>

              <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
              <a href="#booking" className="hover:text-primary transition-colors">Заказать</a>
              <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/admin'}
                className="hidden sm:flex"
              >
                <Icon name="Settings" size={16} className="mr-1" />
                Админ
              </Button>
              <Button className="md:hidden">
                <Icon name="Menu" size={20} />
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
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
                  onClick={() => window.open('https://wa.me/79685227272?text=Здравствуйте! Хочу заказать зоотакси для моего питомца', '_blank')}
                >
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
            
            {/* Quick Order Form */}
            <div className="animate-fade-in lg:animate-slide-up">
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-primary">Быстрый заказ</CardTitle>
                  <CardDescription>Заполните форму и мы перезвоним в течение 5 минут</CardDescription>
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

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Как мы перевозим ваших питомцев</h3>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Каждое животное путешествует в комфортных и безопасных условиях, подходящих именно для его размера и характера
          </p>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src="/img/3b3afc5d-3b86-4e79-b119-1bc6b8f326a6.jpg"
                  alt="Собака, кошка и кролик в багажнике автомобиля"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h4 className="font-semibold text-xl mb-4">Индивидуальный подход к каждому питомцу</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Icon name="Dog" className="text-primary mx-auto mb-2" size={32} />
                    <h5 className="font-semibold mb-2">Собаки</h5>
                    <p className="text-gray-600 text-sm">Крупные собаки путешествуют свободно в просторном багажнике с нескользящим покрытием</p>
                  </div>
                  <div className="text-center">
                    <Icon name="Cat" className="text-primary mx-auto mb-2" size={32} />
                    <p className="font-semibold mb-2">Кошки</p>
                    <p className="text-gray-600 text-sm">В удобных переносках с хорошей вентиляцией для снижения стресса</p>
                  </div>
                  <div className="text-center">
                    <Icon name="Rabbit" className="text-primary mx-auto mb-2" size={32} />
                    <p className="font-semibold mb-2">Мелкие питомцы</p>
                    <p className="text-gray-600 text-sm">Кролики, птицы и хорьки в специальных переносках с мягкой подстилкой</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Icon name="Thermometer" className="text-primary mx-auto mb-2" size={32} />
                <p className="font-semibold text-sm">Климат-контроль</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Icon name="Shield" className="text-primary mx-auto mb-2" size={32} />
                <p className="font-semibold text-sm">Безопасность</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Icon name="Heart" className="text-primary mx-auto mb-2" size={32} />
                <p className="font-semibold text-sm">Забота о питомцах</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Icon name="CheckCircle" className="text-primary mx-auto mb-2" size={32} />
                <p className="font-semibold text-sm">Проверенное оборудование</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" className="text-primary" size={32} />
              </div>
              <h4 className="text-lg font-semibold mb-2">Безопасность</h4>
              <p className="text-gray-600">Специально оборудованные автомобили с переносками и защитными барьерами</p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" className="text-primary" size={32} />
              </div>
              <h4 className="text-lg font-semibold mb-2">Круглосуточно</h4>
              <p className="text-gray-600">Работаем 24/7, включая выходные и праздники. Подача в течение 30 минут</p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="UserCheck" className="text-primary" size={32} />
              </div>
              <h4 className="text-lg font-semibold mb-2">Опыт</h4>
              <p className="text-gray-600">Водители с опытом работы с животными и специальной подготовкой</p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Thermometer" className="text-primary" size={32} />
              </div>
              <h4 className="text-lg font-semibold mb-2">Комфорт</h4>
              <p className="text-gray-600">Климат-контроль, мягкие переноски и минимум стресса для питомца</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Отзывы клиентов</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Отличный сервис! Водитель приехал точно в назначенное время, кот Мурзик перенес поездку к ветеринару без стресса. Обязательно буду пользоваться еще!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <Icon name="User" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Анна К.</p>
                    <p className="text-sm text-gray-500">Владелец кота</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Переезжали с собакой из одного конца города в другой. Все прошло идеально - собака была спокойна, водитель помог с переноской. Цены честные!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <Icon name="User" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Михаил Д.</p>
                    <p className="text-sm text-gray-500">Владелец собаки</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Срочно нужно было доставить кролика в ветклинику ночью. Приехали через 20 минут! Профессиональный подход и забота о животном на высоте."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <Icon name="User" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold">Елена С.</p>
                    <p className="text-sm text-gray-500">Владелец кролика</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-primary/10 inline-block px-6 py-3 rounded-lg">
              <p className="text-primary font-semibold">
                <Icon name="Star" className="inline mr-2" size={20} />
                4.9/5 - средняя оценка (более 1000 поездок)
              </p>
            </div>
          </div>

          {/* Add Review Form */}
          <div className="mt-16 max-w-2xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">Оставить отзыв</CardTitle>
                <CardDescription>Поделитесь своим опытом использования зоотакси</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="review-name">Ваше имя</Label>
                    <Input 
                      id="review-name"
                      placeholder="Как к вам обращаться?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="review-pet">Питомец</Label>
                    <Input 
                      id="review-pet"
                      placeholder="Кличка и тип питомца"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Оценка</Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon 
                        key={star}
                        name="Star" 
                        className="cursor-pointer text-gray-300 hover:text-yellow-400 transition-colors" 
                        size={24}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="review-text">Ваш отзыв</Label>
                  <Textarea 
                    id="review-text"
                    placeholder="Расскажите о вашем опыте поездки с питомцем..."
                    rows={4}
                  />
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => alert('Спасибо за отзыв! Мы опубликуем его после модерации.')}
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить отзыв
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Заказать поездку</h3>
          <OrderForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-3xl font-bold text-center mb-12">Частые вопросы</h3>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Какие животные могут пользоваться зоотакси?
              </AccordionTrigger>
              <AccordionContent>
                Мы перевозим собак, кошек, птиц, грызунов и других домашних животных. 
                Для крупных или экзотических животных уточните возможность перевозки по телефону.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Нужна ли переноска для питомца?
              </AccordionTrigger>
              <AccordionContent>
                У нас есть переноски разных размеров в каждом автомобиле. Вы можете использовать 
                свою переноску или воспользоваться нашей бесплатно.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Как быстро подается автомобиль?
              </AccordionTrigger>
              <AccordionContent>
                Обычная подача - в течение 30 минут. За доплату 50% можем подать автомобиль 
                в течение 15 минут (опция "срочная подача").
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Могу ли я ехать вместе с питомцем?
              </AccordionTrigger>
              <AccordionContent>
                Конечно! Вы можете сопровождать своего питомца во время поездки. 
                Это часто помогает животному чувствовать себя спокойнее.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Какие способы оплаты принимаются?
              </AccordionTrigger>
              <AccordionContent>
                Принимаем наличные, банковские карты и переводы через СБП. 
                Оплата производится после завершения поездки.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Что делать, если питомец заболел в дороге?
              </AccordionTrigger>
              <AccordionContent>
                Наши водители прошли базовую подготовку по оказанию первой помощи животным. 
                В экстренных случаях мы можем изменить маршрут к ближайшей ветклинике.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Работаете ли вы в праздники и выходные?
              </AccordionTrigger>
              <AccordionContent>
                Да, мы работаем круглосуточно 7 дней в неделю, включая все праздники. 
                В выходные действует доплата 20%.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Можно ли отменить заказ?
              </AccordionTrigger>
              <AccordionContent>
                Заказ можно отменить бесплатно до момента подачи автомобиля. 
                После подачи взимается 50% от стоимости базового тарифа.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
              <p className="text-gray-600">+7 (968) 522-72-72</p>
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
            <h5 className="text-2xl font-bold">ЗооТакси УЮТ</h5>
          </div>
          <p className="text-gray-400 mb-4">Безопасные поездки для ваших питомцев</p>
          <div className="flex justify-center space-x-6">
            <a href="tel:+79685227272" className="hover:text-primary transition-colors">
              <Icon name="Phone" size={20} />
            </a>
            <a href="mailto:info@zootaxi.ru" className="hover:text-primary transition-colors">
              <Icon name="Mail" size={20} />
            </a>
            <a 
              href="https://wa.me/79685227272?text=Здравствуйте! Хочу заказать зоотакси для моего питомца" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Icon name="MessageCircle" size={20} />
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-sm text-gray-400">
            © 2024 ЗооТакси УЮТ. Все права защищены.
          </div>
        </div>
      </footer>
      
      <WhatsAppButton />
    </div>
  );
};

export default Index;
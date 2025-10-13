import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ServicesSection = () => {
  return (
    <section id="services" className="py-12 md:py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Наши услуги</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          <Card className="hover:shadow-lg transition-shadow animate-fade-in">
            <CardHeader className="pb-3">
              <Icon name="Heart" className="text-primary mb-3" size={40} />
              <CardTitle className="text-xl">Ветеринарные поездки</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base">Доставка к ветеринару с комфортом и минимальным стрессом для питомца</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow animate-fade-in">
            <CardHeader className="pb-3">
              <Icon name="Home" className="text-primary mb-3" size={40} />
              <CardTitle className="text-xl">Переезды</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base">Безопасная перевозка при переезде или временном размещении</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow animate-fade-in sm:col-span-2 md:col-span-1">
            <CardHeader className="pb-3">
              <Icon name="Plane" className="text-primary mb-3" size={40} />
              <CardTitle className="text-xl">Аэропорт</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base">Доставка в аэропорт и встреча с соблюдением всех требований</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
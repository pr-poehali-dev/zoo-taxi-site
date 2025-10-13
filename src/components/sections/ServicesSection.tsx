import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ServicesSection = () => {
  return (
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
  );
};

export default ServicesSection;

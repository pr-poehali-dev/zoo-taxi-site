import React from 'react';
import { Button } from '@/components/ui/button';
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
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Безопасные поездки для ваших питомцев
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Профессиональный сервис перевозки животных с комфортными автомобилями 
            и опытными водителями. Работаем круглосуточно.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
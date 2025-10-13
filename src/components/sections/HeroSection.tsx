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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/img/f3f0bbce-15c9-47b5-8bd8-1deeae4b98a2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            Безопасные поездки для ваших питомцев
          </h2>
          <p className="text-xl md:text-2xl text-white/95 mb-12 drop-shadow-lg">
            Профессиональный сервис перевозки животных с комфортными автомобилями 
            и опытными водителями. Работаем круглосуточно.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="animate-scale-in text-lg px-8 py-6 shadow-2xl hover:scale-105 transition-transform" 
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Phone" size={24} className="mr-2" />
              Заказать сейчас
            </Button>
            <Button 
              size="lg" 
              className="animate-scale-in bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6 shadow-2xl hover:scale-105 transition-transform"
              onClick={() => window.open(`https://wa.me/${contacts.whatsapp}?text=Здравствуйте! Хочу заказать зоотакси для моего питомца`, '_blank')}
            >
              <Icon name="MessageCircle" size={24} className="mr-2" />
              WhatsApp
            </Button>
            <Button 
              size="lg" 
              className="animate-scale-in bg-[#0088cc] hover:bg-[#0077b5] text-white text-lg px-8 py-6 shadow-2xl hover:scale-105 transition-transform"
              onClick={() => window.open(`https://t.me/${contacts.telegram}?text=Здравствуйте! Хочу заказать зоотакси для моего питомца`, '_blank')}
            >
              <Icon name="Send" size={24} className="mr-2" />
              Telegram
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <Icon name="ChevronDown" size={40} className="text-white/70" />
      </div>
    </section>
  );
};

export default HeroSection;
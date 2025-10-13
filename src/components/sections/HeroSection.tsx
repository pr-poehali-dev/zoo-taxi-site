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
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
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
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl leading-tight">
            Безопасные поездки для ваших питомцев
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 md:mb-12 drop-shadow-lg px-4">
            Профессиональный сервис перевозки животных с комфортными автомобилями 
            и опытными водителями. Работаем круглосуточно.
          </p>
          <div className="flex flex-col gap-3 max-w-md mx-auto px-4">
            <Button 
              size="lg" 
              className="animate-scale-in text-base md:text-lg w-full py-5 md:py-6 shadow-2xl hover:scale-[1.02] active:scale-95 transition-transform rounded-xl font-semibold" 
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Phone" size={20} className="mr-2" />
              Заказать сейчас
            </Button>
            <div className="flex gap-3">
              <Button 
                size="lg" 
                className="animate-scale-in bg-green-500 hover:bg-green-600 text-white text-sm md:text-base flex-1 py-4 md:py-5 shadow-xl hover:scale-[1.02] active:scale-95 transition-transform rounded-xl font-semibold"
                onClick={() => window.open(`https://wa.me/${contacts.whatsapp}?text=Здравствуйте! Хочу заказать зоотакси для моего питомца`, '_blank')}
              >
                <Icon name="MessageCircle" size={20} className="mr-1.5" />
                WhatsApp
              </Button>
              <Button 
                size="lg" 
                className="animate-scale-in bg-[#0088cc] hover:bg-[#0077b5] text-white text-sm md:text-base flex-1 py-4 md:py-5 shadow-xl hover:scale-[1.02] active:scale-95 transition-transform rounded-xl font-semibold"
                onClick={() => window.open(`https://t.me/${contacts.telegram}?text=Здравствуйте! Хочу заказать зоотакси для моего питомца`, '_blank')}
              >
                <Icon name="Send" size={20} className="mr-1.5" />
                Telegram
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <Icon name="ChevronDown" size={32} className="text-white/70 md:w-10 md:h-10" />
      </div>
    </section>
  );
};

export default HeroSection;
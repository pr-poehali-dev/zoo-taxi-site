import React from 'react';
import Icon from '@/components/ui/icon';

interface FooterProps {
  contacts: {
    phone: string;
    telegram: string;
    whatsapp: string;
  };
}

const Footer: React.FC<FooterProps> = ({ contacts }) => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Icon name="Car" className="text-primary" size={32} />
          <h5 className="text-2xl font-bold">ЗооТакси УЮТ</h5>
        </div>
        <p className="text-gray-400 mb-4">Безопасные поездки для ваших питомцев</p>
        <div className="flex justify-center space-x-6">
          <a href={`tel:+${contacts.phone}`} className="hover:text-primary transition-colors" title="Позвонить">
            <Icon name="Phone" size={20} />
          </a>
          <a href="mailto:info@zootaxi.ru" className="hover:text-primary transition-colors" title="Написать email">
            <Icon name="Mail" size={20} />
          </a>
          <a 
            href={`https://wa.me/${contacts.whatsapp}?text=Здравствуйте! Хочу заказать зоотакси для моего питомца`}
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            title="WhatsApp"
          >
            <Icon name="MessageCircle" size={20} />
          </a>
          <a 
            href={`https://t.me/${contacts.telegram}?text=Здравствуйте! Хочу заказать зоотакси для моего питомца`}
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            title="Telegram"
          >
            <Icon name="Send" size={20} />
          </a>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700 text-sm text-gray-400">
          © 2024 ЗооТакси УЮТ. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

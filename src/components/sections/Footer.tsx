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
    <footer className="bg-gray-900 text-white py-8 px-4 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='150' viewBox='0 0 200 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6'%3E%3Cg transform='rotate(-15 35 45)'%3E%3Cellipse cx='28' cy='30' rx='5' ry='7.5' /%3E%3Cellipse cx='40' cy='31' rx='5.5' ry='8' /%3E%3Cellipse cx='23' cy='42' rx='4' ry='6' /%3E%3Cellipse cx='45' cy='43' rx='4.5' ry='6.5' /%3E%3Cpath d='M 26 48 Q 30 47 34 47 Q 38 47 42 49 Q 43 54 39 57 Q 34 60 29 57 Q 25 54 26 48 Z' /%3E%3C/g%3E%3Cg transform='rotate(10 120 50)'%3E%3Cellipse cx='110' cy='38' rx='3.5' ry='5' /%3E%3Cellipse cx='118' cy='39' rx='3.8' ry='5.5' /%3E%3Cellipse cx='126' cy='38' rx='3.5' ry='5' /%3E%3Cellipse cx='134' cy='39' rx='3.8' ry='5.5' /%3E%3Cpath d='M 112 46 Q 122 44 132 46 Q 133 50 128 53 Q 122 56 116 53 Q 111 50 112 46 Z' /%3E%3C/g%3E%3Cg transform='rotate(-20 55 105)'%3E%3Cellipse cx='48' cy='95' rx='4.5' ry='6.5' /%3E%3Cellipse cx='58' cy='96' rx='5' ry='7' /%3E%3Cellipse cx='43' cy='106' rx='3.8' ry='5.5' /%3E%3Cellipse cx='63' cy='107' rx='4.2' ry='6' /%3E%3Cpath d='M 45 112 Q 49 111 53 111 Q 57 111 61 113 Q 62 117 58 120 Q 53 123 48 120 Q 44 117 45 112 Z' /%3E%3C/g%3E%3Cg transform='rotate(8 155 95)'%3E%3Cellipse cx='148' cy='85' rx='3.2' ry='4.5' /%3E%3Cellipse cx='155' cy='86' rx='3.5' ry='5' /%3E%3Cellipse cx='162' cy='85' rx='3.2' ry='4.5' /%3E%3Cellipse cx='169' cy='86' rx='3.5' ry='5' /%3E%3Cpath d='M 150 92 Q 158.5 90.5 167 92 Q 168 96 163.5 98.5 Q 158.5 101 153 98.5 Q 149 96 150 92 Z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '200px 150px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      <div className="container mx-auto text-center relative z-10">
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

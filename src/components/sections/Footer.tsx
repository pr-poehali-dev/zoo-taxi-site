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
        className="absolute inset-0 opacity-8 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='120' viewBox='0 0 200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='1'%3E%3Cg transform='rotate(-15 30 30)'%3E%3Cellipse cx='28' cy='18' rx='4.5' ry='6' /%3E%3Cellipse cx='18' cy='28' rx='3.5' ry='4.5' /%3E%3Cellipse cx='24' cy='30' rx='3' ry='4' /%3E%3Cellipse cx='30' cy='29' rx='3.5' ry='4.5' /%3E%3Cellipse cx='36' cy='27' rx='3' ry='4' /%3E%3Cellipse cx='28' cy='38' rx='7' ry='8' /%3E%3C/g%3E%3Cg transform='rotate(20 85 45)'%3E%3Cellipse cx='82' cy='35' rx='5' ry='6.5' /%3E%3Cellipse cx='72' cy='46' rx='4' ry='5' /%3E%3Cellipse cx='79' cy='48' rx='3.5' ry='4.5' /%3E%3Cellipse cx='86' cy='47' rx='4' ry='5' /%3E%3Cellipse cx='93' cy='44' rx='3.5' ry='4.5' /%3E%3Cellipse cx='82' cy='56' rx='8' ry='9' /%3E%3C/g%3E%3Cg transform='rotate(-25 150 25)'%3E%3Cellipse cx='148' cy='15' rx='3.5' ry='5' /%3E%3Cellipse cx='142' cy='23' rx='2.5' ry='3.5' /%3E%3Cellipse cx='147' cy='25' rx='2.5' ry='3.5' /%3E%3Cellipse cx='152' cy='24' rx='2.5' ry='3.5' /%3E%3Cellipse cx='148' cy='31' rx='5' ry='6' /%3E%3C/g%3E%3Cg transform='rotate(18 35 85)'%3E%3Cellipse cx='32' cy='75' rx='4' ry='5.5' /%3E%3Cellipse cx='26' cy='83' rx='3' ry='4' /%3E%3Cellipse cx='31' cy='85' rx='3' ry='4' /%3E%3Cellipse cx='36' cy='84' rx='3' ry='4' /%3E%3Cellipse cx='32' cy='92' rx='6' ry='7' /%3E%3C/g%3E%3Cg transform='rotate(-12 165 75)'%3E%3Cellipse cx='162' cy='65' rx='5.5' ry='7' /%3E%3Cellipse cx='152' cy='76' rx='4.5' ry='5.5' /%3E%3Cellipse cx='159' cy='78' rx='4' ry='5' /%3E%3Cellipse cx='166' cy='77' rx='4.5' ry='5.5' /%3E%3Cellipse cx='173' cy='74' rx='4' ry='5' /%3E%3Cellipse cx='162' cy='86' rx='8.5' ry='9.5' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '200px 120px',
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
import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-12 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='120' viewBox='0 0 200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='1'%3E%3Cg transform='rotate(-15 30 30)'%3E%3Cellipse cx='28' cy='18' rx='4.5' ry='6' /%3E%3Cellipse cx='18' cy='28' rx='3.5' ry='4.5' /%3E%3Cellipse cx='24' cy='30' rx='3' ry='4' /%3E%3Cellipse cx='30' cy='29' rx='3.5' ry='4.5' /%3E%3Cellipse cx='36' cy='27' rx='3' ry='4' /%3E%3Cellipse cx='28' cy='38' rx='7' ry='8' /%3E%3C/g%3E%3Cg transform='rotate(20 85 45)'%3E%3Cellipse cx='82' cy='35' rx='5' ry='6.5' /%3E%3Cellipse cx='72' cy='46' rx='4' ry='5' /%3E%3Cellipse cx='79' cy='48' rx='3.5' ry='4.5' /%3E%3Cellipse cx='86' cy='47' rx='4' ry='5' /%3E%3Cellipse cx='93' cy='44' rx='3.5' ry='4.5' /%3E%3Cellipse cx='82' cy='56' rx='8' ry='9' /%3E%3C/g%3E%3Cg transform='rotate(-25 150 25)'%3E%3Cellipse cx='148' cy='15' rx='3.5' ry='5' /%3E%3Cellipse cx='142' cy='23' rx='2.5' ry='3.5' /%3E%3Cellipse cx='147' cy='25' rx='2.5' ry='3.5' /%3E%3Cellipse cx='152' cy='24' rx='2.5' ry='3.5' /%3E%3Cellipse cx='148' cy='31' rx='5' ry='6' /%3E%3C/g%3E%3Cg transform='rotate(18 35 85)'%3E%3Cellipse cx='32' cy='75' rx='4' ry='5.5' /%3E%3Cellipse cx='26' cy='83' rx='3' ry='4' /%3E%3Cellipse cx='31' cy='85' rx='3' ry='4' /%3E%3Cellipse cx='36' cy='84' rx='3' ry='4' /%3E%3Cellipse cx='32' cy='92' rx='6' ry='7' /%3E%3C/g%3E%3Cg transform='rotate(-12 165 75)'%3E%3Cellipse cx='162' cy='65' rx='5.5' ry='7' /%3E%3Cellipse cx='152' cy='76' rx='4.5' ry='5.5' /%3E%3Cellipse cx='159' cy='78' rx='4' ry='5' /%3E%3Cellipse cx='166' cy='77' rx='4.5' ry='5.5' /%3E%3Cellipse cx='173' cy='74' rx='4' ry='5' /%3E%3Cellipse cx='162' cy='86' rx='8.5' ry='9.5' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '200px 120px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      <div className="container mx-auto px-4 py-4 relative z-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Car" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold text-primary">ЗооТакси УЮТ</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
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
  );
};

export default Header;
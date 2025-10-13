import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='100' viewBox='0 0 180 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='blur'%3E%3CfeGaussianBlur in='SourceGraphic' stdDeviation='0.5'/%3E%3C/filter%3E%3C/defs%3E%3Cg fill='%233b82f6' filter='url(%23blur)'%3E%3Cg transform='rotate(-8 30 35)'%3E%3Cellipse cx='26' cy='22' rx='2.8' ry='3.5' /%3E%3Cellipse cx='32' cy='23' rx='2.5' ry='3.2' /%3E%3Cellipse cx='22' cy='28' rx='2.3' ry='3' /%3E%3Cellipse cx='28' cy='29.5' rx='2.2' ry='2.8' /%3E%3Cellipse cx='34' cy='29' rx='2.4' ry='3.1' /%3E%3Cpath d='M 24 32 Q 26 31.5 28 31.5 Q 30 31.5 32 32 Q 32 35 30 36.5 Q 28 38 26 36.5 Q 24 35 24 32 Z' /%3E%3C/g%3E%3Cg transform='rotate(12 85 40)'%3E%3Cellipse cx='78' cy='30' rx='3.2' ry='4' /%3E%3Cellipse cx='85' cy='31' rx='3' ry='3.8' /%3E%3Cellipse cx='92' cy='30.5' rx='3.1' ry='3.9' /%3E%3Cellipse cx='74' cy='37' rx='2.8' ry='3.5' /%3E%3Cellipse cx='81' cy='38.5' rx='2.7' ry='3.4' /%3E%3Cellipse cx='88' cy='38' rx='2.9' ry='3.6' /%3E%3Cpath d='M 76 42 Q 79 41 82 41 Q 85 41 88 42 Q 88.5 46 85.5 48 Q 82 50 78.5 48 Q 75.5 46 76 42 Z' /%3E%3C/g%3E%3Cg transform='rotate(-15 145 50)'%3E%3Cellipse cx='141' cy='38' rx='2.5' ry='3.2' /%3E%3Cellipse cx='147' cy='39' rx='2.3' ry='3' /%3E%3Cellipse cx='137' cy='44' rx='2.1' ry='2.7' /%3E%3Cellipse cx='143' cy='45.5' rx='2' ry='2.6' /%3E%3Cellipse cx='149' cy='45' rx='2.2' ry='2.8' /%3E%3Cpath d='M 139 48 Q 141 47.5 143 47.5 Q 145 47.5 147 48 Q 147 51 145 52.5 Q 143 54 141 52.5 Q 139 51 139 48 Z' /%3E%3C/g%3E%3Cg transform='rotate(10 50 75)'%3E%3Cellipse cx='44' cy='66' rx='3' ry='3.7' /%3E%3Cellipse cx='51' cy='67' rx='2.8' ry='3.5' /%3E%3Cellipse cx='58' cy='66.5' rx='2.9' ry='3.6' /%3E%3Cellipse cx='40' cy='73' rx='2.6' ry='3.2' /%3E%3Cellipse cx='47' cy='74.5' rx='2.5' ry='3.1' /%3E%3Cellipse cx='54' cy='74' rx='2.7' ry='3.3' /%3E%3Cpath d='M 42 78 Q 45 77 48 77 Q 51 77 54 78 Q 54.5 82 51.5 84 Q 48 86 44.5 84 Q 41.5 82 42 78 Z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '180px 100px',
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
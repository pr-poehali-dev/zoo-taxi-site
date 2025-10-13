import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M25 15 C25 12 27 10 30 10 C33 10 35 12 35 15 C35 18 33 20 30 20 C27 20 25 18 25 15 Z M20 25 C20 23 21 21 23 21 C25 21 27 23 27 25 C27 27 25 29 23 29 C21 29 20 27 20 25 Z M33 25 C33 23 35 21 37 21 C39 21 40 23 40 25 C40 27 39 29 37 29 C35 29 33 27 33 25 Z M26 32 C26 30 27 29 29 29 C31 29 32 30 32 32 C32 34 31 35 29 35 C27 35 26 34 26 32 Z' /%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
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
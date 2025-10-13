import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='1'%3E%3Cpath d='M25 20 C25 17 27 15 30 15 C33 15 35 17 35 20 C35 23 33 25 30 25 C27 25 25 23 25 20 Z M18 30 C18 28 19.5 26 21.5 26 C23.5 26 25 28 25 30 C25 32 23.5 34 21.5 34 C19.5 34 18 32 18 30 Z M35 30 C35 28 36.5 26 38.5 26 C40.5 26 42 28 42 30 C42 32 40.5 34 38.5 34 C36.5 34 35 32 35 30 Z M26 38 C26 36 27.5 35 29.5 35 C31.5 35 33 36 33 38 C33 40 31.5 41 29.5 41 C27.5 41 26 40 26 38 Z'/%3E%3Cpath d='M75 25 C75 21 78 18 82 18 C86 18 89 21 89 25 C89 29 86 32 82 32 C78 32 75 29 75 25 Z M66 38 C66 35 68 33 71 33 C74 33 76 35 76 38 C76 41 74 43 71 43 C68 43 66 41 66 38 Z M88 38 C88 35 90 33 93 33 C96 33 98 35 98 38 C98 41 96 43 93 43 C90 43 88 41 88 38 Z M75 48 C75 46 77 44 79 44 C81 44 83 46 83 48 C83 50 81 52 79 52 C77 52 75 50 75 48 Z M85 48 C85 46 87 44 89 44 C91 44 93 46 93 48 C93 50 91 52 89 52 C87 52 85 50 85 48 Z'/%3E%3Cpath d='M15 75 C15 72 17 70 20 70 C23 70 25 72 25 75 C25 78 23 80 20 80 C17 80 15 78 15 75 Z M8 85 C8 83 9.5 81 11.5 81 C13.5 81 15 83 15 85 C15 87 13.5 89 11.5 89 C9.5 89 8 87 8 85 Z M25 85 C25 83 26.5 81 28.5 81 C30.5 81 32 83 32 85 C32 87 30.5 89 28.5 89 C26.5 89 25 87 25 85 Z M16 93 C16 91 17.5 90 19.5 90 C21.5 90 23 91 23 93 C23 95 21.5 96 19.5 96 C17.5 96 16 95 16 93 Z'/%3E%3Cpath d='M85 80 C85 76 88 73 92 73 C96 73 99 76 99 80 C99 84 96 87 92 87 C88 87 85 84 85 80 Z M76 93 C76 90 78 88 81 88 C84 88 86 90 86 93 C86 96 84 98 81 98 C78 98 76 96 76 93 Z M98 93 C98 90 100 88 103 88 C106 88 108 90 108 93 C108 96 106 98 103 98 C100 98 98 96 98 93 Z M85 103 C85 101 87 99 89 99 C91 99 93 101 93 103 C93 105 91 107 89 107 C87 107 85 105 85 103 Z M95 103 C95 101 97 99 99 99 C101 99 103 101 103 103 C103 105 101 107 99 107 C97 107 95 105 95 103 Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
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
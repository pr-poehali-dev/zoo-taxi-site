import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AdminHeaderProps {
  onRefresh: () => void;
  loading: boolean;
  onLogout?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onRefresh, loading, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <Icon name="Shield" className="text-primary" size={24} />
            <h1 className="text-base md:text-2xl font-bold truncate">Админ панель</h1>
          </div>
          <div className="flex gap-1.5 md:gap-2">
            <Button 
              variant="outline" 
              onClick={onRefresh}
              disabled={loading}
              size="sm"
              className="px-2 md:px-4"
            >
              <Icon name="RefreshCw" size={16} className="md:mr-2" />
              <span className="hidden md:inline">Обновить</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              size="sm"
              className="px-2 md:px-4"
            >
              <Icon name="Home" size={16} className="md:mr-2" />
              <span className="hidden md:inline">Главная</span>
            </Button>
            {onLogout && (
              <Button 
                variant="outline" 
                onClick={onLogout}
                size="sm"
                className="px-2 md:px-4"
              >
                <Icon name="LogOut" size={16} className="md:mr-2" />
                <span className="hidden md:inline">Выйти</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
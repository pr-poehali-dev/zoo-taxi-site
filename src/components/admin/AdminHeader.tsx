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
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold">Админ панель ЗооТакси УЮТ</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onRefresh}
              disabled={loading}
            >
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Обновить
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <Icon name="Home" size={16} className="mr-2" />
              На главную
            </Button>
            {onLogout && (
              <Button variant="outline" onClick={onLogout}>
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
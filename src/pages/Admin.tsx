import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

import AdminHeader from '@/components/admin/AdminHeader';
import StatisticsCards from '@/components/admin/StatisticsCards';
import AdminTabs from '@/components/admin/AdminTabs';

import { useAdminData } from '@/hooks/useAdminData';
import { useOrdersActions } from '@/hooks/useOrdersActions';
import { useReviewsActions } from '@/hooks/useReviewsActions';
import { usePassengersActions } from '@/hooks/usePassengersActions';
import { useSettingsActions } from '@/hooks/useSettingsActions';

const STORAGE_KEY = 'admin_password';
const RECOVERY_EMAIL_KEY = 'admin_recovery_email';
const DEFAULT_PASSWORD = 'Zootaxi2026';

const getStoredPassword = (): string => {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_PASSWORD;
};

const setStoredPassword = (password: string): void => {
  localStorage.setItem(STORAGE_KEY, password);
};

const getRecoveryEmail = (): string => {
  return localStorage.getItem(RECOVERY_EMAIL_KEY) || '';
};

const setRecoveryEmail = (email: string): void => {
  localStorage.setItem(RECOVERY_EMAIL_KEY, email);
};

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [recoveryEmail, setRecoveryEmailState] = useState(getRecoveryEmail());

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === getStoredPassword()) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Неверный пароль');
      setPassword('');
    }
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (currentPassword !== getStoredPassword()) {
      return false;
    }
    setStoredPassword(newPassword);
    return true;
  };

  const handleSetRecoveryEmail = (email: string): void => {
    setRecoveryEmail(email);
    setRecoveryEmailState(email);
  };

  const handleSendRecoveryEmail = async (email: string): Promise<boolean> => {
    try {
      const currentPassword = getStoredPassword();
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_default',
          template_id: 'template_password_recovery',
          user_id: 'public_key',
          template_params: {
            to_email: email,
            password: currentPassword,
            recovery_date: new Date().toLocaleString('ru-RU'),
          },
        }),
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to send recovery email:', error);
      return false;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setPassword('');
  };

  const {
    orders,
    setOrders,
    reviews,
    setReviews,
    passengers,
    setPassengers,
    loading,
    contacts,
    setContacts,
    notifications,
    setNotifications,
    loadData
  } = useAdminData();

  const {
    deleteOrder,
    updateOrderStatus,
    updateOrderPrice,
    updateOrderNotes
  } = useOrdersActions(orders, setOrders);

  const {
    deleteReview,
    publishReview,
    setFeaturedReview,
    replyToReview
  } = useReviewsActions(reviews, setReviews);

  const {
    addPassenger,
    deletePassenger,
    togglePassengerPublish
  } = usePassengersActions(passengers, setPassengers, loadData);

  const {
    handleSaveContacts,
    handleSaveNotifications
  } = useSettingsActions(contacts, setContacts, notifications, setNotifications);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Icon name="Lock" size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Админ-панель</h1>
              <p className="text-gray-600">Введите пароль для доступа</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Пароль
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="w-full"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <Icon name="AlertCircle" size={16} className="mr-1" />
                    {error}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Icon name="LogIn" size={20} className="mr-2" />
                Войти
              </Button>
            </form>

            {recoveryEmail && (
              <div className="mt-4">
                <Button 
                  variant="link" 
                  className="w-full text-sm"
                  onClick={async () => {
                    const success = await handleSendRecoveryEmail(recoveryEmail);
                    if (success) {
                      alert(`Пароль отправлен на ${recoveryEmail}`);
                    } else {
                      alert('Не удалось отправить письмо. Обратитесь к администратору.');
                    }
                  }}
                >
                  <Icon name="Mail" size={16} className="mr-2" />
                  Забыли пароль? Отправить на email
                </Button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <a href="/" className="text-sm text-gray-600 hover:text-primary transition-colors">
                ← Вернуться на главную
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onRefresh={loadData} loading={loading} onLogout={handleLogout} />

      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <StatisticsCards orders={orders} reviews={reviews} />

        <AdminTabs
          orders={orders}
          reviews={reviews}
          passengers={passengers}
          contacts={contacts}
          notifications={notifications}
          onUpdateOrderStatus={updateOrderStatus}
          onUpdateOrderPrice={updateOrderPrice}
          onUpdateOrderNotes={updateOrderNotes}
          onDeleteOrder={deleteOrder}
          onPublishReview={publishReview}
          onSetFeaturedReview={setFeaturedReview}
          onReplyToReview={replyToReview}
          onDeleteReview={deleteReview}
          onAddPassenger={addPassenger}
          onTogglePassengerPublish={togglePassengerPublish}
          onDeletePassenger={deletePassenger}
          onSaveContacts={handleSaveContacts}
          onSaveNotifications={handleSaveNotifications}
          onChangePassword={handleChangePassword}
          recoveryEmail={recoveryEmail}
          onSetRecoveryEmail={handleSetRecoveryEmail}
          onSendRecoveryEmail={handleSendRecoveryEmail}
        />
      </div>
    </div>
  );
};

export default Admin;
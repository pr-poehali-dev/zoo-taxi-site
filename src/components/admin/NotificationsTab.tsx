import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Icon from '@/components/ui/icon';

interface NotificationsTabProps {
  notifications: {
    telegram_enabled: boolean;
    telegram_chat_id: string;
    email_enabled: boolean;
    notification_email: string;
  };
  onSave: (notifications: {
    telegram_enabled: boolean;
    telegram_chat_id: string;
    email_enabled: boolean;
    notification_email: string;
  }) => void;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ notifications, onSave }) => {
  const { toast } = useToast();
  const [editingNotifications, setEditingNotifications] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const handleSave = () => {
    onSave(localNotifications);
    setEditingNotifications(false);
    toast({
      title: 'Настройки сохранены',
      description: 'Уведомления будут отправляться при новых заявках',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Bell" size={24} />
          Настройка уведомлений
        </CardTitle>
        <CardDescription>Получайте мгновенные уведомления о новых заявках</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {editingNotifications ? (
            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Send" className="text-[#0088cc]" size={24} />
                  <h3 className="text-lg font-semibold">Telegram уведомления</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="telegram_enabled"
                      checked={localNotifications.telegram_enabled}
                      onChange={(e) => setLocalNotifications({...localNotifications, telegram_enabled: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <label htmlFor="telegram_enabled" className="text-sm font-medium">
                      Включить уведомления в Telegram
                    </label>
                  </div>
                  
                  {localNotifications.telegram_enabled && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Chat ID для получения уведомлений
                      </label>
                      <Input
                        placeholder="123456789"
                        value={localNotifications.telegram_chat_id}
                        onChange={(e) => setLocalNotifications({...localNotifications, telegram_chat_id: e.target.value})}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Чтобы узнать Chat ID: напишите боту @userinfobot в Telegram
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="Mail" className="text-primary" size={24} />
                  <h3 className="text-lg font-semibold">Email уведомления</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="email_enabled"
                      checked={localNotifications.email_enabled}
                      onChange={(e) => setLocalNotifications({...localNotifications, email_enabled: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <label htmlFor="email_enabled" className="text-sm font-medium">
                      Включить уведомления на Email
                    </label>
                  </div>
                  
                  {localNotifications.email_enabled && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email для получения уведомлений
                      </label>
                      <Input
                        type="email"
                        placeholder="your-email@example.com"
                        value={localNotifications.notification_email}
                        onChange={(e) => setLocalNotifications({...localNotifications, notification_email: e.target.value})}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSave}>
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить
                </Button>
                <Button variant="outline" onClick={() => setEditingNotifications(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Icon name="Send" className={notifications.telegram_enabled ? "text-[#0088cc]" : "text-gray-400"} size={24} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold">Telegram</p>
                          {notifications.telegram_enabled ? (
                            <Badge className="bg-green-100 text-green-800">Включено</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800">Выключено</Badge>
                          )}
                        </div>
                        {notifications.telegram_enabled && notifications.telegram_chat_id && (
                          <p className="text-sm text-gray-600">Chat ID: {notifications.telegram_chat_id}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" className={notifications.email_enabled ? "text-primary" : "text-gray-400"} size={24} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold">Email</p>
                          {notifications.email_enabled ? (
                            <Badge className="bg-green-100 text-green-800">Включено</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800">Выключено</Badge>
                          )}
                        </div>
                        {notifications.email_enabled && notifications.notification_email && (
                          <p className="text-sm text-gray-600">{notifications.notification_email}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Button onClick={() => setEditingNotifications(true)}>
                <Icon name="Edit" size={16} className="mr-2" />
                Изменить настройки
              </Button>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icon name="AlertCircle" size={18} className="text-yellow-600" />
                  Требуется настройка секретов
                </h4>
                <p className="text-sm text-gray-700 mb-3">
                  Для работы уведомлений необходимо добавить секреты в проекте:
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-6 list-disc">
                  <li><strong>TELEGRAM_BOT_TOKEN</strong> - получите у @BotFather в Telegram</li>
                  <li><strong>SMTP_HOST</strong> - адрес почтового сервера (smtp.gmail.com, smtp.yandex.ru)</li>
                  <li><strong>SMTP_PORT</strong> - порт сервера (обычно 587)</li>
                  <li><strong>SMTP_USER</strong> - ваш email адрес</li>
                  <li><strong>SMTP_PASSWORD</strong> - пароль (для Gmail используйте App Password)</li>
                </ul>
                <p className="text-xs text-gray-500 mt-3">
                  Секреты добавляются через панель проекта в настройках безопасности
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;

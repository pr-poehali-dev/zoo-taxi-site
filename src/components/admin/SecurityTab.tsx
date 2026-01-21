import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface SecurityTabProps {
  onChangePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  recoveryEmail?: string;
  onSetRecoveryEmail: (email: string) => void;
  onSendRecoveryEmail: (email: string) => Promise<boolean>;
}

const SecurityTab: React.FC<SecurityTabProps> = ({ 
  onChangePassword, 
  recoveryEmail = '', 
  onSetRecoveryEmail,
  onSendRecoveryEmail 
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(recoveryEmail);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: 'Ошибка',
        description: 'Новый пароль должен содержать минимум 6 символов',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Новый пароль и подтверждение не совпадают',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await onChangePassword(currentPassword, newPassword);
      
      if (success) {
        toast({
          title: 'Успешно',
          description: 'Пароль успешно изменён',
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast({
          title: 'Ошибка',
          description: 'Неверный текущий пароль',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось изменить пароль',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Lock" size={24} />
            Изменение пароля
          </CardTitle>
          <CardDescription>
            Обновите пароль для доступа к админ-панели
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="current-password">Текущий пароль</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Введите текущий пароль"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Новый пароль</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Введите новый пароль (минимум 6 символов)"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Подтверждение нового пароля</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите новый пароль"
                disabled={isLoading}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              <Icon name="Key" size={16} className="mr-2" />
              {isLoading ? 'Сохранение...' : 'Изменить пароль'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Mail" size={24} />
            Восстановление пароля
          </CardTitle>
          <CardDescription>
            Настройте email для восстановления доступа к админ-панели
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="recovery-email">Email для восстановления</Label>
              <Input
                id="recovery-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isEmailLoading}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={async () => {
                  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    toast({
                      title: 'Ошибка',
                      description: 'Введите корректный email',
                      variant: 'destructive',
                    });
                    return;
                  }
                  onSetRecoveryEmail(email);
                  toast({
                    title: 'Успешно',
                    description: 'Email для восстановления сохранён',
                  });
                }}
                disabled={isEmailLoading}
              >
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить email
              </Button>
              
              {recoveryEmail && (
                <Button 
                  variant="outline"
                  onClick={async () => {
                    setIsEmailLoading(true);
                    try {
                      const success = await onSendRecoveryEmail(recoveryEmail);
                      if (success) {
                        toast({
                          title: 'Письмо отправлено',
                          description: 'Проверьте почту для восстановления пароля',
                        });
                      } else {
                        toast({
                          title: 'Ошибка',
                          description: 'Не удалось отправить письмо',
                          variant: 'destructive',
                        });
                      }
                    } catch (error) {
                      toast({
                        title: 'Ошибка',
                        description: 'Не удалось отправить письмо',
                        variant: 'destructive',
                      });
                    } finally {
                      setIsEmailLoading(false);
                    }
                  }}
                  disabled={isEmailLoading}
                >
                  <Icon name="Send" size={16} className="mr-2" />
                  {isEmailLoading ? 'Отправка...' : 'Отправить пароль'}
                </Button>
              )}
            </div>
            
            {recoveryEmail && (
              <div className="text-sm text-gray-600 flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
                <Icon name="Info" size={16} className="mt-0.5 text-blue-600 flex-shrink-0" />
                <span>Текущий пароль будет отправлен на <strong>{recoveryEmail}</strong></span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Shield" size={24} />
            Рекомендации по безопасности
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <Icon name="CheckCircle2" size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
              <span>Используйте пароль длиной минимум 8-12 символов</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="CheckCircle2" size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
              <span>Комбинируйте заглавные и строчные буквы, цифры и символы</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="CheckCircle2" size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
              <span>Не используйте один и тот же пароль для разных сервисов</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="CheckCircle2" size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
              <span>Регулярно меняйте пароль (раз в 3-6 месяцев)</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;
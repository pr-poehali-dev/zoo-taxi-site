import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import Icon from '@/components/ui/icon';

interface OrderFormData {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  petName: string;
  petType: string;
  petBreed: string;
  petWeight: string;
  petSpecialNeeds: string;
  serviceType: string;
  pickupAddress: string;
  destinationAddress: string;
  preferredDate: string;
  preferredTime: string;
  additionalServices: string;
  comments: string;
}

const OrderForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<OrderFormData>({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    petName: '',
    petType: '',
    petBreed: '',
    petWeight: '',
    petSpecialNeeds: '',
    serviceType: '',
    pickupAddress: '',
    destinationAddress: '',
    preferredDate: '',
    preferredTime: '',
    additionalServices: '',
    comments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/1c0b122d-a5b5-4727-aaa6-681c30e9f3f3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_name: formData.clientName,
          client_phone: formData.clientPhone,
          client_email: formData.clientEmail,
          pet_name: formData.petName,
          pet_type: formData.petType,
          pet_breed: formData.petBreed,
          pet_weight: formData.petWeight ? parseFloat(formData.petWeight) : null,
          pet_special_needs: formData.petSpecialNeeds,
          service_type: formData.serviceType,
          pickup_address: formData.pickupAddress,
          destination_address: formData.destinationAddress,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          additional_services: formData.additionalServices,
          comments: formData.comments
        })
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: '✅ Заявка успешно отправлена!',
          description: 'Мы свяжемся с вами в течение 15 минут для подтверждения заказа.',
          duration: 5000,
        });
        
        // Отправка уведомлений
        const notificationSettings = localStorage.getItem('notifications');
        if (notificationSettings) {
          const settings = JSON.parse(notificationSettings);
          if (settings.telegram_enabled || settings.email_enabled) {
            try {
              await fetch('https://functions.poehali.dev/813696b0-7f90-461f-aa2b-592da785321d', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  order: {
                    id: result.order?.id,
                    client_name: formData.clientName,
                    client_phone: formData.clientPhone,
                    pet_name: formData.petName,
                    pet_type: formData.petType,
                    service_type: formData.serviceType,
                    pickup_address: formData.pickupAddress,
                    destination_address: formData.destinationAddress,
                    preferred_date: formData.preferredDate,
                    preferred_time: formData.preferredTime,
                    estimated_price: result.order?.estimated_price,
                    comments: formData.comments
                  },
                  settings: settings
                })
              });
            } catch (notifError) {
              console.error('Notification error:', notifError);
            }
          }
        }
        
        setFormData({
          clientName: '',
          clientPhone: '',
          clientEmail: '',
          petName: '',
          petType: '',
          petBreed: '',
          petWeight: '',
          petSpecialNeeds: '',
          serviceType: '',
          pickupAddress: '',
          destinationAddress: '',
          preferredDate: '',
          preferredTime: '',
          additionalServices: '',
          comments: ''
        });
      } else {
        toast({
          title: 'Ошибка отправки',
          description: result.error || 'Не удалось отправить заявку. Попробуйте еще раз.',
          variant: 'destructive',
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Проверьте интернет-соединение и попробуйте еще раз.',
        variant: 'destructive',
        duration: 5000,
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl flex items-center justify-center gap-2">
          <Icon name="Car" className="text-primary" size={28} />
          Заказать зоотакси
        </CardTitle>
        <CardDescription>
          Заполните форму и мы свяжемся с вами в течение 15 минут для подтверждения заказа
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Контактная информация */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ваше имя *</label>
              <Input
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Введите ваше имя"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Телефон *</label>
              <Input
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleChange}
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email (необязательно)</label>
            <Input
              name="clientEmail"
              type="email"
              value={formData.clientEmail}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>

          {/* Информация о питомце */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Icon name="Heart" className="text-primary" size={20} />
              Информация о питомце
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Кличка питомца</label>
                <Input
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  placeholder="Кличка вашего питомца"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Тип животного *</label>
                <select
                  name="petType"
                  value={formData.petType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Выберите тип</option>
                  <option value="собака">Собака</option>
                  <option value="кошка">Кошка</option>
                  <option value="кролик">Кролик</option>
                  <option value="птица">Птица</option>
                  <option value="хорек">Хорек</option>
                  <option value="другое">Другое</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Порода</label>
                <Input
                  name="petBreed"
                  value={formData.petBreed}
                  onChange={handleChange}
                  placeholder="Порода животного"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Вес (кг)</label>
                <Input
                  name="petWeight"
                  type="number"
                  step="0.1"
                  value={formData.petWeight}
                  onChange={handleChange}
                  placeholder="Вес в килограммах"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Особые потребности</label>
              <Textarea
                name="petSpecialNeeds"
                value={formData.petSpecialNeeds}
                onChange={handleChange}
                placeholder="Особенности характера, лекарства, страхи и т.д."
                rows={3}
              />
            </div>
          </div>

          {/* Детали поездки */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Icon name="MapPin" className="text-primary" size={20} />
              Детали поездки
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Тип услуги *</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Выберите услугу</option>
                <option value="к ветеринару">К ветеринару</option>
                <option value="из ветклиники">Из ветклиники домой</option>
                <option value="в гостиницу">В гостиницу для животных</option>
                <option value="из гостиницы">Из гостиницы домой</option>
                <option value="на дачу">На дачу/за город</option>
                <option value="экстренная помощь">Экстренная помощь</option>
                <option value="другое">Другое</option>
              </select>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Адрес подачи *</label>
                <Input
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  placeholder="Откуда забрать питомца"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Адрес назначения *</label>
                <Input
                  name="destinationAddress"
                  value={formData.destinationAddress}
                  onChange={handleChange}
                  placeholder="Куда доставить питомца"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Желаемая дата *</label>
                <Input
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Желаемое время *</label>
                <Input
                  name="preferredTime"
                  type="time"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Дополнительно</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Дополнительные услуги</label>
                <Textarea
                  name="additionalServices"
                  value={formData.additionalServices}
                  onChange={handleChange}
                  placeholder="Ожидание у ветеринара, помощь с переноской и т.д."
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Комментарии</label>
                <Textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Любая дополнительная информация"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button 
              type="submit" 
              className="w-full text-lg py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Отправляем заявку...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Icon name="Send" size={20} />
                  Отправить заявку
                </div>
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            * - обязательные поля для заполнения
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
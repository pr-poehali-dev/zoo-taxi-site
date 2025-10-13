import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { Order } from './types';

interface OrderDetailsDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose
}) => {
  if (!order) return null;

  const getStatusBadge = (status: Order['status']) => {
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-green-100 text-green-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    const labels = {
      new: 'Новая',
      confirmed: 'Подтверждена',
      in_progress: 'В работе',
      completed: 'Завершена',
      cancelled: 'Отменена'
    };

    return (
      <Badge className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl">Заказ №{order.id}</DialogTitle>
              <DialogDescription>
                Создан: {new Date(order.created_at).toLocaleString('ru-RU')}
              </DialogDescription>
            </div>
            {getStatusBadge(order.status)}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Icon name="User" size={18} />
              Информация о клиенте
            </h3>
            <div className="grid grid-cols-2 gap-3 pl-7">
              <div>
                <p className="text-sm text-gray-500">Имя</p>
                <p className="font-medium">{order.client_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Телефон</p>
                <p className="font-medium">
                  <a href={`tel:${order.client_phone}`} className="text-primary hover:underline">
                    {order.client_phone}
                  </a>
                </p>
              </div>
              {order.client_email && (
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">
                    <a href={`mailto:${order.client_email}`} className="text-primary hover:underline">
                      {order.client_email}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Icon name="Heart" size={18} />
              Информация о питомце
            </h3>
            <div className="grid grid-cols-2 gap-3 pl-7">
              {order.pet_name && (
                <div>
                  <p className="text-sm text-gray-500">Кличка</p>
                  <p className="font-medium">{order.pet_name}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Тип</p>
                <p className="font-medium">{order.pet_type}</p>
              </div>
              {order.pet_breed && (
                <div>
                  <p className="text-sm text-gray-500">Порода</p>
                  <p className="font-medium">{order.pet_breed}</p>
                </div>
              )}
              {order.pet_weight && (
                <div>
                  <p className="text-sm text-gray-500">Вес</p>
                  <p className="font-medium">{order.pet_weight} кг</p>
                </div>
              )}
              {order.pet_special_needs && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Особые потребности</p>
                  <p className="font-medium">{order.pet_special_needs}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Icon name="Car" size={18} />
              Информация о поездке
            </h3>
            <div className="space-y-3 pl-7">
              <div>
                <p className="text-sm text-gray-500">Услуга</p>
                <p className="font-medium">{order.service_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Дата и время</p>
                <p className="font-medium">{order.preferred_date} в {order.preferred_time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Откуда</p>
                <p className="font-medium">{order.pickup_address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Куда</p>
                <p className="font-medium">{order.destination_address}</p>
              </div>
              {order.additional_services && (
                <div>
                  <p className="text-sm text-gray-500">Дополнительные услуги</p>
                  <p className="font-medium">{order.additional_services}</p>
                </div>
              )}
              {order.estimated_price && (
                <div>
                  <p className="text-sm text-gray-500">Стоимость</p>
                  <p className="font-medium text-lg text-primary">{order.estimated_price} ₽</p>
                </div>
              )}
            </div>
          </div>

          {order.comments && (
            <div className="space-y-2">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Icon name="MessageSquare" size={18} />
                Комментарий клиента
              </h3>
              <div className="pl-7 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm">{order.comments}</p>
              </div>
            </div>
          )}

          {order.admin_notes && (
            <div className="space-y-2">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Icon name="FileText" size={18} />
                Комментарий администратора
              </h3>
              <div className="pl-7 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm">{order.admin_notes}</p>
              </div>
            </div>
          )}

          {order.status === 'cancelled' && order.cancellation_reason && (
            <div className="space-y-2">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-red-600">
                <Icon name="XCircle" size={18} />
                Причина отмены
              </h3>
              <div className="pl-7 p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-900">{order.cancellation_reason}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;

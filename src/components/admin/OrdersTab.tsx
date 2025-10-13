import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Icon from '@/components/ui/icon';
import type { Order } from './types';

interface OrdersTabProps {
  orders: Order[];
  onUpdateStatus: (orderId: number, status: Order['status']) => void;
  onUpdatePrice: (orderId: number, price: number) => void;
  onDelete: (orderId: number) => void;
}

const OrdersTab: React.FC<OrdersTabProps> = ({ orders, onUpdateStatus, onUpdatePrice, onDelete }) => {
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingPrice, setEditingPrice] = useState<number | null>(null);
  const [priceInput, setPriceInput] = useState<string>('');

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

  const filteredOrders = orders.filter(order => {
    const matchesStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;
    const matchesSearch = orderSearchQuery === '' || 
      order.client_name.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.client_phone.includes(orderSearchQuery) ||
      order.pet_name?.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.id.toString().includes(orderSearchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <Card>
      <CardHeader className="p-4 md:p-6">
        <div className="space-y-3 md:space-y-0 md:flex md:justify-between md:items-center">
          <div>
            <CardTitle className="text-lg md:text-xl">Заявки на поездки</CardTitle>
            <CardDescription className="text-xs md:text-sm">Управление заказами клиентов</CardDescription>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Поиск..."
                value={orderSearchQuery}
                onChange={(e) => setOrderSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-48"
              />
            </div>
            <select 
              value={orderStatusFilter} 
              onChange={(e) => setOrderStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">Все статусы</option>
              <option value="new">Новые</option>
              <option value="confirmed">Подтверждены</option>
              <option value="in_progress">В работе</option>
              <option value="completed">Завершены</option>
              <option value="cancelled">Отменены</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <div className="space-y-3 md:space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 md:p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-base md:text-lg">
                      №{order.id} - {order.client_name}
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      {new Date(order.created_at).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' })}
                    </p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
                
                <div className="space-y-2 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 mb-3 md:mb-4">
                  <div className="space-y-1">
                    <p className="text-sm"><span className="font-medium">Питомец:</span> {order.pet_name} ({order.pet_type})</p>
                    <p className="text-sm"><span className="font-medium">Услуга:</span> {order.service_type}</p>
                    <p className="text-sm"><span className="font-medium">Телефон:</span> <a href={`tel:${order.client_phone}`} className="text-primary hover:underline">{order.client_phone}</a></p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm"><span className="font-medium">Дата:</span> {order.preferred_date} в {order.preferred_time}</p>
                    <p className="text-sm truncate"><span className="font-medium">Откуда:</span> {order.pickup_address}</p>
                    <p className="text-sm truncate"><span className="font-medium">Куда:</span> {order.destination_address}</p>
                  </div>
                </div>
                
                {order.comments && (
                  <div className="mb-3 md:mb-4 p-2 md:p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs md:text-sm"><span className="font-medium">Комментарий:</span> {order.comments}</p>
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                  <div className="flex items-center gap-2">
                    {editingPrice === order.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={priceInput}
                          onChange={(e) => setPriceInput(e.target.value)}
                          placeholder="Цена"
                          className="w-24 md:w-32 text-sm"
                          autoFocus
                        />
                        <Button 
                          size="sm"
                          onClick={() => {
                            const price = parseInt(priceInput);
                            if (price > 0) {
                              onUpdatePrice(order.id, price);
                              setEditingPrice(null);
                              setPriceInput('');
                            }
                          }}
                        >
                          <Icon name="Check" size={14} />
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingPrice(null);
                            setPriceInput('');
                          }}
                        >
                          <Icon name="X" size={14} />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <p className="text-base md:text-lg font-semibold text-primary">
                          {order.estimated_price ? `${order.estimated_price} ₽` : 'Не указана'}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            setEditingPrice(order.id);
                            setPriceInput(order.estimated_price?.toString() || '');
                          }}
                        >
                          <Icon name="Edit" size={14} />
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedOrder(order)}
                      className="text-xs md:text-sm px-2 md:px-3"
                    >
                      <Icon name="Eye" size={14} className="md:mr-1" />
                      <span className="hidden sm:inline">Подробнее</span>
                    </Button>
                    {order.status === 'new' && (
                      <Button 
                        size="sm"
                        onClick={() => onUpdateStatus(order.id, 'confirmed')}
                        className="text-xs md:text-sm px-2 md:px-3"
                      >
                        Подтвердить
                      </Button>
                    )}
                    {order.status === 'confirmed' && (
                      <Button 
                        size="sm"
                        onClick={() => onUpdateStatus(order.id, 'in_progress')}
                        className="text-xs md:text-sm px-2 md:px-3"
                      >
                        В работу
                      </Button>
                    )}
                    {order.status === 'in_progress' && (
                      <Button 
                        size="sm"
                        onClick={() => onUpdateStatus(order.id, 'completed')}
                        className="text-xs md:text-sm px-2 md:px-3"
                      >
                        Завершить
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="text-xs md:text-sm px-2 md:px-3"
                        >
                          <Icon name="Trash2" size={14} className="md:mr-1" />
                          <span className="hidden sm:inline">Удалить</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удалить заявку?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Вы уверены, что хотите удалить заявку #{order.id} от {order.client_name}? Это действие нельзя отменить.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(order.id)}>
                            Удалить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Icon name="FileX" className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">Заявок с выбранным статусом нет</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersTab;
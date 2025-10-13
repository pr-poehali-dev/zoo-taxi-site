import { useToast } from '@/components/ui/use-toast';
import type { Order } from '@/components/admin/types';

export const useOrdersActions = (
  orders: Order[],
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
) => {
  const { toast } = useToast();

  const deleteOrder = async (orderId: number) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/1c0b122d-a5b5-4727-aaa6-681c30e9f3f3?id=${orderId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setOrders(orders.filter(order => order.id !== orderId));
        toast({
          title: 'Заявка удалена',
          description: `Заявка #${orderId} успешно удалена`,
        });
      } else {
        console.error('Ошибка удаления заявки:', result.error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить заявку',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка сети при удалении заявки:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: Order['status']) => {
    try {
      const response = await fetch('https://functions.poehali.dev/1c0b122d-a5b5-4727-aaa6-681c30e9f3f3', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: orderId,
          status: newStatus
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
            : order
        ));
        
        const statusLabels: Record<Order['status'], string> = {
          new: 'новая',
          confirmed: 'подтверждена',
          in_progress: 'в работе',
          completed: 'завершена',
          cancelled: 'отменена'
        };
        
        toast({
          title: 'Статус обновлен',
          description: `Заявка #${orderId} теперь ${statusLabels[newStatus]}`,
        });
      } else {
        console.error('Ошибка обновления статуса заявки:', result.error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось обновить статус заявки',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка сети при обновлении статуса:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  const updateOrderPrice = async (orderId: number, price: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/1c0b122d-a5b5-4727-aaa6-681c30e9f3f3', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: orderId,
          estimated_price: price
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === orderId 
            ? { ...order, estimated_price: price, updated_at: new Date().toISOString() }
            : order
        ));
        
        toast({
          title: 'Стоимость обновлена',
          description: `Для заявки #${orderId} установлена цена ${price} ₽`,
        });
      } else {
        console.error('Ошибка обновления цены:', result.error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось обновить стоимость',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка сети при обновлении цены:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  return {
    deleteOrder,
    updateOrderStatus,
    updateOrderPrice
  };
};

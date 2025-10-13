import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import Icon from '@/components/ui/icon';

import AdminHeader from '@/components/admin/AdminHeader';
import StatisticsCards from '@/components/admin/StatisticsCards';
import AnalyticsTab from '@/components/admin/AnalyticsTab';
import OrdersTab from '@/components/admin/OrdersTab';
import ReviewsTab from '@/components/admin/ReviewsTab';
import PassengersTab from '@/components/admin/PassengersTab';
import ContactsTab from '@/components/admin/ContactsTab';
import NotificationsTab from '@/components/admin/NotificationsTab';

import type { Order, Review, Passenger } from '@/components/admin/types';

const Admin: React.FC = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState({ phone: '79685227272', telegram: 'zootaxi_uyut', whatsapp: '79685227272' });
  const [notifications, setNotifications] = useState({ 
    telegram_enabled: false, 
    telegram_chat_id: '', 
    email_enabled: false, 
    notification_email: '' 
  });

  useEffect(() => {
    loadData();
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const ordersResponse = await fetch('https://functions.poehali.dev/1c0b122d-a5b5-4727-aaa6-681c30e9f3f3', {
        method: 'GET'
      });
      
      const ordersData = await ordersResponse.json();
      
      if (ordersResponse.ok) {
        setOrders(ordersData.orders || []);
      } else {
        console.error('Ошибка загрузки заявок:', ordersData.error);
        setOrders([]);
      }
      
      const reviewsResponse = await fetch('https://functions.poehali.dev/84a1dd5d-042b-48e9-89cf-dc09b9361aed', {
        method: 'GET'
      });
      
      const reviewsData = await reviewsResponse.json();
      
      if (reviewsResponse.ok) {
        setReviews(reviewsData.reviews || []);
      } else {
        console.error('Ошибка загрузки отзывов:', reviewsData.error);
        setReviews([]);
      }
      
      const passengersResponse = await fetch('https://functions.poehali.dev/9b67e555-8059-4828-adf9-09677d9dacd0');
      const passengersData = await passengersResponse.json();
      
      if (passengersResponse.ok) {
        setPassengers(passengersData || []);
      } else {
        console.error('Ошибка загрузки галереи:', passengersData.error);
        setPassengers([]);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
    setLoading(false);
  };

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

  const deleteReview = async (reviewId: number) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/84a1dd5d-042b-48e9-89cf-dc09b9361aed?id=${reviewId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setReviews(reviews.filter(review => review.id !== reviewId));
        toast({
          title: 'Отзыв удален',
          description: `Отзыв #${reviewId} успешно удален`,
        });
      } else {
        console.error('Ошибка удаления отзыва:', result.error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить отзыв',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка сети при удалении отзыва:', error);
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

  const publishReview = async (reviewId: number, publish: boolean) => {
    try {
      const response = await fetch('https://functions.poehali.dev/84a1dd5d-042b-48e9-89cf-dc09b9361aed', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          review_id: reviewId,
          is_published: publish
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setReviews(reviews.map(review =>
          review.id === reviewId
            ? { 
                ...review, 
                is_published: publish, 
                published_at: publish ? new Date().toISOString() : undefined,
                updated_at: new Date().toISOString()
              }
            : review
        ));
        
        toast({
          title: publish ? 'Отзыв опубликован' : 'Отзыв скрыт',
          description: `Отзыв #${reviewId} ${publish ? 'теперь виден всем' : 'скрыт с сайта'}`,
        });
      } else {
        console.error('Ошибка публикации отзыва:', result.error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось изменить статус отзыва',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка сети при публикации отзыва:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  const setFeaturedReview = async (reviewId: number, featured: boolean) => {
    try {
      const response = await fetch('https://functions.poehali.dev/84a1dd5d-042b-48e9-89cf-dc09b9361aed', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          review_id: reviewId,
          is_featured: featured
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setReviews(reviews.map(review =>
          review.id === reviewId
            ? { ...review, is_featured: featured, updated_at: new Date().toISOString() }
            : review
        ));
        
        toast({
          title: featured ? 'Добавлен в рекомендуемые' : 'Убран из рекомендуемых',
          description: `Отзыв #${reviewId} обновлен`,
        });
      } else {
        console.error('Ошибка обновления статуса рекомендуемого:', result.error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось обновить статус отзыва',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка сети при обновлении рекомендуемого:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  const addPassenger = async (passenger: { pet_name: string; pet_type: string; photo_url: string; description: string }) => {
    try {
      const response = await fetch('https://functions.poehali.dev/9b67e555-8059-4828-adf9-09677d9dacd0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pet_name: passenger.pet_name,
          pet_type: passenger.pet_type,
          photo_url: passenger.photo_url,
          description: passenger.description,
          is_published: true
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: 'Фото добавлено',
          description: 'Фотография успешно добавлена в галерею',
        });
        loadData();
      } else {
        toast({
          title: 'Ошибка',
          description: result.error || 'Не удалось добавить фото',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка добавления фото:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  const deletePassenger = async (passengerId: number) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/9b67e555-8059-4828-adf9-09677d9dacd0?id=${passengerId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setPassengers(passengers.filter(p => p.id !== passengerId));
        toast({
          title: 'Фото удалено',
          description: 'Фотография удалена из галереи',
        });
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить фото',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка удаления фото:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  const togglePassengerPublish = async (passengerId: number, isPublished: boolean) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/9b67e555-8059-4828-adf9-09677d9dacd0?id=${passengerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          is_published: !isPublished
        })
      });
      
      if (response.ok) {
        setPassengers(passengers.map(p =>
          p.id === passengerId ? { ...p, is_published: !isPublished } : p
        ));
        toast({
          title: !isPublished ? 'Опубликовано' : 'Снято с публикации',
          description: 'Статус фотографии обновлен',
        });
      }
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус',
        variant: 'destructive',
      });
    }
  };

  const handleSaveContacts = (newContacts: typeof contacts) => {
    localStorage.setItem('contacts', JSON.stringify(newContacts));
    setContacts(newContacts);
  };

  const handleSaveNotifications = (newNotifications: typeof notifications) => {
    localStorage.setItem('notifications', JSON.stringify(newNotifications));
    setNotifications(newNotifications);
  };

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
      <AdminHeader onRefresh={loadData} loading={loading} />

      <div className="container mx-auto px-4 py-8">
        <StatisticsCards orders={orders} reviews={reviews} />

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="analytics">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Icon name="Car" size={16} className="mr-2" />
              Заявки ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Icon name="Star" size={16} className="mr-2" />
              Отзывы ({reviews.length})
            </TabsTrigger>
            <TabsTrigger value="passengers">
              <Icon name="Image" size={16} className="mr-2" />
              Пассажиры ({passengers.length})
            </TabsTrigger>
            <TabsTrigger value="contacts">
              <Icon name="Phone" size={16} className="mr-2" />
              Контакты
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Icon name="Bell" size={16} className="mr-2" />
              Уведомления
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsTab 
              orders={orders}
              reviews={reviews}
            />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrdersTab 
              orders={orders} 
              onUpdateStatus={updateOrderStatus}
              onUpdatePrice={updateOrderPrice}
              onDelete={deleteOrder}
            />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <ReviewsTab 
              reviews={reviews}
              onPublish={publishReview}
              onSetFeatured={setFeaturedReview}
              onDelete={deleteReview}
            />
          </TabsContent>

          <TabsContent value="passengers">
            <PassengersTab 
              passengers={passengers}
              onAdd={addPassenger}
              onTogglePublish={togglePassengerPublish}
              onDelete={deletePassenger}
            />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsTab 
              contacts={contacts}
              onSave={handleSaveContacts}
            />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab 
              notifications={notifications}
              onSave={handleSaveNotifications}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
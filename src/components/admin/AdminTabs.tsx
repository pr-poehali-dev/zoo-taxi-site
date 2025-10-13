import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

import AnalyticsTab from '@/components/admin/AnalyticsTab';
import OrdersTab from '@/components/admin/OrdersTab';
import ReviewsTab from '@/components/admin/ReviewsTab';
import PassengersTab from '@/components/admin/PassengersTab';
import ContactsTab from '@/components/admin/ContactsTab';
import NotificationsTab from '@/components/admin/NotificationsTab';

import type { Order, Review, Passenger } from '@/components/admin/types';

interface AdminTabsProps {
  orders: Order[];
  reviews: Review[];
  passengers: Passenger[];
  contacts: {
    phone: string;
    telegram: string;
    whatsapp: string;
  };
  notifications: {
    telegram_enabled: boolean;
    telegram_chat_id: string;
    email_enabled: boolean;
    notification_email: string;
  };
  onUpdateOrderStatus: (orderId: number, status: Order['status']) => void;
  onUpdateOrderPrice: (orderId: number, price: number) => void;
  onDeleteOrder: (orderId: number) => void;
  onPublishReview: (reviewId: number, publish: boolean) => void;
  onSetFeaturedReview: (reviewId: number, featured: boolean) => void;
  onDeleteReview: (reviewId: number) => void;
  onAddPassenger: (passenger: { pet_name: string; pet_type: string; photo_url: string; description: string }) => void;
  onTogglePassengerPublish: (passengerId: number, isPublished: boolean) => void;
  onDeletePassenger: (passengerId: number) => void;
  onSaveContacts: (contacts: typeof contacts) => void;
  onSaveNotifications: (notifications: typeof notifications) => void;
}

const AdminTabs: React.FC<AdminTabsProps> = ({
  orders,
  reviews,
  passengers,
  contacts,
  notifications,
  onUpdateOrderStatus,
  onUpdateOrderPrice,
  onDeleteOrder,
  onPublishReview,
  onSetFeaturedReview,
  onDeleteReview,
  onAddPassenger,
  onTogglePassengerPublish,
  onDeletePassenger,
  onSaveContacts,
  onSaveNotifications
}) => {
  return (
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
          onUpdateStatus={onUpdateOrderStatus}
          onUpdatePrice={onUpdateOrderPrice}
          onDelete={onDeleteOrder}
        />
      </TabsContent>

      <TabsContent value="reviews" className="space-y-6">
        <ReviewsTab 
          reviews={reviews}
          onPublish={onPublishReview}
          onSetFeatured={onSetFeaturedReview}
          onDelete={onDeleteReview}
        />
      </TabsContent>

      <TabsContent value="passengers">
        <PassengersTab 
          passengers={passengers}
          onAdd={onAddPassenger}
          onTogglePublish={onTogglePassengerPublish}
          onDelete={onDeletePassenger}
        />
      </TabsContent>

      <TabsContent value="contacts">
        <ContactsTab 
          contacts={contacts}
          onSave={onSaveContacts}
        />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationsTab 
          notifications={notifications}
          onSave={onSaveNotifications}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;

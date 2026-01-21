import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

import AnalyticsTab from '@/components/admin/AnalyticsTab';
import OrdersTab from '@/components/admin/OrdersTab';
import ReviewsTab from '@/components/admin/ReviewsTab';
import PassengersTab from '@/components/admin/PassengersTab';
import ContactsTab from '@/components/admin/ContactsTab';
import NotificationsTab from '@/components/admin/NotificationsTab';
import SecurityTab from '@/components/admin/SecurityTab';

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
  onUpdateOrderNotes: (orderId: number, adminNotes: string, cancellationReason?: string) => void;
  onDeleteOrder: (orderId: number) => void;
  onPublishReview: (reviewId: number, publish: boolean) => void;
  onSetFeaturedReview: (reviewId: number, featured: boolean) => void;
  onReplyToReview: (reviewId: number, adminReply: string, replyAuthor: string) => void;
  onDeleteReview: (reviewId: number) => void;
  onAddPassenger: (passenger: { pet_name: string; pet_type: string; photo_url: string; description: string }) => void;
  onTogglePassengerPublish: (passengerId: number, isPublished: boolean) => void;
  onDeletePassenger: (passengerId: number) => void;
  onSaveContacts: (contacts: typeof contacts) => void;
  onSaveNotifications: (notifications: typeof notifications) => void;
  onChangePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  recoveryEmail?: string;
  onSetRecoveryEmail: (email: string) => void;
  onSendRecoveryEmail: (email: string) => Promise<boolean>;
}

const AdminTabs: React.FC<AdminTabsProps> = ({
  orders,
  reviews,
  passengers,
  contacts,
  notifications,
  onUpdateOrderStatus,
  onUpdateOrderPrice,
  onUpdateOrderNotes,
  onDeleteOrder,
  onPublishReview,
  onSetFeaturedReview,
  onReplyToReview,
  onDeleteReview,
  onAddPassenger,
  onTogglePassengerPublish,
  onDeletePassenger,
  onSaveContacts,
  onSaveNotifications,
  onChangePassword,
  recoveryEmail,
  onSetRecoveryEmail,
  onSendRecoveryEmail
}) => {
  return (
    <Tabs defaultValue="analytics" className="space-y-4 md:space-y-6">
      <div className="overflow-x-auto -mx-3 md:mx-0 px-3 md:px-0">
        <TabsList className="grid w-full grid-cols-7 min-w-[700px] md:min-w-0 h-auto">
          <TabsTrigger value="analytics" className="text-xs md:text-sm px-2 md:px-4 py-2">
            <Icon name="BarChart3" size={16} className="md:mr-2" />
            <span className="hidden md:inline">Аналитика</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="text-xs md:text-sm px-2 md:px-4 py-2">
            <Icon name="Car" size={16} className="md:mr-2" />
            <span className="hidden sm:inline">Заявки</span>
            <span className="md:inline"> ({orders.length})</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="text-xs md:text-sm px-2 md:px-4 py-2">
            <Icon name="Star" size={16} className="md:mr-2" />
            <span className="hidden sm:inline">Отзывы</span>
            <span className="md:inline"> ({reviews.length})</span>
          </TabsTrigger>
          <TabsTrigger value="passengers" className="text-xs md:text-sm px-2 md:px-4 py-2">
            <Icon name="Image" size={16} className="md:mr-2" />
            <span className="hidden md:inline">Пассажиры</span>
            <span className="md:inline"> ({passengers.length})</span>
          </TabsTrigger>
          <TabsTrigger value="contacts" className="text-xs md:text-sm px-2 md:px-4 py-2">
            <Icon name="Phone" size={16} className="md:mr-2" />
            <span className="hidden md:inline">Контакты</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs md:text-sm px-2 md:px-4 py-2">
            <Icon name="Bell" size={16} className="md:mr-2" />
            <span className="hidden md:inline">Уведомления</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs md:text-sm px-2 md:px-4 py-2">
            <Icon name="Lock" size={16} className="md:mr-2" />
            <span className="hidden md:inline">Безопасность</span>
          </TabsTrigger>
        </TabsList>
      </div>

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
          onUpdateNotes={onUpdateOrderNotes}
          onDelete={onDeleteOrder}
        />
      </TabsContent>

      <TabsContent value="reviews" className="space-y-6">
        <ReviewsTab 
          reviews={reviews}
          onPublish={onPublishReview}
          onSetFeatured={onSetFeaturedReview}
          onReply={onReplyToReview}
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

      <TabsContent value="security">
        <SecurityTab 
          onChangePassword={onChangePassword}
          recoveryEmail={recoveryEmail}
          onSetRecoveryEmail={onSetRecoveryEmail}
          onSendRecoveryEmail={onSendRecoveryEmail}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
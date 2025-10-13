import React from 'react';

import AdminHeader from '@/components/admin/AdminHeader';
import StatisticsCards from '@/components/admin/StatisticsCards';
import AdminTabs from '@/components/admin/AdminTabs';

import { useAdminData } from '@/hooks/useAdminData';
import { useOrdersActions } from '@/hooks/useOrdersActions';
import { useReviewsActions } from '@/hooks/useReviewsActions';
import { usePassengersActions } from '@/hooks/usePassengersActions';
import { useSettingsActions } from '@/hooks/useSettingsActions';

const Admin: React.FC = () => {
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
    updateOrderPrice
  } = useOrdersActions(orders, setOrders);

  const {
    deleteReview,
    publishReview,
    setFeaturedReview
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

        <AdminTabs
          orders={orders}
          reviews={reviews}
          passengers={passengers}
          contacts={contacts}
          notifications={notifications}
          onUpdateOrderStatus={updateOrderStatus}
          onUpdateOrderPrice={updateOrderPrice}
          onDeleteOrder={deleteOrder}
          onPublishReview={publishReview}
          onSetFeaturedReview={setFeaturedReview}
          onDeleteReview={deleteReview}
          onAddPassenger={addPassenger}
          onTogglePassengerPublish={togglePassengerPublish}
          onDeletePassenger={deletePassenger}
          onSaveContacts={handleSaveContacts}
          onSaveNotifications={handleSaveNotifications}
        />
      </div>
    </div>
  );
};

export default Admin;

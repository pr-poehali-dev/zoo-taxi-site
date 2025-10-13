import { useState, useEffect } from 'react';
import type { Order, Review, Passenger } from '@/components/admin/types';

export const useAdminData = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState({ 
    phone: '79685227272', 
    telegram: 'zootaxi_uyut', 
    whatsapp: '79685227272' 
  });
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

  return {
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
  };
};

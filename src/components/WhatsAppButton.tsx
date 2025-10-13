import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const WhatsAppButton = () => {
  const [phoneNumber, setPhoneNumber] = useState('79685227272');
  
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      const contacts = JSON.parse(savedContacts);
      setPhoneNumber(contacts.whatsapp || '79685227272');
    }
  }, []);
  
  const message = 'Здравствуйте! Хочу заказать зоотакси для моего питомца';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-4 z-50 opacity-0 animate-fade-in-right">
      <Button
        size="lg"
        className="rounded-full w-12 h-12 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        onClick={() => {
          if (navigator.vibrate) navigator.vibrate(50);
          window.open(whatsappUrl, '_blank');
        }}
        title="Написать в WhatsApp"
      >
        <Icon name="MessageCircle" size={20} />
      </Button>
    </div>
  );
};

export default WhatsAppButton;
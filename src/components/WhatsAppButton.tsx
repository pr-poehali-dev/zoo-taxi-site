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
    <div className="fixed bottom-5 right-3 z-50 opacity-0 animate-fade-in-right">
      <Button
        size="sm"
        className="rounded-full w-11 h-11 bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 p-0"
        onClick={() => {
          if (navigator.vibrate) navigator.vibrate(50);
          window.open(whatsappUrl, '_blank');
        }}
        title="Написать в WhatsApp"
      >
        <Icon name="MessageCircle" size={18} />
      </Button>
    </div>
  );
};

export default WhatsAppButton;
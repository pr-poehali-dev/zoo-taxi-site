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
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="rounded-full w-16 h-16 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
        onClick={() => window.open(whatsappUrl, '_blank')}
        title="Написать в WhatsApp"
      >
        <Icon name="MessageCircle" size={28} />
      </Button>
    </div>
  );
};

export default WhatsAppButton;
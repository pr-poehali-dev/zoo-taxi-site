import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const PhoneButton = () => {
  const [phoneNumber, setPhoneNumber] = useState('79685227272');
  
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      const contacts = JSON.parse(savedContacts);
      setPhoneNumber(contacts.phone || '79685227272');
    }
  }, []);

  return (
    <div className="fixed bottom-32 right-3 z-50 opacity-0 animate-fade-in-right animate-delay-200">
      <Button
        size="sm"
        className="rounded-full w-11 h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 p-0"
        onClick={() => {
          if (navigator.vibrate) navigator.vibrate(50);
          window.location.href = `tel:+${phoneNumber}`;
        }}
        title="Позвонить"
      >
        <Icon name="Phone" size={18} />
      </Button>
    </div>
  );
};

export default PhoneButton;
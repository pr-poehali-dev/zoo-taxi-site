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
    <div className="fixed bottom-36 right-6 z-50">
      <Button
        size="lg"
        className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        onClick={() => window.location.href = `tel:+${phoneNumber}`}
        title="Позвонить"
      >
        <Icon name="Phone" size={20} />
      </Button>
    </div>
  );
};

export default PhoneButton;

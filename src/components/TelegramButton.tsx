import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface TelegramButtonProps {
  username?: string;
  phoneNumber?: string;
  message?: string;
  className?: string;
}

const TelegramButton: React.FC<TelegramButtonProps> = ({ 
  username: propUsername,
  phoneNumber,
  message = 'Здравствуйте! Хочу заказать зоотакси',
  className = ''
}) => {
  const [username, setUsername] = useState(propUsername || 'zootaxi_uyut');
  
  useEffect(() => {
    if (!propUsername) {
      const savedContacts = localStorage.getItem('contacts');
      if (savedContacts) {
        const contacts = JSON.parse(savedContacts);
        setUsername(contacts.telegram || 'zootaxi_uyut');
      }
    }
  }, [propUsername]);
  const handleClick = () => {
    let telegramUrl = '';
    
    if (username) {
      telegramUrl = `https://t.me/${username}`;
      if (message) {
        telegramUrl += `?text=${encodeURIComponent(message)}`;
      }
    } else if (phoneNumber) {
      const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
      telegramUrl = `https://t.me/+${cleanPhone}`;
      if (message) {
        telegramUrl += `?text=${encodeURIComponent(message)}`;
      }
    }
    
    window.open(telegramUrl, '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      className={`fixed bottom-24 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 z-50 bg-[#0088cc] hover:bg-[#0077b5] ${className}`}
      title="Написать в Telegram"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-current text-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.093.036.306.02.472z"/>
      </svg>
    </Button>
  );
};

export default TelegramButton;
import { useState } from 'react';

interface Contacts {
  phone: string;
  telegram: string;
  whatsapp: string;
}

interface Notifications {
  telegram_enabled: boolean;
  telegram_chat_id: string;
  email_enabled: boolean;
  notification_email: string;
}

export const useSettingsActions = (
  contacts: Contacts,
  setContacts: React.Dispatch<React.SetStateAction<Contacts>>,
  notifications: Notifications,
  setNotifications: React.Dispatch<React.SetStateAction<Notifications>>
) => {
  const handleSaveContacts = (newContacts: Contacts) => {
    localStorage.setItem('contacts', JSON.stringify(newContacts));
    setContacts(newContacts);
  };

  const handleSaveNotifications = (newNotifications: Notifications) => {
    localStorage.setItem('notifications', JSON.stringify(newNotifications));
    setNotifications(newNotifications);
  };

  return {
    handleSaveContacts,
    handleSaveNotifications
  };
};

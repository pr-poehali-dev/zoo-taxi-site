import React from 'react';
import Icon from '@/components/ui/icon';

interface ContactsSectionProps {
  contacts: {
    phone: string;
    telegram: string;
    whatsapp: string;
  };
}

const ContactsSection: React.FC<ContactsSectionProps> = ({ contacts }) => {
  return (
    <section id="contacts" className="py-16 px-4">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Контакты</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="animate-fade-in">
            <Icon name="Phone" className="text-primary mb-4 mx-auto" size={48} />
            <h4 className="text-xl font-semibold mb-2">Телефон</h4>
            <p className="text-gray-600">+{contacts.phone}</p>
            <p className="text-sm text-gray-500">Круглосуточно</p>
          </div>
          <div className="animate-fade-in">
            <Icon name="Mail" className="text-primary mb-4 mx-auto" size={48} />
            <h4 className="text-xl font-semibold mb-2">Email</h4>
            <p className="text-gray-600">info@zootaxi.ru</p>
            <p className="text-sm text-gray-500">Ответим в течение часа</p>
          </div>
          <div className="animate-fade-in">
            <Icon name="MapPin" className="text-primary mb-4 mx-auto" size={48} />
            <h4 className="text-xl font-semibold mb-2">Работаем</h4>
            <p className="text-gray-600">По всей Москве и области</p>
            <p className="text-sm text-gray-500">Выезд в любую точку</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;

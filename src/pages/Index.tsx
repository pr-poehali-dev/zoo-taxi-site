import React, { useState, useEffect } from 'react';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import GallerySection from '@/components/sections/GallerySection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import PassengersGallery from '@/components/PassengersGallery';
import OrderForm from '@/components/OrderForm';
import FAQSection from '@/components/sections/FAQSection';
import ContactsSection from '@/components/sections/ContactsSection';
import Footer from '@/components/sections/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import TelegramButton from '@/components/TelegramButton';

const Index = () => {
  const [contacts, setContacts] = useState({ phone: '79685227272', telegram: 'zootaxi_uyut', whatsapp: '79685227272' });
  
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      <HeroSection contacts={contacts} />
      <ServicesSection />
      <GallerySection />
      <AdvantagesSection />
      <ReviewsSection />
      <PassengersGallery />
      
      <section id="booking" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-4">Оформить заказ</h2>
          <p className="text-center text-gray-600 mb-12">Заполните форму, и мы свяжемся с вами в ближайшее время</p>
          <OrderForm />
        </div>
      </section>

      <FAQSection />
      <ContactsSection contacts={contacts} />
      <Footer contacts={contacts} />
      
      <WhatsAppButton />
      <TelegramButton />
    </div>
  );
};

export default Index;
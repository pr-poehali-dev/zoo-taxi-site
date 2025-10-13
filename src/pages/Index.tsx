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
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Заказать поездку</h3>
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

import React, { useState, useEffect, useRef } from 'react';
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
import PhoneButton from '@/components/PhoneButton';

const Index = () => {
  const [contacts, setContacts] = useState({ phone: '79685227272', telegram: 'zootaxi_uyut', whatsapp: '79685227272' });
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
  
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setShowFloatingButtons(heroBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      <div id="hero">
        <HeroSection contacts={contacts} />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="gallery">
        <GallerySection />
      </div>
      <div id="advantages">
        <AdvantagesSection />
      </div>
      <div id="reviews">
        <ReviewsSection />
      </div>
      <div id="passengers">
        <PassengersGallery />
      </div>
      
      <section id="booking" className="py-12 md:py-16 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4">🚗 Оформить заказ</h2>
          <p className="text-center text-sm md:text-base text-gray-600 mb-8 md:mb-12 px-4">Заполните форму, и мы свяжемся с вами в ближайшее время</p>
          <OrderForm />
        </div>
      </section>

      <div id="faq">
        <FAQSection />
      </div>
      <div id="contacts">
        <ContactsSection contacts={contacts} />
      </div>
      <Footer contacts={contacts} />
      
      {showFloatingButtons && (
        <>
          <PhoneButton />
          <WhatsAppButton />
          <TelegramButton />
        </>
      )}
    </div>
  );
};

export default Index;
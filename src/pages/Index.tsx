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

const Index = () => {
  const [contacts, setContacts] = useState({ phone: '79685227272', telegram: 'zootaxi_uyut', whatsapp: '79685227272' });
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const swipeDistance = touchStartY.current - touchEndY.current;
      const minSwipeDistance = 50;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        const sections = [
          'hero',
          'services', 
          'gallery',
          'advantages',
          'reviews',
          'passengers',
          'booking',
          'faq',
          'contacts'
        ];

        const currentScrollPosition = window.scrollY;
        let currentSectionIndex = 0;

        for (let i = 0; i < sections.length; i++) {
          const element = document.getElementById(sections[i]);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            
            if (currentScrollPosition >= elementTop - 100) {
              currentSectionIndex = i;
            }
          }
        }

        if (swipeDistance > 0 && currentSectionIndex < sections.length - 1) {
          const nextSection = document.getElementById(sections[currentSectionIndex + 1]);
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else if (swipeDistance < 0 && currentSectionIndex > 0) {
          const prevSection = document.getElementById(sections[currentSectionIndex - 1]);
          if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    const container = containerRef.current;
    if (container && window.innerWidth <= 768) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove);
      container.addEventListener('touchend', handleTouchEnd);

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
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
      
      <WhatsAppButton />
      <TelegramButton />
      
      {/* Swipe indicator for mobile */}
      <div className="md:hidden fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
        <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
          <p className="text-white text-xs font-medium">👆 Свайп вверх/вниз для навигации</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

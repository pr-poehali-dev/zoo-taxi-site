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
  const [swipeIndicator, setSwipeIndicator] = useState<{ show: boolean; direction: 'up' | 'down' }>({ show: false, direction: 'up' });
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
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

  useEffect(() => {
    let isScrolling = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY.current = e.touches[0].clientY;
      const swipeDistance = touchStartY.current - touchEndY.current;
      
      if (Math.abs(swipeDistance) > 30) {
        setSwipeIndicator({ 
          show: true, 
          direction: swipeDistance > 0 ? 'up' : 'down' 
        });
      }
    };

    const smoothScrollToSection = (element: HTMLElement) => {
      if (isScrolling) return;
      isScrolling = true;
      
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    const handleTouchEnd = () => {
      setSwipeIndicator({ show: false, direction: 'up' });
      
      const swipeDistance = touchStartY.current - touchEndY.current;
      const minSwipeDistance = 80;

      if (Math.abs(swipeDistance) > minSwipeDistance && !isScrolling) {
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

        const currentScrollPosition = window.scrollY + 150;
        let currentSectionIndex = 0;

        for (let i = 0; i < sections.length; i++) {
          const element = document.getElementById(sections[i]);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            
            if (currentScrollPosition >= elementTop) {
              currentSectionIndex = i;
            }
          }
        }

        if (swipeDistance > 0 && currentSectionIndex < sections.length - 1) {
          const nextSection = document.getElementById(sections[currentSectionIndex + 1]);
          if (nextSection) {
            smoothScrollToSection(nextSection);
          }
        } else if (swipeDistance < 0 && currentSectionIndex > 0) {
          const prevSection = document.getElementById(sections[currentSectionIndex - 1]);
          if (prevSection) {
            smoothScrollToSection(prevSection);
          }
        }
      }
    };

    const container = containerRef.current;
    if (container && window.innerWidth <= 768) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
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
      
      {showFloatingButtons && (
        <>
          <PhoneButton />
          <WhatsAppButton />
          <TelegramButton />
        </>
      )}
      
      {swipeIndicator.show && (
        <div className="md:hidden fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div 
            className={`transition-all duration-300 ${
              swipeIndicator.direction === 'up' 
                ? 'animate-slide-up' 
                : 'animate-slide-down'
            }`}
          >
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg shadow-blue-500/50" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
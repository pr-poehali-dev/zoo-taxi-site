import { useEffect } from 'react';

export const useVisitTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch('https://functions.poehali.dev/00089f10-0d3b-4a9e-832b-94833ba4996f', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer
          })
        });
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    trackVisit();
  }, []);
};

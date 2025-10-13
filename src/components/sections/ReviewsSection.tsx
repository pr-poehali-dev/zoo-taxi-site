import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const ReviewsSection = () => {
  const [reviewName, setReviewName] = useState('');
  const [reviewPet, setReviewPet] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const reviews = [
    {
      id: 1,
      rating: 5,
      text: 'Отличный сервис! Водитель приехал точно в назначенное время, кот Мурзик перенес поездку к ветеринару без стресса. Обязательно буду пользоваться еще!',
      name: 'Анна К.',
      subtitle: 'Владелец кота'
    },
    {
      id: 2,
      rating: 5,
      text: 'Переезжали с собакой из одного конца города в другой. Все прошло идеально - собака была спокойна, водитель помог с переноской. Цены честные!',
      name: 'Михаил Д.',
      subtitle: 'Владелец собаки'
    },
    {
      id: 3,
      rating: 5,
      text: 'Срочно нужно было доставить кролика в ветклинику ночью. Приехали через 20 минут! Профессиональный подход и забота о животном на высоте.',
      name: 'Елена С.',
      subtitle: 'Владелец кролика'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewName || !reviewRating || !reviewText) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    setReviewSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/84a1dd5d-042b-48e9-89cf-dc09b9361aed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_name: reviewName,
          rating: reviewRating,
          content: reviewText,
          title: reviewPet ? `Отзыв от владельца ${reviewPet}` : 'Отзыв клиента'
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Спасибо за отзыв! Мы опубликуем его после модерации.');
        setReviewName('');
        setReviewPet('');
        setReviewRating(0);
        setReviewText('');
      } else {
        alert('Ошибка: ' + (result.error || 'Не удалось отправить отзыв'));
      }
    } catch (error) {
      console.error('Ошибка отправки отзыва:', error);
      alert('Ошибка подключения к серверу');
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-12 md:py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Отзывы клиентов</h3>
        
        <div className="max-w-4xl mx-auto relative">
          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <Card className="mx-auto max-w-2xl">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex mb-4 justify-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Icon key={i} name="Star" className="text-yellow-400 fill-current" size={24} />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 text-base md:text-lg text-center leading-relaxed">
                        "{review.text}"
                      </p>
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center mr-3">
                          <Icon name="User" size={24} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{review.name}</p>
                          <p className="text-sm text-gray-500">{review.subtitle}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full w-12 h-12 items-center justify-center hover:bg-primary hover:text-white transition-colors z-10"
            aria-label="Предыдущий отзыв"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full w-12 h-12 items-center justify-center hover:bg-primary hover:text-white transition-colors z-10"
            aria-label="Следующий отзыв"
          >
            <Icon name="ChevronRight" size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-primary w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8 md:mt-12">
          <div className="bg-primary/10 inline-block px-4 md:px-6 py-2 md:py-3 rounded-lg">
            <p className="text-sm md:text-base text-primary font-semibold">
              <Icon name="Star" className="inline mr-2" size={18} />
              4.9/5 - средняя оценка (более 1000 поездок)
            </p>
          </div>
        </div>

        <div className="mt-12 md:mt-16 max-w-2xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl md:text-2xl text-primary">Оставить отзыв</CardTitle>
              <CardDescription className="text-sm md:text-base">Поделитесь своим опытом использования зоотакси</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-4 md:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="review-name">Ваше имя</Label>
                  <Input 
                    id="review-name"
                    placeholder="Как к вам обращаться?"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="review-pet">Питомец</Label>
                  <Input 
                    id="review-pet"
                    placeholder="Кличка и тип питомца"
                    value={reviewPet}
                    onChange={(e) => setReviewPet(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label>Оценка</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon 
                      key={star}
                      name="Star" 
                      className={`cursor-pointer transition-colors ${
                        star <= reviewRating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300 hover:text-yellow-400'
                      }`}
                      size={24}
                      onClick={() => setReviewRating(star)}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="review-text">Ваш отзыв</Label>
                <Textarea 
                  id="review-text"
                  placeholder="Расскажите о вашем опыте поездки с питомцем..."
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>
              
              <Button 
                className="w-full py-6 md:py-7" 
                size="lg"
                onClick={handleSubmitReview}
                disabled={reviewSubmitting}
              >
                <Icon name="Send" size={20} className="mr-2" />
                {reviewSubmitting ? 'Отправка...' : 'Отправить отзыв'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
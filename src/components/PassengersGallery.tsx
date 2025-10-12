import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Passenger {
  id: number;
  pet_name?: string;
  pet_type?: string;
  photo_url: string;
  description?: string;
  is_published: boolean;
  created_at: string;
}

const PassengersGallery: React.FC = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/9b67e555-8059-4828-adf9-09677d9dacd0?published=true');
      const data = await response.json();
      setPassengers(data);
    } catch (error) {
      console.error('Ошибка загрузки галереи:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (passengers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Icon name="Heart" className="text-primary" size={36} />
            Наши пассажиры
          </h2>
          <p className="text-gray-600 text-lg">
            Счастливые питомцы, которым мы помогли добраться до нужного места
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {passengers.map((passenger) => (
            <Card key={passenger.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <img 
                  src={passenger.photo_url} 
                  alt={passenger.pet_name || 'Пассажир'} 
                  className="w-full h-full object-cover"
                />
              </div>
              {(passenger.pet_name || passenger.pet_type || passenger.description) && (
                <CardContent className="p-4">
                  <div className="space-y-1">
                    {passenger.pet_name && (
                      <h4 className="font-semibold text-lg">{passenger.pet_name}</h4>
                    )}
                    {passenger.pet_type && (
                      <p className="text-sm text-gray-600">{passenger.pet_type}</p>
                    )}
                    {passenger.description && (
                      <p className="text-sm text-gray-500 mt-2">{passenger.description}</p>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PassengersGallery;

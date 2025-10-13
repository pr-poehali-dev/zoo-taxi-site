import { useToast } from '@/components/ui/use-toast';
import type { Passenger } from '@/components/admin/types';

export const usePassengersActions = (
  passengers: Passenger[],
  setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>,
  loadData: () => void
) => {
  const { toast } = useToast();

  const addPassenger = async (passenger: { 
    pet_name: string; 
    pet_type: string; 
    photo_url: string; 
    description: string 
  }) => {
    try {
      const response = await fetch('https://functions.poehali.dev/9b67e555-8059-4828-adf9-09677d9dacd0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pet_name: passenger.pet_name,
          pet_type: passenger.pet_type,
          photo_url: passenger.photo_url,
          description: passenger.description,
          is_published: true
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: 'Фото добавлено',
          description: 'Фотография успешно добавлена в галерею',
        });
        loadData();
      } else {
        toast({
          title: 'Ошибка',
          description: result.error || 'Не удалось добавить фото',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка добавления фото:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  const deletePassenger = async (passengerId: number) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/9b67e555-8059-4828-adf9-09677d9dacd0?id=${passengerId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setPassengers(passengers.filter(p => p.id !== passengerId));
        toast({
          title: 'Фото удалено',
          description: 'Фотография удалена из галереи',
        });
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить фото',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка удаления фото:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  const togglePassengerPublish = async (passengerId: number, isPublished: boolean) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/9b67e555-8059-4828-adf9-09677d9dacd0?id=${passengerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          is_published: !isPublished
        })
      });
      
      if (response.ok) {
        setPassengers(passengers.map(p =>
          p.id === passengerId ? { ...p, is_published: !isPublished } : p
        ));
        toast({
          title: !isPublished ? 'Опубликовано' : 'Снято с публикации',
          description: 'Статус фотографии обновлен',
        });
      }
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус',
        variant: 'destructive',
      });
    }
  };

  return {
    addPassenger,
    deletePassenger,
    togglePassengerPublish
  };
};

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Icon from '@/components/ui/icon';
import type { Passenger } from './types';

interface PassengersTabProps {
  passengers: Passenger[];
  onAdd: (passenger: { pet_name: string; pet_type: string; photo_url: string; description: string }) => Promise<void>;
  onTogglePublish: (passengerId: number, isPublished: boolean) => void;
  onDelete: (passengerId: number) => void;
}

const PassengersTab: React.FC<PassengersTabProps> = ({ passengers, onAdd, onTogglePublish, onDelete }) => {
  const { toast } = useToast();
  const [newPassenger, setNewPassenger] = useState({ pet_name: '', pet_type: '', photo_url: '', description: '' });
  const [isAddingPassenger, setIsAddingPassenger] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите изображение',
        variant: 'destructive',
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Ошибка',
        description: 'Размер файла не должен превышать 5MB',
        variant: 'destructive',
      });
      return;
    }
    
    setUploadingImage(true);
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        
        try {
          const response = await fetch('https://functions.poehali.dev/db8d1360-2c62-4a15-b257-bfcaffb6d746', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              image: base64,
              filename: file.name
            })
          });
          
          const result = await response.json();
          
          if (response.ok) {
            setNewPassenger({...newPassenger, photo_url: result.url});
            toast({
              title: 'Фото загружено',
              description: `Размер: ${(result.size / 1024).toFixed(1)} KB`,
            });
          } else {
            toast({
              title: 'Ошибка загрузки',
              description: result.error || 'Не удалось загрузить фото',
              variant: 'destructive',
            });
          }
        } catch (error) {
          console.error('Ошибка загрузки:', error);
          toast({
            title: 'Ошибка',
            description: 'Не удалось загрузить фото',
            variant: 'destructive',
          });
        } finally {
          setUploadingImage(false);
        }
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Ошибка чтения файла:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось прочитать файл',
        variant: 'destructive',
      });
      setUploadingImage(false);
    }
  };

  const handleAddPassenger = async () => {
    if (!newPassenger.photo_url) {
      toast({
        title: 'Ошибка',
        description: 'Необходимо указать URL фотографии',
        variant: 'destructive',
      });
      return;
    }
    
    setIsAddingPassenger(true);
    await onAdd(newPassenger);
    setNewPassenger({ pet_name: '', pet_type: '', photo_url: '', description: '' });
    setIsAddingPassenger(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Image" size={24} />
              Галерея "Наши пассажиры"
            </CardTitle>
            <CardDescription>Управление фотографиями питомцев</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="Plus" size={20} />
            Добавить фото
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Кличка питомца"
              value={newPassenger.pet_name}
              onChange={(e) => setNewPassenger({...newPassenger, pet_name: e.target.value})}
            />
            <Input
              placeholder="Тип животного (собака, кошка...)"
              value={newPassenger.pet_type}
              onChange={(e) => setNewPassenger({...newPassenger, pet_type: e.target.value})}
            />
            
            <div className="md:col-span-2 space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block">
                    <div className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-white">
                      <Icon name={uploadingImage ? "Loader2" : "Upload"} size={20} className={`mr-2 ${uploadingImage ? 'animate-spin' : ''}`} />
                      <span className="text-sm font-medium">
                        {uploadingImage ? 'Загрузка...' : 'Загрузить фото с компьютера'}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-500">или</div>
              
              <Input
                placeholder="Вставьте URL фотографии"
                value={newPassenger.photo_url}
                onChange={(e) => setNewPassenger({...newPassenger, photo_url: e.target.value})}
              />
              
              {newPassenger.photo_url && (
                <div className="mt-3 p-2 border rounded-lg bg-white">
                  <p className="text-xs text-gray-500 mb-2">Предпросмотр:</p>
                  <img 
                    src={newPassenger.photo_url} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EОшибка%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              )}
            </div>
            
            <Textarea
              placeholder="Описание (необязательно)"
              value={newPassenger.description}
              onChange={(e) => setNewPassenger({...newPassenger, description: e.target.value})}
              className="md:col-span-2"
              rows={2}
            />
          </div>
          <Button 
            onClick={handleAddPassenger} 
            disabled={isAddingPassenger || !newPassenger.photo_url || uploadingImage}
            className="mt-4"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            {isAddingPassenger ? 'Добавление...' : 'Добавить фото'}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {passengers.map((passenger) => (
            <Card key={passenger.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img 
                  src={passenger.photo_url} 
                  alt={passenger.pet_name || 'Пассажир'} 
                  className="w-full h-full object-cover"
                />
                {!passenger.is_published && (
                  <Badge className="absolute top-2 right-2 bg-red-500">
                    Скрыто
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {passenger.pet_name && (
                    <h4 className="font-semibold">{passenger.pet_name}</h4>
                  )}
                  {passenger.pet_type && (
                    <p className="text-sm text-gray-600">{passenger.pet_type}</p>
                  )}
                  {passenger.description && (
                    <p className="text-sm text-gray-500">{passenger.description}</p>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant={passenger.is_published ? "outline" : "default"}
                      onClick={() => onTogglePublish(passenger.id, passenger.is_published)}
                    >
                      <Icon name={passenger.is_published ? "EyeOff" : "Eye"} size={14} className="mr-1" />
                      {passenger.is_published ? 'Скрыть' : 'Показать'}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Icon name="Trash2" size={14} className="mr-1" />
                          Удалить
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удалить фото?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Вы уверены, что хотите удалить это фото? Это действие нельзя отменить.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(passenger.id)}>
                            Удалить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {passengers.length === 0 && (
          <div className="text-center py-12">
            <Icon name="ImageOff" className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-500">Галерея пуста. Добавьте первое фото!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PassengersTab;

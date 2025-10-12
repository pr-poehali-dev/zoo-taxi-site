import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface Order {
  id: number;
  client_name: string;
  client_phone: string;
  client_email?: string;
  pet_name?: string;
  pet_type: string;
  pet_breed?: string;
  pet_weight?: number;
  pet_special_needs?: string;
  service_type: string;
  pickup_address: string;
  destination_address: string;
  preferred_date: string;
  preferred_time: string;
  additional_services?: string;
  comments?: string;
  estimated_price?: number;
  status: 'new' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

interface Review {
  id: number;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  rating: number;
  title?: string;
  content: string;
  service_type?: string;
  trip_date?: string;
  is_published: boolean;
  is_featured: boolean;
  moderator_notes?: string;
  created_at: string;
  published_at?: string;
  updated_at: string;
}

interface Passenger {
  id: number;
  pet_name?: string;
  pet_type?: string;
  photo_url: string;
  description?: string;
  is_published: boolean;
  created_at: string;
}

const Admin: React.FC = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);
  const [newPassenger, setNewPassenger] = useState({ pet_name: '', pet_type: '', photo_url: '', description: '' });
  const [isAddingPassenger, setIsAddingPassenger] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Фильтры
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [reviewStatusFilter, setReviewStatusFilter] = useState<string>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState<string>('');
  const [reviewSearchQuery, setReviewSearchQuery] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Загружаем заявки из API
      const ordersResponse = await fetch('https://functions.poehali.dev/1c0b122d-a5b5-4727-aaa6-681c30e9f3f3', {
        method: 'GET'
      });
      
      const ordersData = await ordersResponse.json();
      
      if (ordersResponse.ok) {
        setOrders(ordersData.orders || []);
      } else {
        console.error('Ошибка загрузки заявок:', ordersData.error);
        setOrders([]);
      }
      
      // Загружаем отзывы из API
      const reviewsResponse = await fetch('https://functions.poehali.dev/84a1dd5d-042b-48e9-89cf-dc09b9361aed', {
        method: 'GET'
      });
      
      const reviewsData = await reviewsResponse.json();
      
      if (reviewsResponse.ok) {
        setReviews(reviewsData.reviews || []);
      } else {
        console.error('Ошибка загрузки отзывов:', reviewsData.error);
        setReviews([]);
      }
      
      // Загружаем галерею
      const passengersResponse = await fetch('https://functions.poehali.dev/9b67e555-8059-4828-adf9-09677d9dacd0');
      const passengersData = await passengersResponse.json();
      
      if (passengersResponse.ok) {
        setPassengers(passengersData || []);
      } else {
        console.error('Ошибка загрузки галереи:', passengersData.error);
        setPassengers([]);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
    setLoading(false);
  };

  const deleteOrder = async (orderId: number) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/1c0b122d-a5b5-4727-aaa6-681c30e9f3f3?id=${orderId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setOrders(orders.filter(order => order.id !== orderId));
        toast({
          title: 'Заявка удалена',
          description: `Заявка #${orderId} успешно удалена`,
        });
      } else {
        console.error('Ошибка удаления заявки:', result.error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить заявку',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка сети при удалении заявки:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  const deleteReview = async (reviewId: number) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/84a1dd5d-042b-48e9-89cf-dc09b9361aed?id=${reviewId}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setReviews(reviews.filter(review => review.id !== reviewId));
        toast({
          title: 'Отзыв удален',
          description: `Отзыв #${reviewId} успешно удален`,
        });
      } else {
        console.error('Ошибка удаления отзыва:', result.error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить отзыв',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка сети при удалении отзыва:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: Order['status']) => {
    try {
      const response = await fetch('https://functions.poehali.dev/1c0b122d-a5b5-4727-aaa6-681c30e9f3f3', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: orderId,
          status: newStatus
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Обновляем локальное состояние
        setOrders(orders.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
            : order
        ));
        
        const statusLabels: Record<Order['status'], string> = {
          new: 'новая',
          confirmed: 'подтверждена',
          in_progress: 'в работе',
          completed: 'завершена',
          cancelled: 'отменена'
        };
        
        toast({
          title: 'Статус обновлен',
          description: `Заявка #${orderId} теперь ${statusLabels[newStatus]}`,
        });
      } else {
        console.error('Ошибка обновления статуса заявки:', result.error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось обновить статус заявки',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка сети при обновлении статуса:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  const publishReview = async (reviewId: number, publish: boolean) => {
    try {
      const response = await fetch('https://functions.poehali.dev/84a1dd5d-042b-48e9-89cf-dc09b9361aed', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          review_id: reviewId,
          is_published: publish
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Обновляем локальное состояние
        setReviews(reviews.map(review =>
          review.id === reviewId
            ? { 
                ...review, 
                is_published: publish, 
                published_at: publish ? new Date().toISOString() : undefined,
                updated_at: new Date().toISOString()
              }
            : review
        ));
        
        toast({
          title: publish ? 'Отзыв опубликован' : 'Отзыв скрыт',
          description: `Отзыв #${reviewId} ${publish ? 'теперь виден всем' : 'скрыт с сайта'}`,
        });
      } else {
        console.error('Ошибка публикации отзыва:', result.error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось изменить статус отзыва',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка сети при публикации отзыва:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите изображение',
        variant: 'destructive',
      });
      return;
    }
    
    // Проверка размера (макс 5MB)
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
      // Читаем файл как base64
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

  const addPassenger = async () => {
    if (!newPassenger.photo_url) {
      toast({
        title: 'Ошибка',
        description: 'Необходимо указать URL фотографии',
        variant: 'destructive',
      });
      return;
    }
    
    setIsAddingPassenger(true);
    try {
      const response = await fetch('https://functions.poehali.dev/9b67e555-8059-4828-adf9-09677d9dacd0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pet_name: newPassenger.pet_name,
          pet_type: newPassenger.pet_type,
          photo_url: newPassenger.photo_url,
          description: newPassenger.description,
          is_published: true
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast({
          title: 'Фото добавлено',
          description: 'Фотография успешно добавлена в галерею',
        });
        setNewPassenger({ pet_name: '', pet_type: '', photo_url: '', description: '' });
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
    setIsAddingPassenger(false);
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

  const setFeaturedReview = async (reviewId: number, featured: boolean) => {
    try {
      const response = await fetch('https://functions.poehali.dev/84a1dd5d-042b-48e9-89cf-dc09b9361aed', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          review_id: reviewId,
          is_featured: featured
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Обновляем локальное состояние
        setReviews(reviews.map(review =>
          review.id === reviewId
            ? { ...review, is_featured: featured, updated_at: new Date().toISOString() }
            : review
        ));
        
        toast({
          title: featured ? 'Добавлен в рекомендуемые' : 'Убран из рекомендуемых',
          description: `Отзыв #${reviewId} обновлен`,
        });
      } else {
        console.error('Ошибка обновления статуса рекомендуемого:', result.error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось обновить статус отзыва',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка сети при обновлении рекомендуемого:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-green-100 text-green-800', 
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    const labels = {
      new: 'Новая',
      confirmed: 'Подтверждена',
      in_progress: 'В работе',
      completed: 'Завершена',
      cancelled: 'Отменена'
    };

    return (
      <Badge className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;
    const matchesSearch = orderSearchQuery === '' || 
      order.client_name.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.client_phone.includes(orderSearchQuery) ||
      order.pet_name?.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.id.toString().includes(orderSearchQuery);
    return matchesStatus && matchesSearch;
  });

  const filteredReviews = reviews.filter(review => {
    let matchesStatus = true;
    if (reviewStatusFilter === 'published') matchesStatus = review.is_published;
    else if (reviewStatusFilter === 'unpublished') matchesStatus = !review.is_published;
    else if (reviewStatusFilter === 'featured') matchesStatus = review.is_featured;
    
    const matchesSearch = reviewSearchQuery === '' ||
      review.client_name.toLowerCase().includes(reviewSearchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(reviewSearchQuery.toLowerCase()) ||
      review.title?.toLowerCase().includes(reviewSearchQuery.toLowerCase()) ||
      review.id.toString().includes(reviewSearchQuery);
    
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold">Админ панель ЗооТакси УЮТ</h1>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={loadData}
                disabled={loading}
              >
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Обновить
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                <Icon name="Home" size={16} className="mr-2" />
                На главную
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Новые заявки</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {orders.filter(o => o.status === 'new').length}
                  </p>
                </div>
                <Icon name="FileText" className="text-blue-600" size={32} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">В работе</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {orders.filter(o => o.status === 'in_progress').length}
                  </p>
                </div>
                <Icon name="Clock" className="text-yellow-600" size={32} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Всего заявок</p>
                  <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                </div>
                <Icon name="BarChart3" className="text-gray-600" size={32} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Новые отзывы</p>
                  <p className="text-2xl font-bold text-green-600">
                    {reviews.filter(r => !r.is_published).length}
                  </p>
                </div>
                <Icon name="MessageSquare" className="text-green-600" size={32} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">
              <Icon name="Car" size={16} className="mr-2" />
              Заявки ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Icon name="Star" size={16} className="mr-2" />
              Отзывы ({reviews.length})
            </TabsTrigger>
            <TabsTrigger value="passengers">
              <Icon name="Image" size={16} className="mr-2" />
              Наши пассажиры ({passengers.length})
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Заявки на поездки</CardTitle>
                    <CardDescription>Управление заказами клиентов</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        placeholder="Поиск по имени, телефону, ID..."
                        value={orderSearchQuery}
                        onChange={(e) => setOrderSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <select 
                      value={orderStatusFilter} 
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    >
                      <option value="all">Все статусы</option>
                      <option value="new">Новые</option>
                      <option value="confirmed">Подтверждены</option>
                      <option value="in_progress">В работе</option>
                      <option value="completed">Завершены</option>
                      <option value="cancelled">Отменены</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">
                              Заявка #{order.id} - {order.client_name}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {new Date(order.created_at).toLocaleString('ru-RU')}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p><span className="font-medium">Питомец:</span> {order.pet_name} ({order.pet_type})</p>
                            <p><span className="font-medium">Услуга:</span> {order.service_type}</p>
                            <p><span className="font-medium">Телефон:</span> {order.client_phone}</p>
                          </div>
                          <div>
                            <p><span className="font-medium">Дата:</span> {order.preferred_date} в {order.preferred_time}</p>
                            <p><span className="font-medium">Откуда:</span> {order.pickup_address}</p>
                            <p><span className="font-medium">Куда:</span> {order.destination_address}</p>
                          </div>
                        </div>
                        
                        {order.comments && (
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm"><span className="font-medium">Комментарий:</span> {order.comments}</p>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <p className="text-lg font-semibold text-primary">
                            {order.estimated_price ? `${order.estimated_price} ₽` : 'Цена не указана'}
                          </p>
                          <div className="space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Icon name="Eye" size={14} className="mr-1" />
                              Подробнее
                            </Button>
                            {order.status === 'new' && (
                              <Button 
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'confirmed')}
                              >
                                Подтвердить
                              </Button>
                            )}
                            {order.status === 'confirmed' && (
                              <Button 
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'in_progress')}
                              >
                                В работу
                              </Button>
                            )}
                            {order.status === 'in_progress' && (
                              <Button 
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, 'completed')}
                              >
                                Завершить
                              </Button>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                >
                                  <Icon name="Trash2" size={14} className="mr-1" />
                                  Удалить
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Удалить заявку?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Вы уверены, что хотите удалить заявку #{order.id} от {order.client_name}? Это действие нельзя отменить.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteOrder(order.id)}>
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
                  
                  {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                      <Icon name="FileX" className="mx-auto mb-4 text-gray-400" size={48} />
                      <p className="text-gray-500">Заявок с выбранным статусом нет</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Отзывы клиентов</CardTitle>
                    <CardDescription>Модерация и публикация отзывов</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        placeholder="Поиск по имени, тексту, ID..."
                        value={reviewSearchQuery}
                        onChange={(e) => setReviewSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <select 
                      value={reviewStatusFilter} 
                      onChange={(e) => setReviewStatusFilter(e.target.value)}
                      className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    >
                      <option value="all">Все отзывы</option>
                      <option value="published">Опубликованные</option>
                      <option value="unpublished">Неопубликованные</option>
                      <option value="featured">Рекомендуемые</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredReviews.map((review) => (
                    <Card key={review.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{review.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-gray-600">{review.client_name}</span>
                              <div className="flex">{getStarRating(review.rating)}</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {review.is_published ? (
                              <Badge className="bg-green-100 text-green-800">Опубликован</Badge>
                            ) : (
                              <Badge className="bg-yellow-100 text-yellow-800">На модерации</Badge>
                            )}
                            {review.is_featured && (
                              <Badge className="bg-purple-100 text-purple-800">Рекомендуемый</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-gray-700 mb-2">{review.content}</p>
                          {review.service_type && (
                            <p className="text-sm text-gray-500">Услуга: {review.service_type}</p>
                          )}
                          {review.trip_date && (
                            <p className="text-sm text-gray-500">Дата поездки: {review.trip_date}</p>
                          )}
                        </div>
                        
                        {review.moderator_notes && (
                          <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
                            <p className="text-sm"><span className="font-medium">Заметка модератора:</span> {review.moderator_notes}</p>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Создан: {new Date(review.created_at).toLocaleString('ru-RU')}
                          </p>
                          <div className="space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedReview(review)}
                            >
                              <Icon name="Edit" size={14} className="mr-1" />
                              Редактировать
                            </Button>
                            {!review.is_published ? (
                              <Button 
                                size="sm"
                                onClick={() => publishReview(review.id, true)}
                              >
                                <Icon name="Eye" size={14} className="mr-1" />
                                Опубликовать
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => publishReview(review.id, false)}
                              >
                                <Icon name="EyeOff" size={14} className="mr-1" />
                                Скрыть
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant={review.is_featured ? "default" : "outline"}
                              onClick={() => setFeaturedReview(review.id, !review.is_featured)}
                            >
                              <Icon name="Star" size={14} className="mr-1" />
                              {review.is_featured ? 'Убрать из рек.' : 'В рекомендуемые'}
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                >
                                  <Icon name="Trash2" size={14} className="mr-1" />
                                  Удалить
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Удалить отзыв?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Вы уверены, что хотите удалить отзыв от {review.client_name}? Это действие нельзя отменить.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteReview(review.id)}>
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
                  
                  {filteredReviews.length === 0 && (
                    <div className="text-center py-12">
                      <Icon name="MessageSquareX" className="mx-auto mb-4 text-gray-400" size={48} />
                      <p className="text-gray-500">Отзывов с выбранным статусом нет</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Passengers Tab */}
          <TabsContent value="passengers">
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
                {/* Форма добавления фото */}
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
                    
                    {/* Загрузка фото */}
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
                    onClick={addPassenger} 
                    disabled={isAddingPassenger || !newPassenger.photo_url || uploadingImage}
                    className="mt-4"
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    {isAddingPassenger ? 'Добавление...' : 'Добавить фото'}
                  </Button>
                </div>

                {/* Галерея */}
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
                              onClick={() => togglePassengerPublish(passenger.id, passenger.is_published)}
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
                                  <AlertDialogAction onClick={() => deletePassenger(passenger.id)}>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
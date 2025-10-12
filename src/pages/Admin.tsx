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

const Admin: React.FC = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);

  // Фильтры
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [reviewStatusFilter, setReviewStatusFilter] = useState<string>('all');

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

  const filteredOrders = orders.filter(order => 
    orderStatusFilter === 'all' || order.status === orderStatusFilter
  );

  const filteredReviews = reviews.filter(review => {
    if (reviewStatusFilter === 'all') return true;
    if (reviewStatusFilter === 'published') return review.is_published;
    if (reviewStatusFilter === 'unpublished') return !review.is_published;
    if (reviewStatusFilter === 'featured') return review.is_featured;
    return true;
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">
              <Icon name="Car" size={16} className="mr-2" />
              Заявки ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Icon name="Star" size={16} className="mr-2" />
              Отзывы ({reviews.length})
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
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
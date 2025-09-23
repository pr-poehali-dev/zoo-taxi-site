import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // Фильтры
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [reviewStatusFilter, setReviewStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // В реальном приложении здесь будут API вызовы
      // Пока используем моковые данные для демонстрации
      const mockOrders: Order[] = [
        {
          id: 1,
          client_name: 'Анна Петрова',
          client_phone: '+7 (916) 123-45-67',
          client_email: 'anna@email.com',
          pet_name: 'Мурка',
          pet_type: 'кошка',
          pet_breed: 'Британская',
          pet_weight: 4.5,
          service_type: 'к ветеринару',
          pickup_address: 'ул. Тверская, 15',
          destination_address: 'Ветклиника "Айболит", ул. Садовая, 8',
          preferred_date: '2024-09-24',
          preferred_time: '14:00',
          comments: 'Кошка очень пугливая, нужна осторожность',
          estimated_price: 800,
          status: 'new',
          created_at: '2024-09-23T10:30:00',
          updated_at: '2024-09-23T10:30:00'
        },
        {
          id: 2,
          client_name: 'Михаил Соколов',
          client_phone: '+7 (903) 987-65-43',
          pet_name: 'Рекс',
          pet_type: 'собака',
          pet_breed: 'Немецкая овчарка',
          pet_weight: 35,
          service_type: 'экстренная помощь',
          pickup_address: 'ул. Ленина, 42',
          destination_address: '24-часовая ветклиника, проспект Мира, 100',
          preferred_date: '2024-09-23',
          preferred_time: '22:30',
          additional_services: 'Помочь донести собаку',
          comments: 'Собака не может ходить, травма лапы',
          estimated_price: 1200,
          status: 'confirmed',
          created_at: '2024-09-23T22:15:00',
          updated_at: '2024-09-23T22:20:00'
        }
      ];

      const mockReviews: Review[] = [
        {
          id: 5,
          client_name: 'Елена Васильева',
          client_email: 'elena@email.com',
          rating: 5,
          title: 'Очень довольна!',
          content: 'Отличный сервис! Водитель приехал вовремя, помог с переноской. Кот чувствовал себя комфортно. Рекомендую всем!',
          service_type: 'к ветеринару',
          trip_date: '2024-09-20',
          is_published: false,
          is_featured: false,
          created_at: '2024-09-20T16:45:00',
          updated_at: '2024-09-20T16:45:00'
        },
        {
          id: 6,
          client_name: 'Дмитрий Кузнецов',
          rating: 4,
          title: 'Хорошо, но есть замечания',
          content: 'В целом все прошло хорошо. Немного опоздали, но предупредили заранее. Автомобиль чистый, водитель вежливый.',
          service_type: 'в гостиницу',
          trip_date: '2024-09-21',
          is_published: false,
          is_featured: false,
          moderator_notes: 'Нужно уточнить про опоздание',
          created_at: '2024-09-21T12:30:00',
          updated_at: '2024-09-21T12:30:00'
        }
      ];

      setOrders(mockOrders);
      setReviews(mockReviews);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
    setLoading(false);
  };

  const updateOrderStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updated_at: new Date().toISOString() }
        : order
    ));
  };

  const publishReview = (reviewId: number, publish: boolean) => {
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
  };

  const setFeaturedReview = (reviewId: number, featured: boolean) => {
    setReviews(reviews.map(review =>
      review.id === reviewId
        ? { ...review, is_featured: featured, updated_at: new Date().toISOString() }
        : review
    ));
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
              <h1 className="text-2xl font-bold">Админ панель ЗооТакси</h1>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <Icon name="Home" size={16} className="mr-2" />
              На главную
            </Button>
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
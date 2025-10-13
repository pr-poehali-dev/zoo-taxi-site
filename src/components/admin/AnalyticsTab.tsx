import React, { useMemo, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import type { Order, Review } from './types';

interface AnalyticsTabProps {
  orders: Order[];
  reviews: Review[];
}

interface VisitStats {
  total_visits: number;
  unique_visitors: number;
  visits_today: number;
  visits_week: number;
  top_pages: Array<{ path: string; count: number }>;
  daily_stats: Array<{ date: string; count: number }>;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ orders, reviews }) => {
  const [visitStats, setVisitStats] = useState<VisitStats | null>(null);
  const [loadingVisits, setLoadingVisits] = useState(true);

  useEffect(() => {
    const fetchVisitStats = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/00089f10-0d3b-4a9e-832b-94833ba4996f');
        const data = await response.json();
        setVisitStats(data);
      } catch (error) {
        console.error('Failed to fetch visit stats:', error);
      } finally {
        setLoadingVisits(false);
      }
    };

    fetchVisitStats();
  }, []);

  const analytics = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const todayOrders = orders.filter(o => new Date(o.created_at) >= startOfToday);
    const weekOrders = orders.filter(o => new Date(o.created_at) >= startOfWeek);
    const monthOrders = orders.filter(o => new Date(o.created_at) >= startOfMonth);

    const completedOrders = orders.filter(o => o.status === 'completed');
    const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.estimated_price || 0), 0);
    const averageOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

    const conversionRate = orders.length > 0 
      ? ((orders.filter(o => o.status !== 'cancelled').length / orders.length) * 100).toFixed(1)
      : 0;

    const serviceTypeStats = orders.reduce((acc, order) => {
      acc[order.service_type] = (acc[order.service_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const petTypeStats = orders.reduce((acc, order) => {
      acc[order.pet_type] = (acc[order.pet_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statusDistribution = {
      new: orders.filter(o => o.status === 'new').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      in_progress: orders.filter(o => o.status === 'in_progress').length,
      completed: orders.filter(o => o.status === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
    };

    const averageRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    const publishedReviews = reviews.filter(r => r.is_published).length;

    const ordersByDay = orders.reduce((acc, order) => {
      const date = new Date(order.created_at).toLocaleDateString('ru-RU');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      return date.toLocaleDateString('ru-RU');
    }).reverse();

    const dailyOrdersChart = last7Days.map(date => ({
      date,
      count: ordersByDay[date] || 0
    }));

    return {
      todayOrders: todayOrders.length,
      weekOrders: weekOrders.length,
      monthOrders: monthOrders.length,
      totalOrders: orders.length,
      completedOrders: completedOrders.length,
      totalRevenue,
      averageOrderValue,
      conversionRate,
      serviceTypeStats,
      petTypeStats,
      statusDistribution,
      averageRating,
      publishedReviews,
      totalReviews: reviews.length,
      dailyOrdersChart
    };
  }, [orders, reviews]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Users" size={24} />
            Статистика посещений
          </CardTitle>
          <CardDescription>Посетители и просмотры сайта</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingVisits ? (
            <div className="text-center py-8 text-gray-500">
              <Icon name="Loader2" className="animate-spin mx-auto mb-2" size={32} />
              <p>Загрузка статистики...</p>
            </div>
          ) : visitStats ? (
            <div className="grid md:grid-cols-4 gap-4 md:gap-6">
              <div className="p-3 md:p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Eye" className="text-indigo-600" size={20} />
                  <span className="text-xs text-indigo-600 font-semibold">ВСЕГО</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-indigo-900">{visitStats.total_visits}</p>
                <p className="text-xs md:text-sm text-indigo-700">Просмотров</p>
              </div>

              <div className="p-3 md:p-4 bg-pink-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Users" className="text-pink-600" size={20} />
                  <span className="text-xs text-pink-600 font-semibold">УНИКАЛЬНЫЕ</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-pink-900">{visitStats.unique_visitors}</p>
                <p className="text-xs md:text-sm text-pink-700">Посетителей</p>
              </div>

              <div className="p-3 md:p-4 bg-cyan-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Calendar" className="text-cyan-600" size={20} />
                  <span className="text-xs text-cyan-600 font-semibold">СЕГОДНЯ</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-cyan-900">{visitStats.visits_today}</p>
                <p className="text-xs md:text-sm text-cyan-700">За сегодня</p>
              </div>

              <div className="p-3 md:p-4 bg-teal-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="TrendingUp" className="text-teal-600" size={20} />
                  <span className="text-xs text-teal-600 font-semibold">НЕДЕЛЯ</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-teal-900">{visitStats.visits_week}</p>
                <p className="text-xs md:text-sm text-teal-700">За 7 дней</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-red-500">
              <Icon name="AlertCircle" className="mx-auto mb-2" size={32} />
              <p>Не удалось загрузить статистику</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BarChart3" size={24} />
            Статистика заявок
          </CardTitle>
          <CardDescription>Ключевые показатели эффективности</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <div className="p-3 md:p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Icon name="Calendar" className="text-blue-600" size={20} />
                <span className="text-xs text-blue-600 font-semibold">СЕГОДНЯ</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-blue-900">{analytics.todayOrders}</p>
              <p className="text-xs md:text-sm text-blue-700">Заявок за сегодня</p>
            </div>

            <div className="p-3 md:p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Icon name="TrendingUp" className="text-green-600" size={20} />
                <span className="text-xs text-green-600 font-semibold">НЕДЕЛЯ</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-green-900">{analytics.weekOrders}</p>
              <p className="text-xs md:text-sm text-green-700">Заявок за 7 дней</p>
            </div>

            <div className="p-3 md:p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Icon name="CalendarDays" className="text-purple-600" size={20} />
                <span className="text-xs text-purple-600 font-semibold">МЕСЯЦ</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-purple-900">{analytics.monthOrders}</p>
              <p className="text-xs md:text-sm text-purple-700">Заявок за месяц</p>
            </div>

            <div className="p-3 md:p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Icon name="Percent" className="text-orange-600" size={20} />
                <span className="text-xs text-orange-600 font-semibold">КОНВЕРСИЯ</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-orange-900">{analytics.conversionRate}%</p>
              <p className="text-xs md:text-sm text-orange-700">Успешных заявок</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="DollarSign" size={20} />
              Финансовые показатели
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Общая выручка</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalRevenue.toLocaleString('ru-RU')} ₽</p>
              </div>
              <Icon name="TrendingUp" className="text-green-600" size={32} />
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Средний чек</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(analytics.averageOrderValue).toLocaleString('ru-RU')} ₽</p>
              </div>
              <Icon name="Calculator" className="text-blue-600" size={32} />
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Завершенных поездок</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.completedOrders}</p>
              </div>
              <Icon name="CheckCircle2" className="text-green-600" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="PieChart" size={20} />
              Распределение статусов
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Новые</span>
              </div>
              <span className="font-semibold">{analytics.statusDistribution.new}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Подтверждены</span>
              </div>
              <span className="font-semibold">{analytics.statusDistribution.confirmed}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">В работе</span>
              </div>
              <span className="font-semibold">{analytics.statusDistribution.in_progress}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-sm">Завершены</span>
              </div>
              <span className="font-semibold">{analytics.statusDistribution.completed}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Отменены</span>
              </div>
              <span className="font-semibold">{analytics.statusDistribution.cancelled}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Activity" size={20} />
            Заявки за последние 7 дней
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {analytics.dailyOrdersChart.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-sm text-gray-600 w-24">{day.date}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold transition-all duration-500"
                    style={{ width: `${Math.max((day.count / Math.max(...analytics.dailyOrdersChart.map(d => d.count), 1)) * 100, 5)}%` }}
                  >
                    {day.count > 0 && day.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Briefcase" size={20} />
              Популярные услуги
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(analytics.serviceTypeStats)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([service, count], index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{service}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(count / analytics.totalOrders) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-sm w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Dog" size={20} />
              Типы питомцев
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(analytics.petTypeStats)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([pet, count], index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{pet}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(count / analytics.totalOrders) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-sm w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Star" size={20} />
            Отзывы и репутация
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <div className="flex justify-center mb-2">
                <Icon name="Star" className="text-yellow-500 fill-current" size={40} />
              </div>
              <p className="text-4xl font-bold text-yellow-900 mb-2">{analytics.averageRating}</p>
              <p className="text-sm text-yellow-700">Средняя оценка</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="flex justify-center mb-2">
                <Icon name="ThumbsUp" className="text-green-600" size={40} />
              </div>
              <p className="text-4xl font-bold text-green-900 mb-2">{analytics.publishedReviews}</p>
              <p className="text-sm text-green-700">Опубликовано отзывов</p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="flex justify-center mb-2">
                <Icon name="MessageSquare" className="text-blue-600" size={40} />
              </div>
              <p className="text-4xl font-bold text-blue-900 mb-2">{analytics.totalReviews}</p>
              <p className="text-sm text-blue-700">Всего отзывов</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
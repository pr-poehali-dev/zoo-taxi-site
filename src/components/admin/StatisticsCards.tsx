import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import type { Order, Review } from './types';

interface StatisticsCardsProps {
  orders: Order[];
  reviews: Review[];
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ orders, reviews }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
      <Card>
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-600 truncate">Новые</p>
              <p className="text-xl md:text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'new').length}
              </p>
            </div>
            <Icon name="FileText" className="text-blue-600 self-end md:self-auto" size={20} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-600 truncate">В работе</p>
              <p className="text-xl md:text-2xl font-bold text-yellow-600">
                {orders.filter(o => o.status === 'in_progress').length}
              </p>
            </div>
            <Icon name="Clock" className="text-yellow-600 self-end md:self-auto" size={20} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-600 truncate">Всего</p>
              <p className="text-xl md:text-2xl font-bold text-gray-800">{orders.length}</p>
            </div>
            <Icon name="BarChart3" className="text-gray-600 self-end md:self-auto" size={20} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-3 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-600 truncate">Отзывы</p>
              <p className="text-xl md:text-2xl font-bold text-green-600">
                {reviews.filter(r => !r.is_published).length}
              </p>
            </div>
            <Icon name="MessageSquare" className="text-green-600 self-end md:self-auto" size={20} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCards;
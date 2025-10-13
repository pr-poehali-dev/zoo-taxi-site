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
  );
};

export default StatisticsCards;

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import type { Review } from './types';

interface ReviewsTabProps {
  reviews: Review[];
  onPublish: (reviewId: number, publish: boolean) => void;
  onSetFeatured: (reviewId: number, featured: boolean) => void;
  onDelete: (reviewId: number) => void;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ reviews, onPublish, onSetFeatured, onDelete }) => {
  const [reviewStatusFilter, setReviewStatusFilter] = useState<string>('all');
  const [reviewSearchQuery, setReviewSearchQuery] = useState<string>('');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

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

  return (
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
                        onClick={() => onPublish(review.id, true)}
                      >
                        <Icon name="Eye" size={14} className="mr-1" />
                        Опубликовать
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onPublish(review.id, false)}
                      >
                        <Icon name="EyeOff" size={14} className="mr-1" />
                        Скрыть
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant={review.is_featured ? "default" : "outline"}
                      onClick={() => onSetFeatured(review.id, !review.is_featured)}
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
                          <AlertDialogAction onClick={() => onDelete(review.id)}>
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
  );
};

export default ReviewsTab;

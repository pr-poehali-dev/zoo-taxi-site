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
      <CardHeader className="p-4 md:p-6">
        <div className="space-y-3 md:space-y-0 md:flex md:justify-between md:items-center">
          <div>
            <CardTitle className="text-lg md:text-xl">Отзывы клиентов</CardTitle>
            <CardDescription className="text-xs md:text-sm">Модерация и публикация отзывов</CardDescription>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Поиск..."
                value={reviewSearchQuery}
                onChange={(e) => setReviewSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-48"
              />
            </div>
            <select 
              value={reviewStatusFilter} 
              onChange={(e) => setReviewStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">Все отзывы</option>
              <option value="published">Опубликованные</option>
              <option value="unpublished">Неопубликованные</option>
              <option value="featured">Рекомендуемые</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <div className="space-y-3 md:space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 md:p-4">
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-base md:text-lg flex-1 line-clamp-2">{review.title}</h4>
                    <div className="flex gap-1 flex-shrink-0">
                      {review.is_published ? (
                        <Badge className="bg-green-100 text-green-800 text-xs">Опубл.</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">Модер.</Badge>
                      )}
                      {review.is_featured && (
                        <Badge className="bg-purple-100 text-purple-800 text-xs">TOP</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm md:text-base text-gray-600">{review.client_name}</span>
                    <div className="flex">{getStarRating(review.rating)}</div>
                  </div>
                </div>
                
                <div className="mb-3 md:mb-4">
                  <p className="text-sm md:text-base text-gray-700 mb-2 line-clamp-3 md:line-clamp-none">{review.content}</p>
                  {review.service_type && (
                    <p className="text-xs md:text-sm text-gray-500">Услуга: {review.service_type}</p>
                  )}
                  {review.trip_date && (
                    <p className="text-xs md:text-sm text-gray-500">Дата поездки: {review.trip_date}</p>
                  )}
                </div>
                
                {review.moderator_notes && (
                  <div className="mb-3 md:mb-4 p-2 md:p-3 bg-yellow-50 border-l-4 border-yellow-400">
                    <p className="text-xs md:text-sm"><span className="font-medium">Заметка модератора:</span> {review.moderator_notes}</p>
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                  <p className="text-xs md:text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' })}
                  </p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedReview(review)}
                      className="text-xs md:text-sm px-2 md:px-3"
                    >
                      <Icon name="Edit" size={14} className="md:mr-1" />
                      <span className="hidden sm:inline">Редактировать</span>
                    </Button>
                    {!review.is_published ? (
                      <Button 
                        size="sm"
                        onClick={() => onPublish(review.id, true)}
                        className="text-xs md:text-sm px-2 md:px-3"
                      >
                        <Icon name="Eye" size={14} className="md:mr-1" />
                        <span className="hidden sm:inline">Опубликовать</span>
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onPublish(review.id, false)}
                        className="text-xs md:text-sm px-2 md:px-3"
                      >
                        <Icon name="EyeOff" size={14} className="md:mr-1" />
                        <span className="hidden sm:inline">Скрыть</span>
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant={review.is_featured ? "default" : "outline"}
                      onClick={() => onSetFeatured(review.id, !review.is_featured)}
                      className="text-xs md:text-sm px-2 md:px-3"
                    >
                      <Icon name="Star" size={14} className="md:mr-1" />
                      <span className="hidden lg:inline">{review.is_featured ? 'Убрать' : 'TOP'}</span>
                      <span className="lg:hidden">TOP</span>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="text-xs md:text-sm px-2 md:px-3"
                        >
                          <Icon name="Trash2" size={14} className="md:mr-1" />
                          <span className="hidden sm:inline">Удалить</span>
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
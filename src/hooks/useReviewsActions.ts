import { useToast } from '@/components/ui/use-toast';
import type { Review } from '@/components/admin/types';

export const useReviewsActions = (
  reviews: Review[],
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>
) => {
  const { toast } = useToast();

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

  const publishReview = async (reviewId: number, publish: boolean) => {
    try {
      const response = await fetch('https://functions.poehali.dev/84a1dd5d-042b-48e9-89cf-dc09b9361aed', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: reviewId,
          is_published: publish
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
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
          id: reviewId,
          is_featured: featured
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
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

  const replyToReview = async (reviewId: number, adminReply: string, replyAuthor: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/84a1dd5d-042b-48e9-89cf-dc09b9361aed', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: reviewId,
          admin_reply: adminReply,
          reply_author: replyAuthor
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setReviews(reviews.map(review =>
          review.id === reviewId
            ? { 
                ...review, 
                admin_reply: adminReply,
                reply_author: replyAuthor,
                replied_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            : review
        ));
        
        toast({
          title: 'Ответ отправлен',
          description: `Ваш ответ на отзыв #${reviewId} сохранен`,
        });
      } else {
        console.error('Ошибка отправки ответа:', result.error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось отправить ответ',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Ошибка сети при отправке ответа:', error);
      toast({
        title: 'Ошибка сети',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    }
  };

  return {
    deleteReview,
    publishReview,
    setFeaturedReview,
    replyToReview
  };
};
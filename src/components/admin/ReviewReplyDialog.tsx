import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import type { Review } from './types';

interface ReviewReplyDialogProps {
  review: Review | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (reviewId: number, adminReply: string, replyAuthor: string) => void;
}

const ReviewReplyDialog: React.FC<ReviewReplyDialogProps> = ({
  review,
  isOpen,
  onClose,
  onSave
}) => {
  const [adminReply, setAdminReply] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('Администратор');

  useEffect(() => {
    if (review) {
      setAdminReply(review.admin_reply || '');
      setReplyAuthor(review.reply_author || 'Администратор');
    }
  }, [review]);

  const handleSave = () => {
    if (review && adminReply.trim()) {
      onSave(review.id, adminReply, replyAuthor);
      onClose();
    }
  };

  if (!review) return null;

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ответ на отзыв</DialogTitle>
          <DialogDescription>
            Отзыв #{review.id} от {review.client_name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex">{getRatingStars(review.rating)}</div>
              <span className="text-sm text-gray-600">
                {new Date(review.created_at).toLocaleDateString('ru-RU')}
              </span>
            </div>
            
            {review.title && (
              <h4 className="font-semibold">{review.title}</h4>
            )}
            
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{review.content}</p>
            
            {review.service_type && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Icon name="Car" size={12} />
                <span>{review.service_type}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reply_author">Автор ответа *</Label>
            <Input
              id="reply_author"
              placeholder="Имя или должность"
              value={replyAuthor}
              onChange={(e) => setReplyAuthor(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin_reply">Ваш ответ *</Label>
            <Textarea
              id="admin_reply"
              placeholder="Напишите ответ клиенту..."
              value={adminReply}
              onChange={(e) => setAdminReply(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              Ответ будет виден всем посетителям сайта под отзывом клиента
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button
            onClick={handleSave}
            disabled={!adminReply.trim() || !replyAuthor.trim()}
          >
            <Icon name="Send" size={16} className="mr-2" />
            Отправить ответ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewReplyDialog;

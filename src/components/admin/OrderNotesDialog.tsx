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
import { Label } from '@/components/ui/label';
import type { Order } from './types';

interface OrderNotesDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (orderId: number, adminNotes: string, cancellationReason?: string) => void;
  mode: 'notes' | 'cancel';
}

const OrderNotesDialog: React.FC<OrderNotesDialogProps> = ({
  order,
  isOpen,
  onClose,
  onSave,
  mode
}) => {
  const [adminNotes, setAdminNotes] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');

  useEffect(() => {
    if (order) {
      setAdminNotes(order.admin_notes || '');
      setCancellationReason(order.cancellation_reason || '');
    }
  }, [order]);

  const handleSave = () => {
    if (order) {
      if (mode === 'cancel') {
        onSave(order.id, adminNotes, cancellationReason);
      } else {
        onSave(order.id, adminNotes);
      }
      onClose();
    }
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === 'cancel' ? 'Отмена заказа' : 'Комментарий к заказу'}
          </DialogTitle>
          <DialogDescription>
            Заказ №{order.id} от {order.client_name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {mode === 'cancel' && (
            <div className="space-y-2">
              <Label htmlFor="cancellation_reason">Причина отмены *</Label>
              <Textarea
                id="cancellation_reason"
                placeholder="Укажите причину отмены заказа..."
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="admin_notes">
              {mode === 'cancel' ? 'Дополнительные комментарии' : 'Комментарий администратора'}
            </Label>
            <Textarea
              id="admin_notes"
              placeholder="Добавьте комментарий к заказу..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button
            onClick={handleSave}
            disabled={mode === 'cancel' && !cancellationReason.trim()}
          >
            {mode === 'cancel' ? 'Отменить заказ' : 'Сохранить'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderNotesDialog;

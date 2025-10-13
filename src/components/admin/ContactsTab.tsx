import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Icon from '@/components/ui/icon';

interface ContactsTabProps {
  contacts: { phone: string; telegram: string; whatsapp: string };
  onSave: (contacts: { phone: string; telegram: string; whatsapp: string }) => void;
}

const ContactsTab: React.FC<ContactsTabProps> = ({ contacts, onSave }) => {
  const { toast } = useToast();
  const [editingContacts, setEditingContacts] = useState(false);
  const [localContacts, setLocalContacts] = useState(contacts);

  const handleSave = () => {
    onSave(localContacts);
    setEditingContacts(false);
    toast({
      title: 'Контакты сохранены',
      description: 'Изменения будут применены после перезагрузки страницы',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Phone" size={24} />
          Контакты для связи
        </CardTitle>
        <CardDescription>Управление номерами телефонов и мессенджеров</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {editingContacts ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Icon name="Phone" size={16} className="inline mr-2" />
                  Номер телефона
                </label>
                <Input
                  placeholder="79685227272"
                  value={localContacts.phone}
                  onChange={(e) => setLocalContacts({...localContacts, phone: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Формат: 79685227272 (без +)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Icon name="Send" size={16} className="inline mr-2" />
                  Telegram username
                </label>
                <Input
                  placeholder="zootaxi_uyut"
                  value={localContacts.telegram}
                  onChange={(e) => setLocalContacts({...localContacts, telegram: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Без символа @</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Icon name="MessageCircle" size={16} className="inline mr-2" />
                  WhatsApp номер
                </label>
                <Input
                  placeholder="79685227272"
                  value={localContacts.whatsapp}
                  onChange={(e) => setLocalContacts({...localContacts, whatsapp: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Формат: 79685227272 (без +)</p>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSave}>
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить
                </Button>
                <Button variant="outline" onClick={() => setEditingContacts(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="Phone" className="text-primary" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">Телефон</p>
                        <p className="font-semibold text-lg">+{contacts.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="Send" className="text-[#0088cc]" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">Telegram</p>
                        <p className="font-semibold text-lg">@{contacts.telegram}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="MessageCircle" className="text-green-600" size={24} />
                      <div>
                        <p className="text-sm text-gray-600">WhatsApp</p>
                        <p className="font-semibold text-lg">+{contacts.whatsapp}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Button onClick={() => setEditingContacts(true)}>
                <Icon name="Edit" size={16} className="mr-2" />
                Изменить контакты
              </Button>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Icon name="Info" size={18} className="text-blue-600" />
                  Где используются контакты:
                </h4>
                <ul className="text-sm text-gray-700 space-y-1 ml-6 list-disc">
                  <li>Кнопки на главной странице (Hero секция)</li>
                  <li>Плавающие кнопки WhatsApp и Telegram</li>
                  <li>Контакты в футере сайта</li>
                  <li>Номер телефона для звонков</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactsTab;

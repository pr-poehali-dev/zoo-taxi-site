import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const GallerySection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Как мы перевозим ваших питомцев</h3>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Каждое животное путешествует в комфортных и безопасных условиях, подходящих именно для его размера и характера
        </p>
        
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src="/img/3b3afc5d-3b86-4e79-b119-1bc6b8f326a6.jpg"
                alt="Собака, кошка и кролик в багажнике автомобиля"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-6">
              <h4 className="font-semibold text-xl mb-4">Индивидуальный подход к каждому питомцу</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Icon name="Dog" className="text-primary mx-auto mb-2" size={32} />
                  <h5 className="font-semibold mb-2">Собаки</h5>
                  <p className="text-gray-600 text-sm">Крупные собаки путешествуют свободно в просторном багажнике с нескользящим покрытием</p>
                </div>
                <div className="text-center">
                  <Icon name="Cat" className="text-primary mx-auto mb-2" size={32} />
                  <p className="font-semibold mb-2">Кошки</p>
                  <p className="text-gray-600 text-sm">В удобных переносках с хорошей вентиляцией для снижения стресса</p>
                </div>
                <div className="text-center">
                  <Icon name="Rabbit" className="text-primary mx-auto mb-2" size={32} />
                  <p className="font-semibold mb-2">Мелкие питомцы</p>
                  <p className="text-gray-600 text-sm">Кролики, птицы и хорьки в специальных переносках с мягкой подстилкой</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Icon name="Thermometer" className="text-primary mx-auto mb-2" size={32} />
              <p className="font-semibold text-sm">Климат-контроль</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Icon name="Shield" className="text-primary mx-auto mb-2" size={32} />
              <p className="font-semibold text-sm">Безопасность</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Icon name="Heart" className="text-primary mx-auto mb-2" size={32} />
              <p className="font-semibold text-sm">Забота о питомцах</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Icon name="CheckCircle" className="text-primary mx-auto mb-2" size={32} />
              <p className="font-semibold text-sm">Проверенное оборудование</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

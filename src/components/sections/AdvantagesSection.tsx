import React from 'react';
import Icon from '@/components/ui/icon';

const AdvantagesSection = () => {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Почему выбирают нас</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center animate-fade-in">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" className="text-primary" size={32} />
            </div>
            <h4 className="text-lg font-semibold mb-2">Безопасность</h4>
            <p className="text-gray-600">Специально оборудованные автомобили с переносками и защитными барьерами</p>
          </div>
          <div className="text-center animate-fade-in">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Clock" className="text-primary" size={32} />
            </div>
            <h4 className="text-lg font-semibold mb-2">Круглосуточно</h4>
            <p className="text-gray-600">Работаем 24/7, включая выходные и праздники. Подача в течение 30 минут</p>
          </div>
          <div className="text-center animate-fade-in">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="UserCheck" className="text-primary" size={32} />
            </div>
            <h4 className="text-lg font-semibold mb-2">Опыт</h4>
            <p className="text-gray-600">Водители с опытом работы с животными и специальной подготовкой</p>
          </div>
          <div className="text-center animate-fade-in">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Thermometer" className="text-primary" size={32} />
            </div>
            <h4 className="text-lg font-semibold mb-2">Комфорт</h4>
            <p className="text-gray-600">Климат-контроль, мягкие переноски и минимум стресса для питомца</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
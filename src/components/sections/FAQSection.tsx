import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-3xl">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Частые вопросы</h3>
        <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
          <AccordionItem value="item-1" className="bg-white rounded-lg px-4 md:px-6">
            <AccordionTrigger className="text-left">
              Какие животные могут пользоваться зоотакси?
            </AccordionTrigger>
            <AccordionContent>
              Мы перевозим собак, кошек, птиц, грызунов и других домашних животных. 
              Для крупных или экзотических животных уточните возможность перевозки по телефону.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-white rounded-lg px-4 md:px-6">
            <AccordionTrigger className="text-left text-sm md:text-base">
              Нужна ли переноска для питомца?
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base">
              У нас есть переноски разных размеров в каждом автомобиле. Вы можете использовать 
              свою переноску или воспользоваться нашей бесплатно.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-white rounded-lg px-4 md:px-6">
            <AccordionTrigger className="text-left text-sm md:text-base">
              Как быстро подается автомобиль?
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base">
              Обычная подача - в течение 30 минут. За доплату 50% можем подать автомобиль 
              в течение 15 минут (опция "срочная подача").
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-white rounded-lg px-4 md:px-6">
            <AccordionTrigger className="text-left text-sm md:text-base">
              Могу ли я ехать вместе с питомцем?
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base">
              Конечно! Вы можете сопровождать своего питомца во время поездки. 
              Это часто помогает животному чувствовать себя спокойнее.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="bg-white rounded-lg px-4 md:px-6">
            <AccordionTrigger className="text-left text-sm md:text-base">
              Какие способы оплаты принимаются?
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base">
              Принимаем наличные, банковские карты и переводы через СБП. 
              Оплата производится после завершения поездки.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="bg-white rounded-lg px-4 md:px-6">
            <AccordionTrigger className="text-left text-sm md:text-base">
              Что делать, если питомец заболел в дороге?
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base">
              Наши водители прошли базовую подготовку по оказанию первой помощи животным. 
              В экстренных случаях мы можем изменить маршрут к ближайшей ветклинике.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="bg-white rounded-lg px-4 md:px-6">
            <AccordionTrigger className="text-left text-sm md:text-base">
              Работаете ли вы в праздники и выходные?
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base">
              Да, мы работаем круглосуточно 7 дней в неделю, включая все праздники. 
              В выходные действует доплата 20%.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="bg-white rounded-lg px-4 md:px-6">
            <AccordionTrigger className="text-left">
              Можно ли отменить заказ?
            </AccordionTrigger>
            <AccordionContent>
              Заказ можно отменить бесплатно до момента подачи автомобиля. 
              После подачи взимается 50% от стоимости базового тарифа.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
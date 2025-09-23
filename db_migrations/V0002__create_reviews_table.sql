-- Создание таблицы для отзывов клиентов
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    
    -- Информация о клиенте
    client_name VARCHAR(100) NOT NULL,
    client_email VARCHAR(100),
    client_phone VARCHAR(20),
    
    -- Содержание отзыва
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5), -- оценка от 1 до 5
    title VARCHAR(150), -- заголовок отзыва
    content TEXT NOT NULL, -- текст отзыва
    
    -- Информация о поездке
    service_type VARCHAR(50), -- тип услуги, которую оценивает клиент
    trip_date DATE, -- дата поездки
    
    -- Модерация
    is_published BOOLEAN DEFAULT false, -- опубликован ли отзыв
    is_featured BOOLEAN DEFAULT false, -- рекомендуемый отзыв для главной страницы
    moderator_notes TEXT, -- заметки модератора
    
    -- Техническая информация
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP, -- дата публикации
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для быстрого поиска
CREATE INDEX idx_reviews_published ON reviews(is_published);
CREATE INDEX idx_reviews_featured ON reviews(is_featured);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);

-- Вставка нескольких примеров отзывов для демонстрации
INSERT INTO reviews (client_name, rating, title, content, service_type, trip_date, is_published, is_featured, published_at) VALUES 
(
    'Анна Петрова', 
    5, 
    'Отличный сервис!', 
    'Очень довольна поездкой к ветеринару с моей кошкой Мурой. Водитель приехал вовремя, автомобиль чистый, переноска удобная. Кошка не стрессовала во время поездки. Обязательно буду пользоваться услугами снова!', 
    'к ветеринару', 
    '2024-09-15', 
    true, 
    true,
    CURRENT_TIMESTAMP
),
(
    'Михаил Сидоров', 
    5, 
    'Профессиональный подход', 
    'Перевозили собаку крупной породы (лабрадор) в ветклинику на операцию. Все прошло отлично - и машина подходящая, и водитель знает, как обращаться с животными. Цена адекватная. Рекомендую!', 
    'к ветеринару', 
    '2024-09-10', 
    true, 
    true,
    CURRENT_TIMESTAMP
),
(
    'Елена Козлова', 
    4, 
    'Хороший сервис', 
    'Заказывала зоотакси для поездки с попугаем к ветеринару. Все прошло хорошо, единственное - немного опоздали, но предупредили заранее. В целом довольна.', 
    'к ветеринару', 
    '2024-09-08', 
    true, 
    false,
    CURRENT_TIMESTAMP
),
(
    'Дмитрий Волков', 
    5, 
    'Спасли в экстренной ситуации', 
    'Ночью собаке стало плохо, срочно нужно было в ветклинику. Зоотакси приехало через 15 минут! Водитель помог донести собаку, очень благодарен за оперативность и человечность.', 
    'экстренная помощь', 
    '2024-09-05', 
    true, 
    true,
    CURRENT_TIMESTAMP
);
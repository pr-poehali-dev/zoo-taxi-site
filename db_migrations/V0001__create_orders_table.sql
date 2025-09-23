-- Создание таблицы для заявок клиентов на услуги зоотакси
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    
    -- Контактная информация клиента
    client_name VARCHAR(100) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    client_email VARCHAR(100),
    
    -- Информация о питомце
    pet_name VARCHAR(50),
    pet_type VARCHAR(50) NOT NULL, -- собака, кошка, птица и т.д.
    pet_breed VARCHAR(100),
    pet_weight DECIMAL(5,2), -- вес в кг
    pet_special_needs TEXT, -- особые потребности (лекарства, поведение и т.д.)
    
    -- Детали поездки
    service_type VARCHAR(50) NOT NULL, -- к ветеринару, в гостиницу, домой и т.д.
    pickup_address TEXT NOT NULL,
    destination_address TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    
    -- Дополнительная информация
    additional_services TEXT, -- дополнительные услуги
    comments TEXT, -- комментарии клиента
    estimated_price DECIMAL(10,2), -- предварительная стоимость
    
    -- Статус заявки
    status VARCHAR(20) DEFAULT 'new', -- new, confirmed, in_progress, completed, cancelled
    
    -- Техническая информация
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для быстрого поиска
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(preferred_date);
CREATE INDEX idx_orders_phone ON orders(client_phone);
CREATE INDEX idx_orders_created_at ON orders(created_at);
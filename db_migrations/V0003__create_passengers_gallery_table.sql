-- Создание таблицы для галереи пассажиров (фото питомцев)
CREATE TABLE IF NOT EXISTS passengers_gallery (
    id SERIAL PRIMARY KEY,
    pet_name VARCHAR(255),
    pet_type VARCHAR(100),
    photo_url TEXT NOT NULL,
    description TEXT,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индекс для быстрой выборки опубликованных фото
CREATE INDEX idx_passengers_published ON passengers_gallery(is_published, created_at DESC);
ALTER TABLE reviews 
ADD COLUMN admin_reply TEXT,
ADD COLUMN reply_author VARCHAR(255),
ADD COLUMN replied_at TIMESTAMP;
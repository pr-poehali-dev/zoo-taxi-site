CREATE TABLE IF NOT EXISTS analytics (
    id SERIAL PRIMARY KEY,
    visitor_ip VARCHAR(100),
    user_agent TEXT,
    page_path VARCHAR(500),
    referrer VARCHAR(1000),
    visited_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_visited_at ON analytics(visited_at);
CREATE INDEX IF NOT EXISTS idx_analytics_visitor_ip ON analytics(visitor_ip);
CREATE INDEX IF NOT EXISTS idx_analytics_page_path ON analytics(page_path);
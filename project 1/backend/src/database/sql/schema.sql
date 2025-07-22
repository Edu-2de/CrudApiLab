CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY
  first_name VARCHAR(100) NOT NULL,
  second_name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK(role IN ('full_access', 'limit_access', 'user')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO users (first_name, second_name, email, password_hash, role)VALUES
('Alex', 'Mind', 'alexmind@gmail.com', '$2b$10$hxrKnQby/FyLhdEjrOpc5OqUg2t9hvQ66tAPTq1InkPtnOlb4Spn6', 'full_access')
ON CONFLICT (email) DO NOTHING;
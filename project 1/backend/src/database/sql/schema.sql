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
('Alex', 'Mind', 'alexmind@gmail.com', '$2b$10$o3Lx9SXG2xPq7pYLzaUq/uVWxioqy4mI/Q9BWMxJRTwE6CJGbBvzy', 'full_access')
ON CONFLICT (email) DO NOTHING;

INSERT INTO users(first_name, second_name, email, password_hash, role)VALUES
('Val', 'Banding', 'vanbanding@gmail.com','$2b$10$6E07uTkNqMJtfMwmkRE1EuAK38BFxCmihM7Tuf3MVuCJgiN8dMPOK',  'limit_access')
ON CONFLICT (email) DO NOTHING;

INSERT INTO users(first_name, second_name, email, password_hash, role)VALUES
('Mario', 'Bros', 'mariobros@gmail.com','$2b$10$3MQb43.Blm.Ypl2TviJMzu7O87J5Lk2QieT8fsGsrCOf4RXunu67G',  'user')


CREATE TABLE IF NOT EXISTS account_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) UNIQUE DEFAULT 'basic' CHECK(type IN ('basic', 'advanced', 'premium')),
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY
  first_name VARCHAR(100) NOT NULL,
  second_name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK(role IN ('full_access', 'limit_access', 'user')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (first_name, second_name, email, password_hash, role)VALUES
('Alex', 'Mind', 'alexmind@gmail.com', '$2b$10$o3Lx9SXG2xPq7pYLzaUq/uVWxioqy4mI/Q9BWMxJRTwE6CJGbBvzy', 'full_access')
ON CONFLICT (email) DO NOTHING;

INSERT INTO users(first_name, second_name, email, password_hash, role)VALUES
('Val', 'Banding', 'vanbanding@gmail.com','$2b$10$6E07uTkNqMJtfMwmkRE1EuAK38BFxCmihM7Tuf3MVuCJgiN8dMPOK',  'limit_access')
ON CONFLICT (email) DO NOTHING;

INSERT INTO users(first_name, second_name, email, password_hash, role)VALUES
('Mario', 'Bros', 'mariobros@gmail.com','$2b$10$3MQb43.Blm.Ypl2TviJMzu7O87J5Lk2QieT8fsGsrCOf4RXunu67G',  'user')
ON CONFLICT (email) DO NOTHING;


CREATE TABLE IF NOT EXISTS professionals(
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE SET NULL,
  bio VARCHAR(100),
  area_of_expertise VARCHAR(20) NOT NULL
);

INSERT INTO professionals(user_id, bio, area_of_expertise)VALUES
('1', 'I have 40 years old and i love dogs', 'science')
ON CONFLICT (user_id) DO NOTHING;


CREATE TABLE IF NOT EXISTS courses(
  id SERIAL PRIMARY KEY,
  title VARCHAR(20) NOT NULL,
  description VARCHAR(100),
  price DECIMAL(10,2) NOT NULL,
  professional_id INTEGER UNIQUE REFERENCES professionals(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

INSERT INTO courses(title, description, price, professional_id)VALUES
('MeiCourse', 'Course for meis', 200.00, 1)
ON CONFLICT (professional_id) DO NOTHING;



CREATE TABLE IF NOT EXISTS enrollments(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  course_id INTEGER REFERENCES courses(id) ON DELETE SET NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active' CHECK(status IN ('active', 'pending', 'suspended', 'completed', 'canceled'))
);

INSERT INTO enrollments(user_id, course_id, status)VALUES
(3, 1, 'active');



CREATE TABLE IF NOT EXISTS meis(
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE SET NULL,
  cnpj VARCHAR(100) UNIQUE NOT NULL,
  business_name VARCHAR(100) NOT NULL,
  opening_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'pending', 'suspended', 'closed'))
);

INSERT INTO meis(user_id, cnpj, business_name, business_name)VALUES
(3, '12.345.678/0001-95', 'Food.ltd')
ON CONFLICT (cnpj) DO NOTHING;



CREATE TABLE IF NOT EXISTS account_types (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) UNIQUE DEFAULT 'basic' CHECK(type IN ('basic', 'advanced', 'premium')),
  price DECIMAL(10,2) DEFAULT 0.00
);

INSERT INTO account_types(type, price)VALUES
('basic', 100.00)
ON CONFLICT (type) DO NOTHING;

INSERT INTO account_types(type, price)VALUES
('advanced', 150.00)
ON CONFLICT (type) DO NOTHING;

INSERT INTO account_types(type, price)VALUES
('premium', 200.00)
ON CONFLICT (type) DO NOTHING;



CREATE TABLE IF NOT EXISTS user_account_types (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE SET NULL,
  accountType_id INTEGER UNIQUE REFERENCES account_types(id) ON DELETE SET NULL,
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP
);

INSERT INTO user_account_types(user_id, accountType_id, start_date, end_date)VALUES
VALUES (1, 2, NOW(), NOW() + INTERVAL '1 month')
ON CONFLICT (user_id) DO NOTHING;
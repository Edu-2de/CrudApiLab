CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  second_name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK(role IN ('full_access', 'limit_access', 'user')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (first_name, second_name, email, password_hash, role) VALUES
('Alex', 'Mind', 'alexmind@gmail.com', '$2b$10$o3Lx9SXG2xPq7pYLzaUq/uVWxioqy4mI/Q9BWMxJRTwE6CJGbBvzy', 'full_access'),
('Val', 'Banding', 'vanbanding@gmail.com','$2b$10$6E07uTkNqMJtfMwmkRE1EuAK38BFxCmihM7Tuf3MVuCJgiN8dMPOK',  'limit_access'),
('Mario', 'Bros', 'mariobros@gmail.com','$2b$10$3MQb43.Blm.Ypl2TviJMzu7O87J5Lk2QieT8fsGsrCOf4RXunu67G',  'user')
ON CONFLICT (email) DO NOTHING;

CREATE TABLE IF NOT EXISTS banners (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  image_url VARCHAR(255) NOT NULL,
  link_url VARCHAR(255),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO banners (title, image_url, link_url, active) VALUES
('banner1', '/photo1.jpg', '/sale', TRUE),
('banner2', '/photo2.jpg', '/new', TRUE),
('banner3', '/photo3.jpg', '/deals', TRUE);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (name, description) VALUES
('Shoes', 'All types of shoes'),
('Accessories', 'Fashion accessories'),
('Kids', 'Products for kids');

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES
('Product 1', 'First product description', 120.00, 50, 1, '/product1.jpg'),
('Product 2', 'Second product description', 99.00, 40, 1, '/product2.jpg'),
('Product 3', 'Third product description', 89.00, 30, 1, '/product3.jpg'),
('Product 4', 'Fourth product description', 110.00, 20, 1, '/product4.jpg');

CREATE TABLE IF NOT EXISTS product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  image_url VARCHAR(255) NOT NULL
);

INSERT INTO product_images (product_id, image_url) VALUES
(1, '/product1.jpg'),
(1, '/product1Variation.jpg'),
(2, '/product2.jpg'),
(2, '/product2Variation.jpg'),
(3, '/product3.jpg'),
(3, '/product3Variation.jpg'),
(4, '/product4.jpg'),
(4, '/product4Variation.jpg');

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK(status IN ('pending', 'paid', 'shipped', 'delivered', 'canceled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO orders (user_id, total, status) VALUES
(1, 219.00, 'pending'),
(2, 99.00, 'paid');

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 120.00),
(1, 3, 1, 89.00),
(2, 2, 1, 99.00);

CREATE TABLE IF NOT EXISTS product_reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  rating INTEGER CHECK(rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO product_reviews (product_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Amazing product!'),
(2, 2, 4, 'Good value.'),
(3, 3, 5, 'Very comfortable.');
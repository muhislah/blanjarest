CREATE TABLE categories (
    id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (name)
);

ALTER TABLE categories 
ADD CONSTRAINT categories_id_pk
PRIMARY KEY (id);

CREATE TABLE products (
    id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    stock INT NOT NULL,
    category_id INT NOT NULL REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE products 
ADD CONSTRAINT category_id_unique
FOREIGN KEY (category_id) REFERENCES categories (id);

CREATE TABLE users (
    id VARCHAR(200) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (email)
);

INSERT INTO categories (id, name) VALUES
    (1, 'T-Shirt'),
    (2, 'Short'),
    (3, 'Jacket'),
    (4, 'Pants'),
    (5, 'Shoes');

INSERT INTO products (name, description, price, stock, category_id) VALUES 
    ('Kaos Polos Polo','Kaos Hitam anti Panas',30000,50,1),
    ('Kaos Panjang Hitam','Kaos Panjang Bahan Combed 24S',45000,50,1),
    ('Kaos Polo Jaguar','Kaos Polo ',50000,45,1),
    ('Kemeja Panjang ','Kemeja Panjang 14s',145000,50,2),
    ('Kemeja Jangkis','Kemeja untuk Kaum Millenial',150000,50,2),
    ('Kemeja Pendek Batik','Kemeja Batik Pekalongan',175000,50,2),
    ('Jaket Kulit Dilan 1991','Jaket Asli dari Film dilan 1991',250000,2,3),
    ('Jaket Woll Paris','Jaket Paris Hilton',300000,1,3),
    ('Jaket Motif Akatsuki','Jaket Wibu',150000,15,3),
    ('Jaket Man Of Steel','Jaket ini pernah dipake Herry Canvil',1000000,1,3),
    ('Celana Chinos ','Celana Chino berbagai Ukuran',75000,30,4),
    ('Celana Jeans Pendek','Celana Jeans Pendek asli buatan Bali',165000,40,4),
    ('Celana Pendek Casual','Celana Pendek cocok untuk ke Pantai',86000,50,4),
    ('Sepatu Nike Spesial','Nike',250000,20,5),
    ('Sepatu Nike Adrenaline','Sepatu Olahraga dan Climbing',435000,20,5),
    ('Sepatu Adidas Spirit','Sepatu khusus untuk Keperluan Running and Hangout',799000,20,5);

SELECT p.id, p.name, p.description, p.price, p.stock, c.name AS category_name, p.created_at, p.updated_at FROM products AS p JOIN categories AS c ON p.category_id = c.id WHERE p.id = 2;

UPDATE products SET
  name = COALESCE('Kaos Oblong Polos', name),
  description = COALESCE(null, description),
  price = COALESCE(null, price),
  stock = COALESCE(null, stock),
  category_id = COALESCE(null, category_id)
WHERE id = 17;

ALTER TABLE products
ADD COLUMN photo VARCHAR(200);

SELECT * FROM categories as c JOIN products as p ON c.id = p.category_id WHERE c.id = 1;
INSERT INTO categories (id, name) VALUES (6, 'Training');
UPDATE categories SET name = 'Non-Training' WHERE id = 6;
DELETE FROM categories WHERE id = 6;
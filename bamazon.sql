CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    item_id INTEGER NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (100) NOT NULL,
    department_name VARCHAR
    (100) NOT NULL,
    price DECIMAL
    (10,2) NOT NULL,
    stock_quantity INTEGER
    (100) NOT NULL,
    PRIMARY KEY
    (item_id)
    );

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Bananas", "Groceries", 0.20, 50),
        ("Orange Juice", "Groceries", 2.50, 20),
        ("Dawn Dish Detergent", "Household", 4.75, 30),
        ("Tide Pods", "Household", 21.44, 150),
        ("iPhone XS Max", "Electronics", 1299, 10),
        ("Macbook Pro", "Electronics", 1499, 15),
        ("Midi Button Down Dress", "Clothing", 20.99, 10),
        ("Paperbag Pants", "Clothing", 18.99, 8),
        ("Leather Cross Sandals", "Shoes", 15.99, 10),
        ("Birkenstock Sandals", "Shoes", 99.00, 5);

    UPDATE products SET product_name = "Detergent" WHERE item_id = 3;
    UPDATE products SET product_name = "Macbook" WHERE item_id = 6;
    UPDATE products SET product_name = "iPhone" WHERE item_id = 5;
    UPDATE products SET product_name = "Dress" WHERE item_id = 7;
    UPDATE products SET product_name = "Pants" WHERE item_id = 8;
    UPDATE products SET product_name = "Sandals" WHERE item_id = 9;
    UPDATE products SET product_name = "Sneakers" WHERE item_id = 10;
    UPDATE products SET price = "99.9" WHERE item_id = 10;
    UPDATE products SET price = "0.25" WHERE item_id = 1;
    UPDATE products SET price = "2.59" WHERE item_id = 2;


    SELECT *
    FROM products
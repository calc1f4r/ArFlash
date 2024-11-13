CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    position VARCHAR(50),
    department VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(15),
    hire_date DATE
);

INSERT INTO employees (id, name, position, department, email, phone, hire_date)
VALUES (1, 'Yash Srivastava', 'Manager', 'Sales', '20yashs09@gmail.com', '7905196961', '2024-01-15');

INSERT INTO employees (id, name, position, department, email, phone, hire_date)
VALUES (2, 'Vinayak Sahu', 'HR', 'Sales', 'Vinayaksahu@gmail.com', '3784738473', '2024-04-20');

SELECT * FROM employees;



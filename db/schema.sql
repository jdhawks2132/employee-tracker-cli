DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  CONSTRAINT fk_departments FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE CASCADE
);

CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT UNSIGNED,
  CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);

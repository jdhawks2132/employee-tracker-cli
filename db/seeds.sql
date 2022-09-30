INSERT INTO departments
  (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO roles
  (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 130000, 4),
  ('Lawyer', 120000, 4);

INSERT INTO employees
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Josh', 'Hawks', 1, NULL),
  ('Andrew', 'Wacaser', 2, 1),
  ('Devante', 'Lowrey', 3, NULL),
  ('Andre', 'Hochi', 4, 3),
  ('Shane', 'Flemming', 5, NULL),
  ('Richy', 'Park', 6, NULL),
  ('Jessie', 'Callaway', 7, 6);

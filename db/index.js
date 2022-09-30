const connection = require('./connection');

// DROP DATABASE IF EXISTS employees;

// CREATE DATABASE employees;

// USE employees;

// CREATE TABLE departments (
//   department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(30) NOT NULL
// );

// CREATE TABLE roles (
//   role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   title VARCHAR(30) NOT NULL,
//   salary DECIMAL(10,2) NOT NULL,
//   department_id INT NOT NULL,
//   FOREIGN KEY (department_id) REFERENCES departments(department_id)
// );

// CREATE TABLE employees (
//   employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   first_name VARCHAR(30) NOT NULL,
//   last_name VARCHAR(30) NOT NULL,
//   role_id INT NOT NULL,
//   manager_id INT,
//   FOREIGN KEY (role_id) REFERENCES roles(role_id),
//   FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
// );

class DB {
	constructor(connection) {
		this.connection = connection;
	}

	// Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
	findAllEmployees() {
		return this.connection
			.promise()
			.query(
				"SELECT employees.employee_id id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) manager FROM employees LEFT JOIN roles on employees.role_id = roles.role_id LEFT JOIN departments on roles.department_id = departments.department_id LEFT JOIN employees manager on manager.employee_id = employees.manager_id;"
			);
	}

	// Find all employees except the given employee id
	findAllPossibleManagers(employeeId) {
		return this.connection
			.promise()
			.query(
				'SELECT id, first_name, last_name FROM employee WHERE id != ?',
				employeeId
			);
	}

	// Create a new employee
	createEmployee(employee) {
		return this.connection
			.promise()
			.query('INSERT INTO employee SET ?', employee);
	}

	// Remove an employee with the given id
	removeEmployee(employeeId) {
		return this.connection
			.promise()
			.query('DELETE FROM employee WHERE id = ?', employeeId);
	}

	// Update the given employee's role
	updateEmployeeRole(employeeId, roleId) {
		return this.connection
			.promise()
			.query('UPDATE employee SET role_id = ? WHERE id = ?', [
				roleId,
				employeeId,
			]);
	}

	// Update the given employee's manager
	updateEmployeeManager(employeeId, managerId) {
		return this.connection
			.promise()
			.query('UPDATE employee SET manager_id = ? WHERE id = ?', [
				managerId,
				employeeId,
			]);
	}

	// Find all roles I am presented with the job title, role id, the department that role belongs to, and the salary for that role
	findAllRoles() {
		return this.connection
			.promise()
			.query(
				'SELECT role_id id, title, departments.name department, salary FROM roles LEFT JOIN departments on roles.department_id = departments.department_id'
			);
	}

	// Create a new role
	createRole(role) {
		console.log(role);
		return this.connection.promise().query('INSERT INTO roles SET ?', role);
	}

	// Remove a role from the db
	removeRole(roleId) {
		return this.connection
			.promise()
			.query('DELETE FROM role WHERE id = ?', roleId);
	}

	// Find all departments, join with employees and roles and sum up utilized department budget
	findAllDepartments() {
		return this.connection.promise().query('SELECT * FROM departments');
	}

	// Create a new department
	createDepartment(department) {
		console.log(department);
		return this.connection
			.promise()
			.query('INSERT INTO departments SET name = ?', department);
	}

	// Remove a department from the db
	removeDepartment(departmentId) {
		return this.connection
			.promise()
			.query('DELETE FROM department WHERE id = ?', departmentId);
	}

	// Find all employees in a given department, join with roles to display role titles
	findAllEmployeesByDepartment(departmentId) {
		return this.connection
			.promise()
			.query(
				'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = ?',
				departmentId
			);
	}

	// Find all employees by manager, join with departments and roles to display titles and department names
	findAllEmployeesByManager(managerId) {
		return this.connection
			.promise()
			.query(
				'SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE manager_id = ?',
				managerId
			);
	}

	// create a new employee
	createEmployee(employee) {
		return this.connection
			.promise()
			.query('INSERT INTO employees SET ?', employee);
	}

	// update an employee's role
	updateEmployeeRole(employeeId, roleId) {
		return this.connection
			.promise()
			.query('UPDATE employees SET role_id = ? WHERE employee_id = ?', [
				roleId,
				employeeId,
			]);
	}

	// update an employee's manager
	updateEmployeeManager(employeeId, managerId) {
		return this.connection
			.promise()
			.query('UPDATE employees SET manager_id = ? WHERE employee_id = ?', [
				managerId,
				employeeId,
			]);
	}

	// delete a department
	deleteDepartment(departmentId) {
		return this.connection
			.promise()
			.query('DELETE FROM departments WHERE department_id = ?', departmentId);
	}

	// delete a role
	deleteRole(roleId) {
		return this.connection
			.promise()
			.query('DELETE FROM roles WHERE role_id = ?', roleId);
	}

	// delete an employee
	deleteEmployee(employeeId) {
		return this.connection
			.promise()
			.query('DELETE FROM employees WHERE employee_id = ?', employeeId);
	}

	// view budget of a department
	viewDepartmentBudget(departmentId) {
		return this.connection
			.promise()
			.query(
				'SELECT SUM(salary) AS budget FROM roles WHERE department_id = ?',
				departmentId
			);
	}
}

module.exports = new DB(connection);

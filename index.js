const inquirer = require('inquirer');
const db = require('./db');
require('console.table');

const textArt = `
▄▄▄▄▄▄▄▄▄▄▄  ▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄            ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
▐░░░░░░░░░░░▌▐░░▌     ▐░░▌▐░░░░░░░░░░░▌▐░▌          ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
▐░█▀▀▀▀▀▀▀▀▀ ▐░▌░▌   ▐░▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌          ▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ 
▐░▌          ▐░▌▐░▌ ▐░▌▐░▌▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌          
▐░█▄▄▄▄▄▄▄▄▄ ▐░▌ ▐░▐░▌ ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌          ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ 
▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░▌          ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
▐░█▀▀▀▀▀▀▀▀▀ ▐░▌   ▀   ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌          ▐░▌       ▐░▌ ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ 
▐░▌          ▐░▌       ▐░▌▐░▌          ▐░▌          ▐░▌       ▐░▌     ▐░▌     ▐░▌          ▐░▌          
▐░█▄▄▄▄▄▄▄▄▄ ▐░▌       ▐░▌▐░▌          ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ 
▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
 ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀            ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀ 
                                                                                                        
 ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄    ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄                   
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌                  
 ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌ ▐░▌ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌                  
     ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌▐░▌  ▐░▌          ▐░▌       ▐░▌                  
     ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌          ▐░▌░▌   ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌                  
     ▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌          ▐░░▌    ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌                  
     ▐░▌     ▐░█▀▀▀▀█░█▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░▌          ▐░▌░▌   ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀                   
     ▐░▌     ▐░▌     ▐░▌  ▐░▌       ▐░▌▐░▌          ▐░▌▐░▌  ▐░▌          ▐░▌     ▐░▌                    
     ▐░▌     ▐░▌      ▐░▌ ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌ ▐░▌ ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌      ▐░▌                   
     ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌                  
      ▀       ▀         ▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀    ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀                   
                                                                                                        
`;

// display the textArt and main prompts
const init = () => {
	console.log(textArt);
	mainMenu();
};

// main menu
const mainMenu = () => {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'mainMenu',
				message: 'What would you like to do?',
				choices: [
					'View all departments',
					'View all roles',
					'View all employees',
					'Add a department',
					'Add a role',
					'Add an employee',
					'Update an employee role',
					'Update an employee manager',
					'View employees by manager',
					'Delete a department',
					'Delete a role',
					'Delete an employee',
					'View the total utilized budget of a department',
					'Exit',
				],
			},
		])
		.then((answer) => {
			switch (answer.mainMenu) {
				case 'View all departments':
					viewAllDepartments();
					break;
				case 'View all roles':
					viewAllRoles();
					break;
				case 'View all employees':
					viewAllEmployees();
					break;
				case 'Add a department':
					addDepartment();
					break;
				case 'Add a role':
					addRole();
					break;
				case 'Add an employee':
					addEmployee();
					break;
				case 'Update an employee role':
					updateEmployeeRole();
					break;
				case 'Update an employee manager':
					updateEmployeeManager();
					break;
				case 'View employees by manager':
					viewEmployeesByManager();
					break;
				case 'Delete a department':
					deleteDepartment();
					break;
				case 'Delete a role':
					deleteRole();
					break;
				case 'Delete an employee':
					deleteEmployee();
					break;
				case 'View the total utilized budget of a department':
					viewDepartmentBudget();
					break;
				case 'Exit':
					exit();
					break;
			}
		});
};

const viewAllDepartments = () => {
	db.findAllDepartments()
		.then(([rows]) => {
			let departments = rows;
			console.log('\n');
			console.table(departments);
		})
		.then(() => mainMenu());
};

const viewAllRoles = () => {
	db.findAllRoles()
		.then(([rows]) => {
			let roles = rows;
			console.log('\n');
			console.table(roles);
		})
		.then(() => mainMenu());
};

const viewAllEmployees = () => {
	db.findAllEmployees()
		.then(([rows]) => {
			let employees = rows;
			console.log('\n');
			console.table(employees);
		})
		.then(() => mainMenu());
};

const addDepartment = () => {
	inquirer
		.prompt([
			{
				name: 'department',
				type: 'input',
				message: 'What is the name of the department you would like to add?',
			},
		])
		.then((answer) => {
			let department = answer.department;
			db.createDepartment(department)
				.then(() => console.log(`Added ${department} to the database`))
				.then(() => viewAllDepartments());
		});
};

// add a new role to the database
const addRole = () => {
	db.findAllDepartments().then(([rows]) => {
		let departments = rows;
		const departmentChoices = departments.map(({ department_id, name }) => ({
			name: name,
			value: department_id,
		}));
		inquirer
			.prompt([
				{
					name: 'title',
					type: 'input',
					message: 'What is the name of the role you would like to add?',
				},
				{
					name: 'salary',
					type: 'input',
					message: 'What is the salary of the role you would like to add?',
				},
				{
					name: 'department_id',
					type: 'list',
					message:
						'What department does the role you would like to add belong to?',
					choices: departmentChoices,
				},
			])
			.then((answer) => {
				db.createRole(answer)
					.then(() => console.log(`Added ${answer.title} to the database`))
					.then(() => viewAllRoles());
			});
	});
};

// add a new employee to the database
const addEmployee = () => {
	inquirer
		.prompt([
			{
				name: 'first_name',
				type: 'input',
				message:
					'What is the first name of the employee you would like to add?',
			},
			{
				name: 'last_name',
				type: 'input',
				message: 'What is the last name of the employee you would like to add?',
			},
		])
		.then((answer) => {
			let firstName = answer.first_name;
			let lastName = answer.last_name;
			db.findAllRoles().then(([rows]) => {
				let roles = rows;
				const roleChoices = roles.map(({ id, title }) => ({
					name: title,
					value: id,
				}));
				inquirer
					.prompt([
						{
							name: 'id',
							type: 'list',
							message:
								'What is the role of the employee you would like to add?',
							choices: roleChoices,
						},
					])
					.then((answer) => {
						let roleId = answer.id;
						db.findAllEmployees().then(([rows]) => {
							let employees = rows;
							const managerChoices = employees.map(
								({ employee_id, first_name, last_name }) => ({
									name: `${first_name} ${last_name}`,
									value: employee_id,
								})
							);
							managerChoices.unshift({ name: 'None', value: null });
							inquirer
								.prompt([
									{
										name: 'manager_id',
										type: 'list',
										message:
											'Who is the manager of the employee you would like to add?',
										choices: managerChoices,
									},
								])
								.then((answer) => {
									let managerId = answer.manager_id;
									let employee = {
										first_name: firstName,
										last_name: lastName,
										role_id: roleId,
										manager_id: managerId,
									};
									db.createEmployee(employee)
										.then(() =>
											console.log(
												`Added ${firstName} ${lastName} to the database`
											)
										)
										.then(() => viewAllEmployees());
								});
						});
					});
			});
		});
};

// update an employee's role
const updateEmployeeRole = () => {
	db.findAllEmployees().then(([rows]) => {
		let employees = rows;
		const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
			name: `${first_name} ${last_name}`,
			value: id,
		}));
		inquirer
			.prompt([
				{
					name: 'id',
					type: 'list',
					message: 'Which employee would you like to update?',
					choices: employeeChoices,
				},
			])
			.then((answer) => {
				let employeeId = answer.id;
				db.findAllRoles().then(([rows]) => {
					let roles = rows;
					const roleChoices = roles.map(({ id, title }) => ({
						name: title,
						value: id,
					}));
					inquirer
						.prompt([
							{
								name: 'role_id',
								type: 'list',
								message:
									'What is the new role of the employee you would like to update?',
								choices: roleChoices,
							},
						])
						.then((answer) => {
							let roleId = answer.role_id;
							db.updateEmployeeRole(employeeId, roleId)
								.then(() => console.log('Updated employee role'))
								.then(() => viewAllEmployees());
						});
				});
			});
	});
};

// update an employee's manager
const updateEmployeeManager = () => {
	db.findAllEmployees().then(([rows]) => {
		let employees = rows;
		const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
			name: `${first_name} ${last_name}`,
			value: id,
		}));
		inquirer
			.prompt([
				{
					name: 'id',
					type: 'list',
					message: 'Which employee would you like to update?',
					choices: employeeChoices,
				},
			])
			.then((answer) => {
				let employeeId = answer.id;
				db.findAllEmployees().then(([rows]) => {
					let employees = rows;
					const managerChoices = employees.map(
						({ id, first_name, last_name }) => ({
							name: `${first_name} ${last_name}`,
							value: id,
						})
					);
					inquirer
						.prompt([
							{
								name: 'id',
								type: 'list',
								message:
									'Who is the new manager of the employee you would like to update?',
								choices: managerChoices,
							},
						])
						.then((answer) => {
							let managerId = answer.id;
							db.updateEmployeeManager(employeeId, managerId)
								.then(() => console.log('Updated employee manager'))
								.then(() => viewAllEmployees());
						});
				});
			});
	});
};

// delete a department
const deleteDepartment = () => {
	db.findAllDepartments().then(([rows]) => {
		let departments = rows;
		const departmentChoices = departments.map(({ id, name }) => ({
			name: name,
			value: id,
		}));
		inquirer
			.prompt([
				{
					name: 'id',
					type: 'list',
					message: 'Which department would you like to delete?',
					choices: departmentChoices,
				},
			])
			.then((answer) => {
				let departmentId = answer.id;
				db.deleteDepartment(departmentId)
					.then(() => console.log('Deleted department'))
					.then(() => viewAllDepartments());
			});
	});
};

// delete a role
const deleteRole = () => {
	db.findAllRoles().then(([rows]) => {
		let roles = rows;
		const roleChoices = roles.map(({ id, name }) => ({
			name: name,
			value: id,
		}));
		inquirer
			.prompt([
				{
					name: 'id',
					type: 'list',
					message: 'Which role would you like to delete?',
					choices: roleChoices,
				},
			])
			.then((answer) => {
				let roleId = answer.id;
				db.deleteRole(roleId)
					.then(() => console.log('Deleted role'))
					.then(() => viewAllRoles());
			});
	});
};

// delete an employee
const deleteEmployee = () => {
	db.findAllEmployees().then(([rows]) => {
		let employees = rows;
		const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
			name: `${first_name} ${last_name}`,
			value: id,
		}));
		inquirer
			.prompt([
				{
					name: 'id',
					type: 'list',
					message: 'Which employee would you like to delete?',
					choices: employeeChoices,
				},
			])
			.then((answer) => {
				let employeeId = answer.id;
				db.deleteEmployee(employeeId)
					.then(() => console.log('Deleted employee'))
					.then(() => viewAllEmployees());
			});
	});
};

// view the total utilized budget of a department -- ie the combined salaries of all employees in that department
const viewDepartmentBudget = () => {
	db.findAllDepartments().then(([rows]) => {
		let departments = rows;
		const departmentChoices = departments.map(({ department_id, name }) => ({
			name: name,
			value: department_id,
		}));
		inquirer
			.prompt([
				{
					name: 'department_id',
					type: 'list',
					message: 'Which department would you like to view the budget for?',
					choices: departmentChoices,
				},
			])
			.then((answer) => {
				let departmentId = answer.department_id;
				db.viewDepartmentBudget(departmentId)
					.then(([rows]) => {
						let budget = rows;
						console.log('\n');
						console.log(
							`The total utilized budget of the department is ${budget[0].budget}`
						);
						console.log('\n');
					})
					.then(() => mainMenu());
			});
	});
};

// exit the application
const exit = () => {
	console.log('Goodbye!');
	process.exit();
};

init();

// Packages
const inqurier = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const { response } = require('express');

// Connection to Mysql
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_information_db',
    multipleStatements: true
},
    console.log('Connected to the employee_information database.'),
    startScreen()
);

function startScreen() {

    inqurier
        .prompt({
            type: 'list',
            name: 'start',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        })
        .then(function ({ start }) {

            switch (start) {
                case "View All Departments":
                    viewDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                default:
                    quit();
            }
        });
};

// Department functions
function viewDepartments() {


    const sql = `SELECT * FROM department`;

    connection.promise().query(sql)
        .then(([rows]) => {
            console.table('\n', rows);
        })
        .catch(console.log)
        .then(() => startScreen());
};

function addDepartment() {

    inqurier
        .prompt({
            type: 'input',
            name: 'addDepartment',
            message: 'What is the name of the department?'
        })
        .then(answers => {

            connection.promise().query(`INSERT INTO department SET ?`, {
                name: answers.addDepartment
            }, function (err) {
                if (err) throw err;
            })
                .catch(console.log)
                .then(() => startScreen());
        })
};

function viewEmployees() {


    const sql = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ',m.last_name) AS manager 
    FROM employee e
    LEFT JOIN role r 
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
    ON m.id = e.manager_id;`;

    connection.promise().query(sql)
        .then(([rows]) => {
            console.table('\n', rows);
        })
        .catch(console.log)
        .then(() => startScreen());
};

function addEmployee() {
    console.log('Add employee:');
};

function updateEmployeeRole() {
    console.log('Update employee role:');
};

function viewRoles() {


    const sql = `SELECT r.id, r.title, r.salary, d.name AS department 
    FROM role r
    INNER JOIN department d
    ON r.department_id = d.id;`;

    connection.promise().query(sql)
        .then(([rows]) => {
            console.table('\n', rows);
        })
        .catch(console.log)
        .then(() => startScreen());
};

function addRole() {

    const sql = `SELECT * FROM department`;
    connection.promise().query(sql)
        .then(([rows]) => {

            // Get department names and put in array 
            let departmentArray = [];

            rows.forEach((object) => {
                departmentArray.push(object.department);
            });

            console.log(departmentArray);

            departmentArray.push('Create Department');

            inqurier
                .prompt([
                    {
                        type: 'list',
                        name: 'roleDepartment',
                        message: 'Which department does the role belong to?',
                        choices: departmentArray
                    }])
                .then(answer => {

                    if (answer.roleDepartment === 'Create Department') {
                        this.addDepartment();
                    } else {
                        addRoleDetails(answer);
                    }
                });

            const addRoleDetails = (departmentInfo) => {
                inqurier
                    .prompt(
                        {
                            type: 'input',
                            name: 'addRole',
                            message: 'What is the name of the role?'
                        },
                        {
                            type: 'input',
                            name: 'addSalary',
                            message: 'What is the salary of the role?'
                        })
                    .then((answer) => {
                        let newRole = answer.addRole;
                        let departmentID;

                        response.forEach((department) => {
                            if (departmentInfo.roleDepartment) {
                                departmentID = department.id;
                            }
                        })

                        const sql = `
                            INSERT INTO role (title, salary, department_id)
                            VALUES(?, ?, ?);
                            `;

                        connection.promise().query(sql, {
                            title: newRole,
                            salary: answer.salary,
                            department_id: departmentID
                        }, function (err) {
                            if (err) throw err;
                        })
                            .catch(console.log)
                            .then(() => startScreen());
                    })
            };
        })
        .catch(console.log)
        .then(() => startScreen());
};

function quit() {

    connection.end();
};



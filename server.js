// Packages
const inqurier = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

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
        .then(function({start}) {

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
        .then( ([rows]) => {
            console.table('\n', rows);
        })
        .catch(console.log)
        .then( () => startScreen());
};

function addDepartment() {

    inqurier
        .prompt({
            type: 'input',
            name: 'addDepartment',
            message: 'What is the name of the department?'
    })
    .then(function ({answer}) {

        const newDept = `INSERT INTO department(name) VALUES(?)`, [answer.addDepartment]

        connection.promise().query(sql)
        .then( ([rows]) => {
            console.table('\n', rows);
        })
        .catch(console.log)
        .then( () => startScreen());
    })


};

function viewEmployees() {


    const sql = `SELECT * FROM employee`;

    connection.promise().query(sql)
        .then( ([rows]) => {
            console.table('\n', rows);
        })
        .catch(console.log)
        .then( () => startScreen());
};

function addEmployee() {
    console.log('Add employee:');
};

function updateEmployeeRole() {
    console.log('Update employee role:');
};

function viewRoles() {


    const sql = `SELECT * FROM role;`;

    connection.promise().query(sql)
        .then( ([rows]) => {
            console.table('\n', rows);
        })
        .catch(console.log)
        .then( () => startScreen());
};

function addRole() {
    console.log('Add role:');
};

function quit() {
    
    connection.end();
};






// // Connection promise
// connection.promise().query("show databases")
//     .then( ([rows, fields]) => {
//         console.log(rows);
//     })
//     .catch(console.log)
//     .then( () => connection.end());
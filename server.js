// Packages
const inqurier = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// Connection to Mysql
const connection = mysql.createConnection( {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Lambeau#2021',
    database: 'employee_information_db'
},
console.log('Connected to the employee_information database.')
);

function startScreen() {

    inqurier
    .prompt( {
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    })
    .then( result => {

        console.log("You selected: " + result.option);

        


    })



}


// // Connection promise
// connection.promise().query("show databases")
//     .then( ([rows, fields]) => {
//         console.log(rows);
//     })
//     .catch(console.log)
//     .then( () => connection.end());
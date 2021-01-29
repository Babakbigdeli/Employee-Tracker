// Defining dependencies 
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require('console.table');

//Setting up connection 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    //change this to your SQL password
    password: '2040365',
    database: 'employee_tracker_db'
});

connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    firstUserInputPrompt();
});

// First User Input Prompt

function firstUserInputPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "actions",
    choices: [
              "View All Employees?", 
              "View All Employee's By Roles?",
              "View all Employees By Department?", 
              "Update Employee Role?",
              "Add Employee?",
              "Add Role?",
              "Add Department?",
              "Exit?"
            ]
    }
    //Adding Switch cases to pick the relative function based on users choice
]).then(function(answer) {
    switch (answer.action) {
        
        case "View All Employees?":
           viewAllEmployees();
        break;

        case "View All Employee's By Roles?":
           viewAllRoles();
        break;

        case "View all Employees By Department?":
            viewAllDepartments();
        break;

        case "Update Employee Role?":
            updateEmployee();
        break;

        case "Add Employee?":
            addEmployee();
        break;

        case "Add Role?":
            addRole();
        break;
    
        case "Add Department?":
            addDepartment();
        break;

        case "Exit?":
            connection.end();
        break;
    }
})
}
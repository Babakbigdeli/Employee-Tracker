// Defining dependencies 
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require('console.table');

//Setting up connection 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 8080,
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
    
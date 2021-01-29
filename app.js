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


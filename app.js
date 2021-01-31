// Bringing in dependencies 
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
    firstInputPrompt();
});

// First User Input Prompt

function firstInputPrompt() {
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
    switch (answer.actions) {

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
// First Choice function 

function viewAllEmployees() {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`, 
    function(err, res) {
      if (err) throw err
      console.log('\n');
      console.log('VIEW ALL EMPLOYEES');
      console.log('\n');
      console.table(res)
      firstInputPrompt();
  })
}

//Second Choice function

function viewAllRoles() {
    connection.query(`SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY role.title;`, 
    function(err, res) {
      if (err) throw err
      console.log('\n');
      console.log('VIEW ALL EMPLOYEES BY ROLES');
      console.log('\n');
      console.table(res)
      firstInputPrompt();
  })
}

//Third Choice function

function viewAllDepartments() {
    connection.query(`SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY department.name;`, 
    function(err, res) {
      if (err) throw err
      console.log('\n');
      console.log('VIEW ALL EMPLOYEES BY DEPARTMENT');
      console.log('\n');
      console.table(res)
      firstInputPrompt();
  })
}

//Fourth Choice function

function updateEmployee() {
    inquirer
      .prompt([
        {
        type: "input",
        message: "Which employee would you like to update (Use First Name)?",
        name: "empUpdate"
        },
  
        {
        type: "input",
        message: "What do you want to update to (Enter ID of new role)?",
        name: "updateRole"
        }
      ]).then(function(answer) {
        connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.empUpdate],function(err, res) {
        if (err) throw err;
        console.table(res);
        firstInputPrompt();
        });
      });
  }

//Fifth Choice function

function addEmployee() {
    inquirer
      .prompt([
        {
        type: "input",
        message: "What's the new employee's first name?",
        name: "newEmpFirstName"
        },
        {
        type: "input",
        message: "What's the new employee's last name?",
        name: "newEmpLastName"
        },
        {
        type: "input",
        message: "What is the new employee's role id number?",
        name: "newEmpRoleID"
        },
        {
        type: "input",
        message: "What is the new employee's manager id number?",
        name: "NewEmpManagerID"
        }
      ])
      .then(function(answer) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.newEmpFirstName, answer.newEmpLastName, answer.newEmpRoleID, answer.NewEmpManagerID],
        function(err, res) {
        if (err) throw err;
        console.table(res);
        firstInputPrompt();
        });
      });
  }

//Sixth Choice function

function addRole() { 
connection.query(`SELECT role.title AS Title, role.salary AS Salary FROM role`,
function() {
    inquirer.prompt([
        {
        type: "input",
        message: "What is the new role's Title?",
        name: "Title"
        },
        {
        type: "input",
        message: "What is the new role's Salary?",
        name: "Salary"
        } 
    ]).then(function(answer) {
        connection.query(
        "INSERT INTO role SET ?",
        {
        title: answer.Title,
        salary: answer.Salary,
        },
        function(err, res) {
        if (err) throw err;
        console.table(res);
        firstInputPrompt();
        });
        });
});
}

//Seventh Choice function

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the new department?",
        name: "newDeptName"
        }).then(function(answer){
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.newDeptName] , function(err, res) {
        if (err) throw err;
        console.table(res);
        firstInputPrompt()
        })
    })
}


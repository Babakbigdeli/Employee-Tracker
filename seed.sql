USE employee_tracker_db;

-- Seeding DEPARTMENT table 
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Administration and Relation");
INSERT INTO department (name)
VALUE ("Construction");
INSERT INTO department (name)
VALUE ("Production");

-- Seeding ROLE table
INSERT INTO role (title, salary, department_id)
VALUE ("Admin Leader", 50000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Production Leader", 90000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 50000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Finance Leader", 70000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Construction Engineer", 80000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Production Engineer", 80000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Admin Clerk", 25000, 2);

-- Seeding EMPLOYEE table
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Johnny", "Depp", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tom", "Hanks", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mia","Lebbof", 2, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Chris", "Cornell", null, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Steve", "Probst", null, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Anita", "Karim", 2, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Elie", "Okobo", 1, 7);
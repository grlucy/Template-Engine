const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const inquirer = require("inquirer");

class EmployeeSummary {
  constructor() {
    this.employeeArray = [];
  }

  buildTeam() {
    console.log("Let's start building your engineering team!");
    return this.getTitle();
  }

  getTitle() {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "employeeTitle",
          message: "What type of employee would you like to add to the team?",
          choices: ["Manager", "Engineer", "Intern"]
        }
      ])
      .then(val => {
        const employeeTitle = val.employeeTitle;
        switch (employeeTitle) {
          case "Manager":
            return this.createManager();
          case "Engineer":
            // return this.createEngineer();
            return console.log("this.createEngineer()");
          case "Intern":
            // return this.createIntern();
            return console.log("this.createIntern");
        }
      });
  }

  createManager() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "employeeName",
          message: "What is this employee's name?",
          validate: function(val) {
            return /[a-z]/gi.test(val);
          }
        },
        {
          type: "input",
          name: "employeeId",
          message: "What is this employee's ID number?",
          validate: function(val) {
            return /[1-9]/gi.test(val);
          }
        },
        {
          type: "input",
          name: "employeeEmail",
          message: "What is this employee's email address?",
          validate: function(val) {
            let test;
            if (val.includes("@")) {
              test = true;
            } else {
              test = false;
            }
            return test;
          }
        },
        {
          type: "input",
          name: "employeeOffice",
          message: "What is this employee's office number?",
          validate: function(val) {
            return /[1-9]/gi.test(val);
          }
        }
      ])
      .then(val => {
        return console.log("Got to then statement!");
      });
  }
}

const newTeam = new EmployeeSummary();

newTeam.buildTeam();

// LOGIC FLOW:

// Use inquirer to ask user for employee title. Switch statement to create correct class of employee based on title.

// Use inquirer to ask user for employee name, id, email, and third thing depending on type. Add employee to the employeeArray.

// Use inquirer to ask the user if they have more employees to add to the team. If yes, repeat two steps above. If no, loop through employeeArray and build html page based on user input, then log success or error

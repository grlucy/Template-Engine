const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const inquirer = require("inquirer");

class EmployeeSummary {
  constructor() {
    this.employeeArray = [];
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
            // return this.createManager();
            return console.log("this.createManager()");
          case "Engineer":
            // return this.createEngineer();
            return console.log("this.createEngineer()");
          case "Intern":
            // return this.createIntern();
            return console.log("this.createIntern");
        }
      });
  }
}

const newTeam = new EmployeeSummary();

newTeam.getTitle();

// LOGIC FLOW:

// Use inquirer to ask user for employee title. Switch statement to create correct class of employee based on title.

// Use inquirer to ask user for employee name, id, email, and third thing depending on type. Add employee to the employeeArray.

// Use inquirer to ask the user if they have more employees to add to the team. If yes, repeat two steps above. If no, loop through employeeArray and build html page based on user input, then log success or error

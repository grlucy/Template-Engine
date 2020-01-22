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
    this.employeeArray = [];
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
            return this.createEngineer();
          case "Intern":
            return this.createIntern();
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
        const newManager = new Manager(
          val.employeeName,
          val.employeeId,
          val.employeeEmail,
          val.employeeOffice
        );
        this.employeeArray.push(newManager);
        return this.askIfDone();
      });
  }

  createEngineer() {
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
          name: "employeeGithub",
          message: "What is this employee's GitHub username?",
          validate: function(val) {
            return /[a-z1-9]/gi.test(val);
          }
        }
      ])
      .then(val => {
        const newEngineer = new Engineer(
          val.employeeName,
          val.employeeId,
          val.employeeEmail,
          val.employeeGithub
        );
        this.employeeArray.push(newEngineer);
        return this.askIfDone();
      });
  }

  createIntern() {
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
          name: "employeeSchool",
          message: "What is this employee's school?",
          validate: function(val) {
            return /[a-z]/gi.test(val);
          }
        }
      ])
      .then(val => {
        const newIntern = new Intern(
          val.employeeName,
          val.employeeId,
          val.employeeEmail,
          val.employeeSchool
        );
        this.employeeArray.push(newIntern);
        return this.askIfDone();
      });
  }

  askIfDone() {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "userDone",
          message: "Are you done adding employees to this team?",
          choices: ["Yes", "No"]
        }
      ])
      .then(val => {
        if (val.userDone === "Yes") {
          return this.completeTeam();
        } else {
          return this.getTitle();
        }
      });
  }

  completeTeam() {
    console.log(
      "Loop through employeeArray and build html page based on user input, then log success."
    );
    // Use inquirer to ask if user wants to start building another team; if so, return this.buildTeam().
  }
}

const newTeam = new EmployeeSummary();

newTeam.buildTeam();

// LOGIC FLOW:

// Use inquirer to ask user for employee title. Switch statement to create correct class of employee based on title.

// Use inquirer to ask user for employee name, id, email, and third thing depending on type. Create new employee using appropriate subclass. Add employee to the employeeArray.

// Use inquirer to ask the user if they have more employees to add to the team. If yes, repeat two steps above. If no, loop through employeeArray and build html page based on user input, then log success or error

// Use inquirer to ask if user wants to start building another team; if so, return this.buildTeam().

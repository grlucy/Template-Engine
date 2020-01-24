// Require dependencies
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const inquirer = require("inquirer");
const fs = require("fs");

// Dynamic HTML

function managerHTML(name, title, id, email, office) {
  return `
  <div class="card bg-light">
    <div class="card-header">
      <h2 class="font-weight-bold">${name}</h2>
      <h3>${title}</h3>
    </div>
    <div class="card-body bg-light">
      <p class="employeeID">ID: ${id}</p>
      <p class="employeeEmail">
        Email: ${email}
      </p>
      <p class="employeeThird">Office number: ${office}</p>
    </div>
  </div>
  `;
}

function engineerHTML(name, title, id, email, github) {
  return `
  <div class="card bg-light">
    <div class="card-header">
      <h2 class="font-weight-bold">${name}</h2>
      <h3>${title}</h3>
    </div>
    <div class="card-body bg-light">
      <p class="employeeID">ID: ${id}</p>
      <p class="employeeEmail">
        Email: ${email}
      </p>
      <p class="employeeThird">GitHub: <a href="https://github.com/${github}" target="_blank">${github}</a></p>
    </div>
  </div>
  `;
}

function internHTML(name, title, id, email, school) {
  return `
  <div class="card bg-light">
    <div class="card-header">
      <h2 class="font-weight-bold">${name}</h2>
      <h3>${title}</h3>
    </div>
    <div class="card-body bg-light">
      <p class="employeeID">ID: ${id}</p>
      <p class="employeeEmail">
        Email: ${email}
      </p>
      <p class="employeeThird">School: ${school}</p>
    </div>
  </div>
  `;
}

function pageHTML(allEmployeesHTML, teamName) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>${teamName} Employee Summary</title>
    <!--Bootstrap CDN-->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    <style>
      #employeeDetails .card {
        margin: 15px;
        min-width: 260px;
      }
      .employeeID,
      .employeeEmail,
      .employeeThird {
        background-color: white;
        border: 1px solid #ddd;
        padding: 8px 16px;
        margin: 0;
      }
      .employeeID {
        border-radius: 0.25rem 0.25rem 0 0;
        border-bottom: none;
      }
      .employeeThird {
        border-radius: 0 0 0.25rem 0.25rem;
        border-top: none;
      }
    </style>
  </head>
  <body>
    <header>
      <div class="jumbotron jumbotron-fluid bg-primary">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <h1 class="text-light text-center font-weight-bold">Team Employee Summary</h1>
              <h3 class="text-light text-center">Team Name: ${teamName}</h3>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section>
      <div class="container-fluid">
        <div class="row">
          <div
            class="col d-flex justify-content-center flex-wrap"
            id="employeeDetails"
          >
            ${allEmployeesHTML}
          </div>
        </div>
      </div>
    </section>
  </body>
</html>
  `;
}

// Logic for building a team summary

// LOGIC FLOW OVERVIEW:

// Use inquirer to ask user for employee title. Switch statement to create correct class of employee based on title.

// Use inquirer to ask user for employee name, id, email, and third thing depending on type. Create new employee using appropriate subclass. Add employee to the employeeArray.

// Use inquirer to ask the user if they have more employees to add to the team. If yes, repeat two steps above. If no, loop through employeeArray and build html page based on user input, then log success or error

// Use inquirer to ask if user wants to start building another team; if so, start from beginning. If not, return goodbye message.

class EmployeeSummary {
  constructor() {
    this.employeeArray = [];
    this.teamName = "";
  }

  buildTeam() {
    this.employeeArray = [];
    console.log("Let's start building your engineering team!");
    return this.nameTeam();
  }

  nameTeam() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "teamName",
          message:
            "What do you want to name this team? (Letters & numbers only)",
          validate: function(val) {
            return /^[0-9a-zA-Z]+$/gi.test(val);
          }
        }
      ])
      .then(val => {
        this.teamName = val.teamName;
        return this.createManager();
      });
  }

  createManager() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "employeeName",
          message: "What is this team's manager's name?",
          validate: function(val) {
            return /^[a-zA-Z]+( [a-zA-Z]+)*$/gi.test(val);
          }
        },
        {
          type: "input",
          name: "employeeId",
          message: "What is the manager's employee ID number?",
          validate: function(val) {
            return /^[0-9]+$/gi.test(val);
          }
        },
        {
          type: "input",
          name: "employeeEmail",
          message: "What is the manager's email address?",
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
          message: "What is the manager's office number?",
          validate: function(val) {
            return /^[0-9]+$/gi.test(val);
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
        return this.getTitle();
      });
  }

  getTitle() {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "employeeTitle",
          message: "What type of employee would you like to add to the team?",
          choices: ["Engineer", "Intern"]
        }
      ])
      .then(val => {
        const employeeTitle = val.employeeTitle;
        switch (employeeTitle) {
          case "Engineer":
            return this.createEngineer();
          case "Intern":
            return this.createIntern();
        }
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
            return /^[a-zA-Z]+( [a-zA-Z]+)*$/gi.test(val);
          }
        },
        {
          type: "input",
          name: "employeeId",
          message: "What is this employee's ID number?",
          validate: function(val) {
            return /^[0-9]+$/gi.test(val);
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
            return /^[a-zA-Z]+( [a-zA-Z]+)*$/gi.test(val);
          }
        },
        {
          type: "input",
          name: "employeeId",
          message: "What is this employee's ID number?",
          validate: function(val) {
            return /^[0-9]+$/gi.test(val);
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
            return /^[a-zA-Z]+( [a-zA-Z]+)*$/gi.test(val);
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
    // Sort employeeArray alphabetically by name
    function compare(a, b) {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameB > nameA) {
        comparison = -1;
      }
      return comparison;
    }
    this.employeeArray.sort(compare);

    // Sort employeeArray by title
    let sortedEmployeeArray = [];
    let tempManagerArray = [];
    let tempEngineerArray = [];
    let tempInternArray = [];
    for (const employee of this.employeeArray) {
      switch (employee.title) {
        case "Manager":
          tempManagerArray.push(employee);
          break;
        case "Engineer":
          tempEngineerArray.push(employee);
          break;
        case "Intern":
          tempInternArray.push(employee);
          break;
      }
    }
    for (const manager of tempManagerArray) {
      sortedEmployeeArray.push(manager);
    }
    for (const engineer of tempEngineerArray) {
      sortedEmployeeArray.push(engineer);
    }
    for (const intern of tempInternArray) {
      sortedEmployeeArray.push(intern);
    }

    // Create HTML card for each employee
    let allEmployeesHTML = "";
    for (const employee of sortedEmployeeArray) {
      switch (employee.title) {
        case "Manager":
          const managerHTMLcard = managerHTML(
            employee.name,
            employee.title,
            employee.id,
            employee.email,
            employee.officeNumber
          );
          allEmployeesHTML += managerHTMLcard;
          break;
        case "Engineer":
          const engineerHTMLcard = engineerHTML(
            employee.name,
            employee.title,
            employee.id,
            employee.email,
            employee.github
          );
          allEmployeesHTML += engineerHTMLcard;
          break;
        case "Intern":
          const internHTMLcard = internHTML(
            employee.name,
            employee.title,
            employee.id,
            employee.email,
            employee.school
          );
          allEmployeesHTML += internHTMLcard;
          break;
      }
    }

    // Write employee summary HTML file
    const fullHTML = pageHTML(allEmployeesHTML, this.teamName);

    fs.writeFile(`./output/${this.teamName}.html`, fullHTML, err => {
      if (err) {
        return console.log(err);
      }
      console.log(
        `Successfully wrote ${this.teamName}.html in the output folder.`
      );
      return this.askIfAnotherTeam();
    });
  }

  askIfAnotherTeam() {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "moreTeam",
          message: "Would you like to build another team?",
          choices: ["Yes", "No"]
        }
      ])
      .then(val => {
        if (val.moreTeam === "Yes") {
          return this.buildTeam();
        } else {
          return console.log(
            "Thank you for using the template engine! Goodbye."
          );
        }
      });
  }
}

const newTeam = new EmployeeSummary();

newTeam.buildTeam();

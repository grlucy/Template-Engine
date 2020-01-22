const Employee = require("./Employee");

// create subclass of Employee
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;

    this.title = "Engineer";
  }

  getGithub() {
    return this.github;
  }
}

module.exports = Engineer;

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const employees = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
function initPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the team managers name",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the team managers ID",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the team managers email",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter the team managers office number ",
      },
    ])
    .then(function (data) {
      var manager = new Manager(
        data.name,
        data.id,
        data.email,
        data.officeNumber
      );
      employees.push(manager);
      addMembers();
    });
}

function addMembers() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "member",
        message: "Which type of team member would you like to add?",
        choices: ["Engineer", "Intern", "Finish building the team instead."],
      },
    ])
    .then(function (choice) {
      if (choice.member === "Engineer") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "Please enter Engineer Name.",
            },
            {
              type: "input",
              name: "id",
              message: "Please enter Engineers ID.",
            },
            {
              type: "input",
              name: "github",
              message: "Please enter Engineers Github Username.",
            },
          ])
          .then(function (engineerChoice) {
            var newEngineer = new Engineer(
              engineerChoice.name,
              engineerChoice.id,
              engineerChoice.github
            );
            // console.log(newEngineer)
            employees.push(newEngineer);
            addMembers();
          });
      } else if (choice.member === "Intern") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "Please enter Interns Name.",
            },
            {
              type: "input",
              name: "id",
              message: "Please enter Interns ID.",
            },
            {
              type: "input",
              name: "email",
              message: "Please enter Interns Email",
            },
            {
              type: "input",
              name: "school",
              message: "Please enter Interns school",
            },
          ])
          .then(function (internChoice) {
            var newIntern = new Intern(
              internChoice.name,
              internChoice.id,
              internChoice.email,
              internChoice.school
            );
            // console.log(newIntern)
            employees.push(newIntern);
            console.log(employees);
            addMembers();
          });
      } else if (choice.member === "Finish building the team instead.") {
        const teamhtml = render(employees);
        fs.writeFile(outputPath, teamhtml, (err) => {
          if (err) throw err;
          // console.log("success")
        });
      }
    });
}

initPrompt();

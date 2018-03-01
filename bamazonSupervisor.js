var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log("welcome to Bamazon Manager")

 start();
});

function start(){
  inquirer
    .prompt({
      name: "menu",
      type: "rawlist",
      message: "menu option?",
      choices: ["View product sales by department", "Create New department"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.menu.toUpperCase() === "VIEW PRODUCT SALES BY DEPARTMENT") {
        viewDepartmentSales();
      }
      if (answer.menu.toUpperCase() === "CREATE NEW DEPARTMENT"){
        createNewDepartment();
      }
  

    });
};

function viewDepartmentSales(){


}


function createNewDepartment(){


  
}
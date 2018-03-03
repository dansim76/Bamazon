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
var query = "Select departments.department_id, departments.department_name,departments.over_head_cost, products.product_sales From "

}


function createNewDepartment(){
  inquirer
  .prompt([
    
  {
    name: "departmentName",
    message: "What department is it?"

  },
  {
    name: "overheadcost",
    message: "what is the overhead cost?"
  }
  ])
  .then(function(answer) {

    var query = connection.query("Insert into departments set ?",{
      department_name:answer.departmentName,
      over_head_cost:answer.overheadcost,
      
    },
    function(err,res){
      if (err) throw err;

      console.log("-----------------------------------");
      console.log("you have successfully added the department")
      


      connection.end();

  });
})

  
}
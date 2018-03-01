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
  console.log("welcome to Bamazon");

 start();
});
//
function start() {
	 connection.query("SELECT * FROM products", function(err, res) {
    	var that = res;
      if (err) throw err;
    	for(var i=0; i< res.length; i++){
          console.log("-----------------------------------------------------------------------"); 

          console.log("ids:"+res[i].item_id+" product name:" + res[i].product_name + " department name:"+ res[i].department_name + " price: $"+ res[i].price + " stock quantity: "+ res[i].stock_quantity);
          console.log("----------------------------------------------------------")

      }
inquirer.prompt([
      { 
        name: "id",
        message: "What is the iD of the product you like to purchase?"
      },
      {
       name:"unit",
       message: "How many unit would you like to purchase?"
      }
      ]).then(function(answers) {
      var chosenitem;
        for ( var i=0 ; i<that.length; i++){
          if(that[i].item_id === parseInt(answers.id)){
          chosenitem = that[i];

          }
        }


        if (chosenitem.stock_quantity < parseInt(answers.unit)){

          console.log("Insufficient quantity!");

        }
        else{
          updatedata(chosenitem, answers);
        }
   
  });


    });//


	 	

}



function updatedata(chosenitem, answers){

 connection.query(
        "update products Set ? where ? ",
        [
        {
          stock_quantity: parseInt(chosenitem.stock_quantity) - parseInt(answers.unit)
          
        },
        {
           item_id: parseInt(answers.id)
        }

        ],
        function(err,res) {
          if (err) throw err;
          console.log("-------------------------------------------------------")
          console.log("You have purchased the item successfully!");
          console.log("The total price is $"+(parseInt(answers.unit)*parseInt(chosenitem.price)) )
         //Needs value updated each individual product total revenue 
         //product sales column needs to be updated multiply cost and quantity
         start();

      });
};
  




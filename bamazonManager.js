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
      choices: ["View Products for sale", "View Low Inventory","Add to Inventory","Add new Product"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.menu.toUpperCase() === "VIEW PRODUCTS FOR SALE") {
        viewProductSale();
      }
      if (answer.menu.toUpperCase() === "VIEW LOW INVENTORY"){
        viewLowInventory();
      }
      if (answer.menu.toUpperCase() === "ADD TO INVENTORY"){
        addInventory();
      }
      if (answer.menu.toUpperCase() === "ADD NEW PRODUCT"){
        addNewProduct();
      }

    });
};
//The function that list every available item ID
function viewProductSale(){

var query = connection.query("SELECT * FROM products",function(err,res){
for(var i=0; i< res.length; i++){
console.log("--------------------------------------------------------------");
console.log("ids:"+res[i].item_id+" product name:" + res[i].product_name + " department name:"+ res[i].department_name + " price: $"+ res[i].price + " stock quantity: "+ res[i].stock_quantity)

}
sendData(res);



});
start();
}

function sendData(res){
  var that = res
}

//function that list all the item with an inventory count lower than 5
function viewLowInventory(){

var query = connection.query("SELECT * FROM products Where stock_quantity between 0 and 5  ",function(err,res){
for(var j=0; j< res.length; j++){
console.log("---------------------------"); 
console.log("ids:"+res[j].item_id+" product name:" + res[j].product_name + "department name:"+ res[j].department_name + "price: $"+ res[j].price + "stock quantity: "+ res[j].stock_quantity)

}


connection.end();

});
}
//function that display a prompt that will let the manager add more of any item currently in store
function addInventory(that){
  inquirer
    .prompt([{
      name: "selectid",
      message: "What is product id?"
      
    },
    {
      name: "quantity",
      message: "What is new quantity"

    }])
    .then(function(answer) {

      connection.query("select * from products where ?",{item_id: answer.selectid},function(err,data){
        if(err) throw err;
        if (data.length === 0){
          console.log("invalid id")
        }
      else{
        var productData = data[0]
         var query = connection.query("UPDATE products set ? where ?",
        [{stock_quantity: productData.stock_quantity  + parseInt(answer.quantity)},
        {item_id : answer.selectid}],
        function(err,res){

            if (err) throw err;
            console.log("your item has been updated");

            for(var i=0; i< res.length; i++){
            console.log("---------------------------"); 

            console.log("product name:" + res[i].product_name + "department name:"+ res[i].department_name + "price: $"+ res[i].price + "stock quantity: "+ res[i].stock_quantity)

             };
             connection.end()


  

        });
  
      }

      })
    });
    
  }

function addNewProduct(){

  inquirer
    .prompt([
      {
      name: "productName",
      message: "What is your product name?"
      
    },
    {
      name: "departmentName",
      message: "What department is it?"

    },
    {
      name: "price",
      message: "what is the price?"
    },
    {
      name: "quantity",
      message:"what is the quantity?"
    }
    ])
    .then(function(answer) {

      var query = connection.query("Insert into products set ?",{
        product_name:answer.productName,
        department_name:answer.departmentName,
        price: answer.price,
        stock_quantity:answer.quantity
      },
      function(err,res){
        if (err) throw err;

        console.log("-----------------------------------");
        console.log("you have successfully added the item")
        


        connection.end();

    });
})
  }
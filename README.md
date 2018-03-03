# Bamazon

## Description

Bamazon is like amazon like app that has takes the order from the customer and updates the database in sql. Also if it is in the manager mode you can able to see the inventory, low item, updating the inventory, and adding new inventory. 

It uses the technology such as node.js and SQL





## Installation

To install the application follow the instructions below:

	
	npm install
    and run either node bamazonCustomer.js or bamazonManager.js
	
## Running the program

bamazon customer

-It takes the SQL database of products
-It will list the products id, department name , price and stock quantity that is stored in the SQL database
-It will prompt user to enter the id they like to purchase ans it will ask how many units they ike to purchase.
-If the item they like to purchase is more than the stock it will say insufficient quantity
-If the purchase item is less than the stock it will reflet the SQL database and it will print out the price of the item


bamazon manager

-It takes the sql database of products
-IT will prompt the user with four choices
1. view products for sale
2. view low inventory
3. add to inventory
4. add new product

1.view product for sale  shows all the sale item in the products
2.view the the product that less than 5 items
3.You can add the inventory to the system
4.you can add the totally newn product to the sql.

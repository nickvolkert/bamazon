var mysql = require("mysql");
var inquirer = require("inquirer");
var AsciiTable = require('ascii-table');
var query = "";

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  productListing();
});

function productListing(res) {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    var table = new AsciiTable('Bamazon Products')
    table.setHeading("item_id", "product_name", "dept_name", "stock", "price")
    if (err) throw err;
      // Log all results of the SELECT statement
      for (var i = 0; i < res.length; i++) {
          var itemID = res[i].item_id;
          var prodID = res[i].product_name;
          var deptID = res[i].dept_name;
          var stockQTY = res[i].stock_qty;
          var priceID = res[i].price;
          table.addRow(itemID, prodID, deptID, stockQTY, priceID);
  		}
      console.log(table.toString());
      start();
  });
}
// function to handle posting new items up for auction
function start() {
  // prompt for info about the item being put up for auction
  inquirer.prompt([
      {
        type: "item",
        name: "userAnswer",
        message: "What is the ID of the item you would like to buy (Enter ID)?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        type: "input",
        name: "purchaseUnits",
        message: "How many units (see stock quantity) would you like to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(userAnswer) {
      var orderID = (userAnswer.inputItemID);
      var query = "SELECT product_name, price, stock_qty FROM products WHERE item_id=" + orderID;
      connection.query(query, function(err, res) {
        if(err) throw err;
        if (userAnswer.quantity >= res[0].stock_qty){
          var stockUpdate = (res[i].stock_qty - userAnswer.amount);
          var queryTwo = "UPDATE products SET stock_qty = " + res[i].stock_qty - userAnswer.amount + "productName = " + "WHERE item_id = " + userAnswer.inputItemID;
          connection.query(queryTwo, function(err, res) {
              if(err) throw err;
            });
            console.log("Thanks for your order!");
          } else {
            console.log("Sorry, insuffecient quantity, only " + res[0].stock_qty + "in stock");
          }
        start();
      })
    });
}

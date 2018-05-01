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

function logItPretty(){
  console.log("");
  console.log("--------------------------------------------------------------------------");
  console.log("");
}

function productListing(res) {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
      // Log all results of the SELECT statement
      for (var i = 0; i < res.length; i++) {
          console.log('Product ID: ' + res[i].item_id)
          console.log('Product Name: ' + res[i].product_name)
          console.log('Department: ' + res[i].dept_name)
          console.log('Price: $' + res[i].price);
          console.log('Stock: ' + res[i].stock_qty);
          logItPretty();
  		}
      start();
  });
}
// function to handle posting new items up for auction
function start() {
  // prompt for info about the item being put up for auction
  inquirer.prompt([
      {
        type: "item",
        name: "inputItemID",
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
        message: "How many units would you like to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(userAnswer) {
      var query = "SELECT * FROM products WHERE item_id=?";
      connection.query(query, {item_id: userAnswer.inputItemID}, function(err, res) {
        if(err) throw err;

        if (res[0].stock_qty < userAnswer.purchaseUnits){
          console.log("Sorry, insuffecient quantity, only " + res[0].stock_qty + "in stock");
          start();
        } else {
          // product logging
        }
      })
    });
}

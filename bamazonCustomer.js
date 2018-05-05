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
    table.setHeading("item_id", "product_name", "dept_name", "price", "stock")
    if (err) throw err;
      // Log all results of the SELECT statement
      for (var i = 0; i < res.length; i++) {
          var itemID = res[i].item_id;
          var prodID = res[i].product_name;
          var deptID = res[i].dept_name;
          var priceID = res[i].price;
          var stockQTY = res[i].stock_qty;
          table.addRow(itemID, prodID, deptID, priceID, stockQTY);
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

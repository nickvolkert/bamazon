var mysql = require("mysql");
var inquirer = require("inquirer");
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

// function to handle posting new items up for auction
function start() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the ID of the item you would like to buy (1-10)?"
      },
      {
        name: "purchaseUnits",
        type: "input",
        message: "How many units would you like to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].item_name === answer.choice) {
          chosenItem = results[i];
        }
      }
    });
}

// id INT NOT NULL AUTO_INCREMENT,
//   product_name VARCHAR(100) NOT NULL,
//   dept_name VARCHAR(100) NOT NULL,
//   category VARCHAR(45) NOT NULL,
//   price DECIMAL(10, 4) NULL,
//   stock_qty DECIMAL(10, 4) NULL,


function productListing(res) {
  var query = "SELECT * FROM products";
  connection.query(query, function(error, res) {
    if (error) throw err;
      // Log all results of the SELECT statement
      for (var i = 0; i < res.length; i++) {
        console.log('Product Name: ' + res[i].id);
  			console.log('Product Name: ' + res[i].product_name);
  			console.log('Department: ' + res[i].dept_name);
  			console.log('Price: $' + res[i].price);
        console.log('Stock: ' + res[i].stock_qty);
        logItPretty();
  		}
      start();
  });
}
//
// if(argumentTwo === "my-tweets"){
//     var params = { screen_name: "nickv47", count: 20 };
//     twitterApp.get("statuses/user_timeline", params, function(error, tweets, response) {
//       if (!error) {
//         for (var i = 0; i < tweets.length; i++) {
//           console.log('"' + tweets[i].text + '"');
//           console.log("");
//           console.log("Tweet Created: " + tweets[i].created_at);
//           logItPretty();
//         }
//       }
//     });
// }

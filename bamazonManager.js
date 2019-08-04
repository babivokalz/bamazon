var keys = require("./databaseKeys.js");
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: keys.databaseHost,
  user: keys.databaseUser,
  password: keys.databasePassword,
  database: keys.database
});

connection.connect(function(err) {
  if (err) throw err;
  setTimeout(function() {
    inquirerPrompt();
  }, 1000);
});

function inquirerPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Hello, what would you like to do today?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
    ])
    .then(function(youPick) {
      if (youPick.choice === "View Products for Sale") {
        showProductList();
      } else if (youPick.choice === "View Low Inventory") {
        showLowInventory();
      } else if (youPick.choice === "Add to Inventory") {
        addInventory();
      } else if (youPick.choice === "Add New Product") {
        addNewProduct();
      }
    });
}

function showProductList() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.log(
      "\n============================================================================================="
    );
    console.log(
      "| Item ID:      | Name:   \t \t | Department: \t | Price: \t | Stock Quantity:  |"
    );
    console.log(
      "---------------------------------------------------------------------------------------------"
    );
    for (i = 0; i < results.length; i++) {
      console.log(
        `| ${results[i].item_id} \t   \t| ${results[i].product_name} \t \t | ${
          results[i].department_name
        } \t | ${results[i].price} \t | ${results[i].stock_quantity} \t \t    |`
      );
      console.log(
        "---------------------------------------------------------------------------------------------"
      );
    }
  });
}

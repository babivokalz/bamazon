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
  setTimeout(function() {
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
            "Add New Product",
            "Cancel"
          ]
        }
      ])
      .then(function(youPick) {
        switch (youPick.choice) {
          case "View Products for Sale":
            showProductList();
            break;
          case "View Low Inventory":
            showLowInventory();
            break;
          case "Add to Inventory":
            addInventory();
            break;
          case "Add New Product":
            addInventory();
            break;
          case "Cancel":
            process.exit();
            break;
          default:
            console.log("You've made an invalid choice, please try again!");
        }
      });
  }, 1000);
}

function showProductList() {
  console.log(
    "\n************************ Here is a list of availble items for sale: *************************\n"
  );
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.log(
      "============================================================================================="
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
  inquirerPrompt();
}

function showLowInventory() {
  console.log(
    "\n***** Here's a list of all products with a stock quantity of less than or equal to 10: ******\n"
  );
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.log(
      "============================================================================================="
    );
    console.log(
      "| Item ID:      | Name:   \t \t | Department: \t | Price: \t | Stock Quantity:  |"
    );
    console.log(
      "---------------------------------------------------------------------------------------------"
    );
    for (i = 0; i < results.length; i++) {
      if (results[i].stock_quantity <= 10) {
        console.log(
          `| ${results[i].item_id} \t   \t| ${
            results[i].product_name
          } \t \t | ${results[i].department_name} \t | ${
            results[i].price
          } \t | ${results[i].stock_quantity} \t \t    |`
        );
        console.log(
          "---------------------------------------------------------------------------------------------"
        );
      }
    }
  });
  inquirerPrompt();
}

// function addInventory() {
//     console.log("\nWhich item would you like to stock to?");
//     var currentStock = 0;
//     connection.query("SELECT * FROM products WHERE item_id=?", function(err, results){
//         if (err) throw (err) {
//             currentStock = (results[0].stock_quantity)
//             var newStock = (currentStock + )
//         }
//     })

// }

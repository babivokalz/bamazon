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
  start();
  productList();
  setTimeout(function() {
    inquirerPrompt();
  }, 1000);
});

function start() {
  console.log(
    "\n============================================================================================="
  );
  console.log(
    "=================================== Welcome to Bamazon! ====================================="
  );
  console.log(
    "=============================================================================================\n"
  );
}

function productList() {
  console.log(
    "************************ Please choose an item from the list below: *************************\n"
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
}

function inquirerPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "itemID",
        message:
          "Please enter in the Item ID of the item you'd like to purchase.\n"
      },
      {
        type: "input",
        name: "quantity",
        message:
          "Please enter in the desired quantity that you would like to purchase for your item."
      }
    ])
    .then(function(answer) {
      var item = {
        id: answer.itemID - 1,
        quantity: answer.quantity
      };
      if (item.quantity > 0) {
        if (item.quantity < results[item.id].stock_quantity) {
          connection.query(
            "UPDATE products SET stock_quantity = stock_quantity - " +
              item.quantity +
              "WHERE item_id = " +
              item.id
          );
        }
      }
      checkInventory(answer.itemID, answer.quantity);
      setTimeout(function() {
        anotherPurchase();
      }, 1000);
    });
}
function anotherPurchase() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "wantMore",
        message: "Would you like to make another purchase?"
      }
    ])
    .then(function(maybe) {
      if (maybe.wantMore) {
        inquirerPrompt();
      } else {
        console.log("\nPlease come again!\n");
        process.exit();
      }
    });
}

function checkInventory(item_id, inputQuantity) {
  if (err) {
    console.log(err);
  }
  if (inputQuantity <= results[0].stock_quantity) {
    var customerTotal = results[0].price * inputQuantity;
    console.log("Good news! Your desired item is in stock!");
    console.log(
      "Your total cost for " +
        inputQuantity +
        " " +
        results[0].product_name +
        " is " +
        customerTotal +
        "."
    );
  } else {
    console.log("Insuffient quantity!");
  }
}

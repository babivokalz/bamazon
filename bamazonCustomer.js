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
        `| ${results[i].item_id} \t   \t| ${results[i].product_name} \t \t | ${results[i].department_name} \t | ${results[i].price} \t | ${results[i].stock_quantity} \t \t    |`
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
        name: "itemId",
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
      checkStock(answer.itemId, answer.quantity);
      setTimeout(function() {
        anotherPurchase();
      }, 1000);
    });
}

function checkStock(itemId, desiredQuantity) {
  console.log("Seeing how many of those we have in stock...");
  connection.query(`SELECT * FROM products WHERE item_id='${itemId}'`, function(
    err,
    res
  ) {
    if (err) throw err;
    let currentStockCount = res[0].stock_quantity;
    let unitPrice = res[0].price;
    console.log(
      `You're looking for ${desiredQuantity} ${res[0].product_name}s. We have ${res[0].stock_quantity} in stock.`
    );
    if (currentStockCount < desiredQuantity) {
      console.log("Sorry! Insufficient quantity!\n");
      return;
    } else {
      decreaseStockAndShowAll(
        itemId,
        currentStockCount,
        desiredQuantity,
        unitPrice
      );
    }
  });
}

function decreaseStockAndShowAll(
  itemId,
  currentStockCount,
  desiredQuantity,
  unitPrice
) {
  console.log("Pulling from the shelf...");
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: currentStockCount - desiredQuantity
        // product_sales: unitPrice * desiredQuantity
      },
      {
        item_id: itemId
      }
    ],
    function(err, res) {
      if (err) throw err;
    }
  );
  console.log(
    `Done. The total cost is $${(unitPrice * desiredQuantity).toFixed(2)}\n`
  );
  productList();
}

//     then(function(userPurchase) {
//       connection.query(
//         "SELECT * FROM products WHERE item_id=?",
//         userPurchase.itemId,
//         function(err, results) {
//           for (var i = 0; i < results.length; i++) {
//             if (userPurchase.quantity > results[i].stock_quantity) {
//               console.log(
//                 "\nSorry! We have insufficient quantity for that item!\n"
//               );
//               console.log("Please choose an item from the table below:");
//               start();
//               productList();
//               setTimeout(function() {
//                 inquirerPrompt();
//               }, 1000);
//             } else {
//               console.log("Good news! Your desired item is in stock!");
//               console.log(
//                 "Your total cost for " +
//                   userPurchase.quantity +
//                   " " +
//                   results[0].product_name +
//                   " is " +
//                   "$" +
//                   userPurchase.quantity * results[0].price +
//                   "."
//               );
//               var updatedInventory =
//                 results[i].stock_quantity - userPurchase.quantity;
//               var purchaseID = userPurchase.itemId;
//               setTimeout(function() {
//                 anotherPurchase();
//               }, 1000);
//             }
//           }
//         }
//       );
//     });
// }

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
        productList();
        inquirerPrompt();
      } else {
        console.log("\nThank you, please come again!\n");
        process.exit();
      }
    });
}

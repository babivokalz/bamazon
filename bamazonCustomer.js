var inquirer = require("inquirer");
var mysql = require("mysql");
var keys = require("./databaseKeys.js");
var connection = mysql.createConnection({
  host: keys.databaseHost,
  user: keys.databaseUser,
  password: keys.databasePassword,
  database: keys.database
});

connection.connect(function(err) {
  if (err) throw err;

  start();
});

function start() {
  console.log("\nWelcome to Bamazon! What would you like to buy?");
  productList();
}

function productList() {
  console.log("Please choose an item from the list below: ");
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
  });
}

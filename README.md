# bamazon

## Overview:

For this assignment, we were to create a node application called "bamazon" that takes in commands lines from the user. This app closely resembles Amazon where it will take in orders from customers and adjust your store's inventory, and tracks product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

## Technologies Used:

- Node.JS
- MySQL
- Inquirer

## Usage:

### Customer view

> node bamazonCustomer.js

When the user runs the command, "node bamazonCustomer.js" they are met with a welcome screen that displays the item ID, available product names, departments, and the price. The user is then prompted with a question that asks them to enter in the item ID of the item that they would like to purchase.

> ![alt text][logo]

> [logo]: https://github.com/babivokalz/bamazon/blob/master/images/loaded%20screen.png "loaded screen"

Once the user answers the first prompt, they are prompted once more to enter in the desired quantity for the item. Once the quantity is entered, the user will receive a

> ![alt text][logo1]
> [logo1]: https://github.com/babivokalz/bamazon/blob/master/images/asks%20customer%20to%20enter%20in%20qt.png "qt amt"

### Manager view

> node bamazonManager.js

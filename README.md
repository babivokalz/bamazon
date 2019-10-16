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

Once the user answers the first prompt, they are prompted once more to enter in the desired quantity for the item. Once the quantity is entered, the user will receive a notification that the item of their desired quantity is in stock and will display the total cost of the item.

> ![alt text][logo1]

> [logo1]: https://github.com/babivokalz/bamazon/blob/master/images/total%20cost%20of%20item.png "qt amt and total"

The item quantity is then updated to reflect the amount that the user purchased

> ![alt text][logo2]

> [logo2]:

The user will then be asked if they would like to make another purchase, if they choose yes then they will be prompted to enter in the item ID and quantity that they would like to purchase next.

> ![alt text][logo3]

> [logo3]: https://github.com/babivokalz/bamazon/blob/master/images/Customer%20says%20Y%20.png "yes to another purchase"

If the user declines and doesn't not wish to make another purchase, then a nice goodbye message is displayed and the application will end.

> ![alt text][logo4]

> [logo4]: https://github.com/babivokalz/bamazon/blob/master/images/customer%20declines%20another%20purchase.png "no to another purchase"

### Manager view

> node bamazonManager.js

var mysql = require("mysql");
var inquirer = require("inquirer");
// var = inStock;
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "bamazon_DB"
});

// // Setting up connection function
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
//   readProducts();
// });

// Setting up display products function

connection.connect(function(err) {
	if (err) throw err;
	home();
});

function home() {
	inquirer.prompt([
		{
			name: 'order',
			type: 'list',
			message: 'Hello! Welcome to our shop, are you interested in browsing items for sale?',
			choices: ['Yes!', 'No, Thank you!']
		}
	]).then(function(answer) {
		if (answer.order == 'Yes!') {
			shop();
		} else {
			connection.end();
			console.log('\n Well alright then! Have a great day!\n');
		}
	});
}


function shop() {
	console.log('\nItems for sale\n');
	connection.query('SELECT * FROM products', function(err, res) {
		if (err) {
			console.log(err)
		} else {
			for (var i = 0; i < res.length; i++) {
				console.log('ID: ' + res[i].id);
				console.log('Item: ' + res[i].product_name);
				console.log('Price: ' + res[i].price);
				console.log('Units in stock: ' + res[i].stock_quantity);
				console.log('Department : ' + res[i].department_name + '\n');
				console.log('--------------------------------------------\n');
			}

			inquirer.prompt([
				{
					name: 'idRequested',
					type: 'input',
					message: '\nWhat is the [ID] of the item you would like to purchase?'
				},
				{
	    			name: 'numbers',
	    			type: 'input',
	    			message: 'How many of this item would you like to buy?'
	   		 	}
			]).then(function(answer) {
				if (answer.idRequested != '' && answer.numbers != '') {
					inStock = res[(answer.idRequested - 1)].stock_quantity;
	    			checkout(answer.idRequested, answer.numbers);
	    		} else {
	    			console.log('\nPlease answer all fields\n');
	    			shopMore();
	    		}
			});
		}
	});
};

function checkout(item, quantity) {
	if (quantity <= inStock) {
		var query = 'UPDATE products SET stock_quantity = ' + (inStock - quantity) + ' WHERE id = ' + item;
		connection.query(query, function(err, res) {
			if (err) throw err;
			console.log('\n=================================');
			console.log('\nYou ordered: ' + quantity + ' units of the item with an ID of ' + item + '.\n');
			shopMore();
		});
	} else {
		console.log("Whoops! We are out of that item, please try another!");
		shop();
	}
};

function shopMore() {
	inquirer.prompt([
		{
			name: 'again',
			type: 'confirm',
			message: 'Would you like to continue shopping?'
		}
	]).then(function(answer) {
		if (answer.again === true) {
			shop();
		} else {
			connection.end();
			console.log('\nThank you for shopping with us!\n');
		}
	});
};


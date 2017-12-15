var mysql = require("mysql");
var inquirer = require("inquirer");
var = inStock;
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "bamazon_DB"
});

// Setting up connection function
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

// Setting up display products function

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
  console.log(res); 
  start();
  })



// function which prompts the user for what action they should take
function start() {
  inquirer.prompt([
    {
      name: "idRequested",
      type: "list",
      message: "What is the [ID] of item you would like to purchase?",
      choices: ["1","2","3","4","5","6","7","8","9","10"]
    },
    {
    type: "input",
    name: "number",
    message: "How many of this item would you like?"
    },
  ])
    .then(function(user) {
      // based on their answer, either call the bid or the post functions
      console.log("You are buying " + user.number + "qty of item number #" + user.idRequested), 
      updateProduct();
    

    function updateProduct() {
      console.log("Placing Order....\n");
      var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: user.number
          },
          {
            id: (inStock - user.idRequested)
          }
        ],
        function(err, res) {
          console.log("Order for " + user.idRequested + " confirmed!\n");
          console.log("Only "+ res.affectedRows + " reamining!")
        })};
        })}};

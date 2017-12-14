var mysql = require("mysql");
var inquirer = require("inquirer");

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
});

// Setting up display products function

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
  console.log(res);
  });
    // Log all results of the SELECT statement
 
 
 }
readProducts();

// start();
// 
// // function which prompts the user for what action they should take
// function start() {
//   inquirer
//     .prompt({
//       name: "idRequested",
//       type: "rawlist",
//       message: "What is the [ID] of item you would like to purchase?",
//       choices: ["POST", "BID"]
//     })
//     .then(function(answer) {
//       // based on their answer, either call the bid or the post functions
//       if (answer.postOrBid.toUpperCase() === "POST") {
//         postAuction();
//       }
//       else {
//         bidAuction();
//       }
//     });
// }

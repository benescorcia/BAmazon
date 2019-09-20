const mysql = require("mysql");
const inquirer = require("inquirer")


const connection = mysql.createConnection({
  host: "localhost",
  // Your port
  port: 8889,
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "bamazon"
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected to server!")
});


//fun part


connection.query("Select * from products", function (err, res) {
  if (err) throw err;
  console.table(res);
  orderPurchase();
});
function orderPurchase() {
  inquirer.prompt([
    {
      name: "buy",
      type: "input",
      message: "\n\n Please enter the ID of the product you would like to buy."
    },
    {
      name: "amount",
      type: "input",
      message: "\n\n Please enter how many units of the product you would like to buy."
    }
  ]).then(function (answer) {
    console.log (answer.buy)
    console.log (answer.amount)
const productsId = answer.buy
const amountId = answer.amount

    connection.query("select * from products where id = ?", answer.buy, function (err, res) {
      if (err) throw err;
      console.log(parseInt(answer.amount))
      console.log(res[0].stock)
      if (!res.length) {
        console.log("sorry, please select an item that is in the inventory. Please try again.");
        orderPurchase();
      } else if (parseInt(answer.amount) > parseInt(res[0].stock)) {
        console.log("sorry we are currently out of stock, please try again");
        orderPurchase();
      } else {
        const updateStock = res[0].stock - amountId
        updateProduct(productsId,updateStock)
        console.log (updateStock)
      }
    })
  })
}
function updateProduct(id,amount) {
  console.log("Updating inventory...\n");
  var query = connection.query(
    " UPDATE products SET ? WHERE ? ",
    [
      {
        stock: amount
      },
      {
        id: id 
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
    }
  );
  }

  function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }

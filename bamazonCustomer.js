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
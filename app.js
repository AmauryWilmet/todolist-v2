const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))

let todoList = ['Exemple1', 'Exemple2'];
let date = new Date();
let days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

app.get('/', function(req, res) {
  res.render('index', {todoList:todoList, date: date, days:days, months: months});
});

app.post('/', function(req, res) {
  let newTodoElement = req.body.newTodo;
  todoList.push(newTodoElement);
  res.render('index', {todoList:todoList, date: date, days:days, months: months});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

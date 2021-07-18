const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const mongoose = require('mongoose');

const Task = require('./models/Task');
const TodoList = require('./models/TodoList');

app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))

let date = new Date();
let days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
let currentNameTodolist = "Today";
let exempleTask = new Task({
  name: "Exemple"
});
let exempleTodoList = [exempleTask];

connectToTheDatabase();

app.get('/', (req, res) => {
  currentNameTodolist = "Today";
  TodoList.findOne({name: 'Today'}, (err, todoLists) => {
    res.render('index', {nameTodolist: currentNameTodolist, todoList:todoLists.todoList, date: date, days:days, months: months});
  });
});

app.get('/:todoName', async (req, res) => {
  if (req.params.todoName != "delete") {
    currentNameTodolist = req.params.todoName;
    let isAlreadyExist = false;
    let newTodoList = new TodoList({
      name: currentNameTodolist,
      todoList: exempleTodoList
    });
    try {
      await newTodoList.save();
    } catch(err) {
      console.log("");
    }
    TodoList.findOne({name: req.params.todoName}, (err, todoLists) => {
      res.render('index', {nameTodolist: currentNameTodolist, todoList:todoLists.todoList, date: date, days:days, months: months});
    });
  } else {
    res.redirect("/delete");
  }
});

app.post('/delete', (req, res) => {
  let task = req.body.elementTodo;
  let newListTask = [];
  TodoList.findOne({name: currentNameTodolist}, (err, todoList) => {
    if (err) {
      console.log(err);
    } else {
      newListTask = todoList.todoList;
      newListTask.splice(todoList.todoList.indexOf(task), 1);
      TodoList.findOneAndUpdate({name: currentNameTodolist}, {todoList: newListTask}, (err) => {});
    }
  });
  if (currentNameTodolist == "Today" || currentNameTodolist == "favicon.ico") {
    res.redirect("/");
  } else {
    res.redirect("/" + currentNameTodolist);
  }
});

app.post('/', async (req, res) => {
  currentNameTodolist = "a";
  let newTask = new Task({
    name: req.body.nameTask
  });
  console.log(newTask);
  await updateTodoList(newTask, currentNameTodolist);
  res.redirect('/');
});

app.post('/:nameTodoList', async (req, res) => {
  currentNameTodolist = req.params.nameTodoList;
  let newTask = new Task({
    name: req.body.nameTask
  });
  console.log(newTask);
  await updateTodoList(newTask, currentNameTodolist);
  res.redirect('/' + currentNameTodolist);
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

function connectToTheDatabase() {
  mongoose.connect('mongodb://localhost:27017/Todolist', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false});
}

function updateTodoList(newTask, nameTodoList) {
  TodoList.findOne({name: nameTodoList}, (err, todoLists) => {
    let newTodo = [];
    newTodo = todoLists.todoList;
    newTodo.push(newTask);
    TodoList.findOneAndUpdate({name: nameTodoList}, {todoList: newTodo}, (err, todoList) => {
      if (err) {
      } else {
        console.log(newTodo);
        console.log("Update l'ami !!!!!!!!!!!!!!");
      }
    });
  });
}

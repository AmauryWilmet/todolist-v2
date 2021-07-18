const mongoose = require('mongoose');
const Task = require('./Task');

const TodoListSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  todoList: [{
    name: {
      type: String,
      minLength: 1
    },
    finish: {
      type: Boolean,
      default: false
    }
  }]
});

module.exports = mongoose.model('TodoList', TodoListSchema);

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Todo = require('./models/todo')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/todo', (req, res) => {
  Todo.find((err, todos) => {
    if(err) {
      res.send(err)
    } else {
      res.json(todos)
    }
  })
})

app.post('/todo', (req, res) => {
  const todo = new Todo()
  todo.text = 'Test2'

  todo.save((err, todo) => {
    if(err) {
      res.send(err)
    } else {
      res.json(todo)
    }
  })
})

mongoose.connect('mongodb://localhost:27017/todo')

app.listen(8080, () => console.log('Server is up & running!'))

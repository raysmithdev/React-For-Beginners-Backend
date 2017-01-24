const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Todo = require('./models/todo')
const router = express.Router()


mongoose.connect('mongodb://localhost:27017/todo')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

router.use((req, res, next) => {
    console.log('Something is happening.')
    next()
});

router.route('/todo')

  .get((req, res) => {
    Todo.find((err, todos) => {
      if(err) {
        res.send(err)
      } else {
        res.json(todos)
      }
    })
  })

  .post((req, res) => {
    const todo = new Todo()
    todo.text = req.body.postName

    todo.save((err, todo) => {
      if(err) {
        res.send(err)
      } else {
        Todo.find((err, todos) => {
          if(err) {
            res.send(err)
          } else {
            res.json(todos)
          }
        })
      }
    })
  })

  .delete((req, res) => {
    Todo.findByIdAndRemove(req.body.id, (err, todo) => {
      if(err) {
        res.send(err)
      } else {
        Todo.find((err, todos) => {
          if(err) {
            res.send(err)
          } else {
            res.json(todos)
          }
        })
      }
    })
  })

app.use('/', router);

app.listen(8080, () => console.log('Server is up & running!'))

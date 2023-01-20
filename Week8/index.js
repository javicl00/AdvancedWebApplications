
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const fs = require('fs')
const path = require('path')
let users = require('./model/users.json')
let todosJson = require('./model/todos.json')
const port = 3000;

function getUserByUsername(username) {
  return users.find(user => user.username === username)
}

function getUserById(id) {
  return users.find(user => user.id === id)
}

const initializePassport = require('./passport-config')
initializePassport(passport, getUserByUsername, getUserById)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', checkAuthenticated, (req, res) => {
  res.send("Welcome to the homepage")
})

app.post('/api/user/register', (req, res) => {
  console.log("register")
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  console.log(username, password);
  let user = getUserByUsername(username)
  if (user) {
    res.status(400).send("Usuario ya existente");
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10);
    let user = {
      id: users.length + 1,
      username: req.body.username,
      password: hashedPassword
    };
    users.push(user)
    fs.writeFile('./model/users.json', JSON.stringify(users), (err) => {
      if (err) {
        console.log(err)
      }
    })
    res.status(200).send(user);
  }
})


app.get('/api/user/list', (req, res) => {
  // returns the list of users after register
  res.send(users);

})
// If the user is already logged in redirect to the homepage, otherwise redirect to exito or fail
app.post('/api/user/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/api/user/exito',
  failureRedirect: '/api/user/fail'
}))

app.get('/api/user/exito', (req, res) => {
  res.status(200).set('set-cookie', req.headers.cookie).send("Login exitoso")
})

app.get('/api/user/fail', (req, res) => {
  res.status(401).send("Login fallido");
})
// This route can only be accessed if the user is logged in. If not, it will respond with a 401 status code.
app.get('/api/secret', checkAuthenticated, (req, res) => {
  res.status(200).send("Autorizado");
})



app.get('/api/secret/exito', (req, res) => {
  res.status(200).send("Autorizado");
})

app.get('/api/secret/fail', (req, res) => {
  res.status(401).send("No autorizado");
})

app.post('/api/todos', (req, res) => {
  let user = getUserById(req.user.id);
  if (user) {
    let todo = {
      id: user.id,
      text: req.body.todo
    }
    let tarea = todosJson.find(todo => todo.id === user.id)
    if (tarea) {
      tarea.todos.push(todo)
    } else {
      let todoList = {
        id: user.id,
        todos: [todo]
      }
      todosJson.push(todoList)
    }
    fs.writeFile('./model/todos.json', JSON.stringify(todosJson), (err) => {
      if (err) {
        console.log(err)
      }
    })
    res.status(200).set('user', req.user).send("Tarea agregada");
  } else {
    res.status(400).send("Usuario no encontrado");
  }
})



app.get('/api/todos/list', (req, res) => {
  let user = getUserByUsername(req.query.username);
  if (user) {
    res.status(200).send(user.todos);
  } else {
    res.status(400).send("Usuario no encontrado");
  }
})












app.get('/', (req, res) => {
  res.send("Welcome to the homepage");
})


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  return res.status(401).send("No estas logueado")
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')

  }
  return next()
}


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
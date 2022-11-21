var express = require('express');
var router = express.Router();
var pug = require('pug');


let todos = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My todos' });
});

router.post('/todo', function (req, res, next) {
  let name = req.body.name;
  let task = req.body.task;

  name = name;
  task = task;

  // insert a todo to a name if it already exists
  let index = todos.findIndex((todo) => {
    return todo.name === name;
  });

  if (index === -1) {
    todos.push({ name: name, tasks: [task] });
    res.render('../views/index.pug', { title: "My todos", msg: "User added" });
  } else {
    // if task already exists, don't add it
    todos[index].tasks.push(task);
    res.render('../views/index.pug', { title: "My todos", msg: "Todo added" });
  }
  console.log(todos);

});

// Task 3: Fetch users from server
router.get('/user/:id', function (req, res, next) {
  let name = req.params.id;
  name = name;
  let index = todos.findIndex((todo) => {
    return todo.name === name;
  }
  );
  console.log(index);
  console.log("llega");
  if (index === -1) {
    console.log("no encontrado");
    res.render('index', { msg: 'User not found', title: 'My Todos' });
  } else {
    console.log("encontrado");
    console.log(todos[index]);
    let user = todos[index];
    res.render('../views/index.pug', { title: 'My Todos', message: todos[index] });
  }
});

// Task 4: Delete users from server
router.delete('/user/:id', function (req, res, next) {
  let name = req.params.id;
  name = name;
  let index = todos.findIndex((todo) => {
    return todo.name === name;
  }
  );
  if (index === -1) {
    res.send('User not found');
  } else {
    todos.splice(index, 1);
    res.render('../views/index.pug', { title: "My todos", msg: "User deleted" });
  }
});

// Task 5: Update users from server / Delete todos
router.delete('/user/:id/:task', function (req, res, next) {
  let name = req.params.id;
  let task = req.params.task;
  name = name;
  task = task;
  let index = todos.findIndex((todo) => {
    return todo.name === name;
  }
  );
  if (index === -1) {
    res.send('User not found');
  } else {
    let taskIndex = todos[index].tasks.indexOf(task);
    if (taskIndex === -1) {
      res.render('../views/index.pug', { title: "My todos", msg: "Task not found" });
    } else {
      todos[index].tasks.splice(taskIndex, 1);
      res.render('../views/index.pug', { title: "My todos", msg: "Task deleted" });
      // res.send('Task deleted');
    }
  }
});

router.put('/user', function (req, res, next) {
  let name = req.body.name;
  let task = req.body.index;
  console.log(typeof name);
  name = name;
  console.log(task);
  // newTask = newTask;
  let ind = todos.findIndex((todo) => {
    return todo.name === name;
  });

  if (ind === -1) {
    res.render('../views/index.pug', { title: "My todos", msg: "User not found" });
  } else {
    // let taskIndex = todos[index].tasks.indexOf(task);
    // Task is the index of the task to be updated
    if (task < 0 || task >= todos[ind].tasks.length) {
      res.render('../views/index.pug', { title: "My todos", msg: "Task not found" });
      // res.send('Task not found');
    } else {
      // todos[index].tasks[task] = newTask;
      todos[ind].tasks.splice(task, 1);// Delete task with index task in array tasks of user with index index
      res.render('../views/index.pug', { title: "My todos", msg: "Task updated" });
      // res.send('Task updated');
    }
  }
});


module.exports = router;

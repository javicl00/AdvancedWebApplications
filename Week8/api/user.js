const express = require('express');
const router = express.Router();
const users = require('../model/users.json');
const bcrypt = require('bcrypt');
const session = require('express-session');

router.use(session({
    name: 'connect.sid',
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}));

router.post('/register', (req, res) => {
    let body = req.body;
    let user = body.username;
    let pass = body.password;
    let id = users.length + 1;
    let userExists = users.find(u => u.username === user);

    if (user && pass && !userExists) {
        let newUser = {
            id: id,
            username: user,
            password: bcrypt.hashSync(pass, 10)
        };
        users.push(newUser);
        res.send(newUser);
    } else {
        res.status(400).send('Bad request');
    }
});

router.get('/list', (req, res) => {
    res.send(users);
});

router.post('/login', (req, res) => {
    let body = req.body;
    let user = body.username;
    let pass = body.password;
    let userExists = users.find(u => u.username === user);

    if (user && pass && userExists) {
        let match = bcrypt.compareSync(pass, userExists.password);
        if (match) {
            // send a session cookie
            res.status(200).send(session.Cookie);
        } else {
            res.status(401).send('Wrong password');
        }
    } else {
        res.status(401).send('Bad request');
    }
});
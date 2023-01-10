const express = require('express');
const app = express();
const session = require('express-session');
const userApi = require('./api/user');
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.use(express.static('public'));
//usar router
app.use('/api', userApi);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    name: 'connect.sid',
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}));


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    });

module.exports = app;
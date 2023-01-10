// servidor typeScript
const express = require('express');
const typeScript = require('typescript');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/hello', (req, res) => {
    // set a string variable with typeScript
    let hello: string = 'Hello World!';
    res.send('Hello World!');
});

// using typescript


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();//create an instance of express

const port = 3000 || process.env.PORT;


app.use(express.static(path.join(__dirname, 'public')));//serve static files

app.use(express.json());//parse json

app.use(bodyParser.json());//parse json
app.use(express.urlencoded({ extended: true }));//parse urlencoded

app.get('/', (req, res) => {// root route 
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//start the server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});



app.get('/hello', (req, res) => {
    res.json({ msg: 'Hello World' });
});

app.get('/echo/:id', (req, res) => {
    res.json({ id: req.params.id });
});

app.post('/sum', (req, res) => {
    let sum = 0;
    let i = 0;
    let numbers = req.body.numbers;
    while (i < numbers.length) {
        sum += numbers[i];
        i++;
    }
    res.json({ sum: sum });
});

let words = [];
app.post('/list', (req, res) => {
    words.push(req.body.text);
    // devolver la lista de palabras sin terminar la petición
    res.json({ words: words });

});
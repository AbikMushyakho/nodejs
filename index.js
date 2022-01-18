const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const res = require('express/lib/response');
const req = require('express/lib/request');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'staffdb',
    insecureAuth: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Database connection successful.');
    else
        console.log('Database connection failed \n Error :' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log('Express server started on port no : 3000'));

//get all staffs
app.get('/staff', (req, res) => {
    mysqlConnection.query('SELECT * FROM staff', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//get a single staff record
app.get('/staff/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM staff WHERE staffId = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
})
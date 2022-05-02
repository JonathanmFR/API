const express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
    }));

    // default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'bonjours' })
});

app.get("/", (req, res) => {
    console.log("OK")
    res.status(200).send()
})

app.listen(4000, () => console.log("Connecté")) 

// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_js_api'
    });
    
    // connect to database
    dbConn.connect(); 
    
    // Retrieve all users 
    app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
        });
    });
    
    // Retrieve user with id 
    app.get('/user/:id', function (req, res) {
        let user_id = req.params.id;
        if (!user_id) {
            return res.status(400).send({ error: true, message: 'Veuillez fournir user_id' });
    }
    
    dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });
    });
    
    // Add a new user  
    app.post('/user', function (req, res) {
        let user = req.body.user;
            if (!user) {
            return res.status(400).send({ error:true, message: 'Veuillez fournir user_id user' });
    }
    
    dbConn.query("INSERT INTO users SET ? ", { user: user }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Le nouvelle utilisateur a bien été crée.' });
    });
    });
    
    //  Update user with id
    app.put('/user', function (req, res) {
        let user_id = req.body.user_id;
        let user = req.body.user;
        if (!user_id || !user) {
            return res.status(400).send({ error: user, message: 'Veuillez fournir user_id user et user_id' });
    }
    
    dbConn.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
    if (error) throw error;
        return res.send({ error: false, data: results, message: 'Le nouvelle utilisateur a bien été modofier.' });
    });
    });
    
    //  Delete user
    app.delete('/user', function (req, res) {
        let user_id = req.body.user_id;
        if (!user_id) {
        return res.status(400).send({ error: true, message: 'Veuillez fournir user_id' });
    }
    
    dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Le nouvelle utilisateur a bien été modifier.' });
        });
    }); 

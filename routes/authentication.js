const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

router.get('/login', (req, res, next) => {
    var username = req.query.username;
    var password = req.query.password;
    var con = mysql.createConnection({
        host: "151.236.216.100",
        user: "app_db_admin",
        password: "Kira2014!",
        database: "app_accounts"
    });
    con.connect((err) => {
        if (err) throw err;
        con.query(`SELECT * FROM user_info WHERE username='${username}' AND password='${password}'`, (err, result, fields) => {
            if (err) throw err;
            if(result.length > 0){
                res.status(200);
                const token = jwt.sign({username: username}, 'wXga4W8Z7MjqpiGVMyuPJnTdZ80xw9LR');
                const fname = result[0].fname;
                const lname = result[0].lname;
                const email = result[0].email;
                res.json({msg: 'User found!', username: username, fname: fname, lname: lname, email: email, token: token});
            }
            else{
                res.status(401);
                res.json({msg: 'User not found!', username: username});
            }
        });
        con.end();
    });
    res.status(500);
});

module.exports = router;
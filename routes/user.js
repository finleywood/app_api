const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const auth  = require('../middleware/auth');

router.get('/info', auth, (req, res, next) => {
    const username = req.query.username;
    var con = mysql.createConnection({
        host: "localhost",
        user: "app_db_admin",
        password: "Kira2014!",
        database: "app_accounts"
    });
    con.connect((err) => {
        if (err) throw err;
        con.query(`SELECT * FROM user_info WHERE username='${username}'`, (err, result, fields) => {
            if (err) throw err;
            const fname = result[0].fname;
            const lname = result[0].lname;
            const email = result[0].email;
            const user = {
                fname: fname, 
                lname: lname,
                email: email,
                username: username
            };
            res.status(200);
            res.json(user);
        });
        con.end();
    });
    res.status(500);
    res.json({msg: "Internal server error!"});
});

module.exports = router;
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const auth = require('../middleware/auth');

const getUserId = (username) => {
    var uid = 0;
    var con = mysql.createConnection({
        host: "151.236.216.100",
        user: "app_db_admin",
        password: "Kira2014!",
        database: "app_accounts"
    });
    con.connect((err) => {
        if (err) throw err;
        con.query(`SELECT id, username FROM user_info WHERE username='${username}'`, (err, result, fields) => {
            if (err) throw err;
            uid = result[0].id;
        });
        con.end();
    });
    return uid;
}


router.get('/view/all', auth, (req, res, next) => {
    const username = req.query.username;
    var uid = getUserId(username);
    var con2 = mysql.createConnection({
        host: "151.236.216.100",
        user: "app_db_admin",
        password: "Kira2014!",
        database: "app_notes"
    });
    con2.connect((err) => {
        if (err) throw err;
        con2.query(`SELECT * FROM notes WHERE user_id=${uid}`, (err, result, fields) => {
            if (err) throw err;
            var notes = [];
            for(var i=0;i<result.length;i++){
                notes[i] = {
                    id: result[i].id,
                    name: result[i].name,
                    content: result[i].content,
                    last_edit: result[i].last_edit
                };
            }
            res.status(200);
            res.json(notes);
        });
        con2.end();
    });
});

router.get('/view/:note_id', auth, (req, res, next) => {
    const note_id = req.params.note_id;
    const username = req.query.username;
    var uid = getUserId(username);
    var con2 = mysql.createConnection({
        host: "151.236.216.100",
        user: "app_db_admin",
        password: "Kira2014!",
        database: "app_notes"
    });
    con2.connect((err) => {
        if (err) throw err;
        con2.query(`SELECT * FROM notes WHERE user_id=${uid} AND id=${note_id}`, (err, result, fields) => {
            if (err) throw err;
            const note = {
                id: note_id,
                name: result[0].name,
                content: result[0].content,
                last_edit: result[0].last_edit
            }
            res.status(200);
            res.json(note);
        });
        con2.end();
    });
});

router.post('/create', auth, (req, res, next) => {
    const name = req.body.name;
    const content = req.body.content;
    const username = req.query.username;
    const uid = getUserId(username);
    var con = mysql.createConnection({
        host: "151.236.216.100",
        user: "app_db_admin",
        password: "Kira2014!",
        database: "app_notes"
    });
    con.connect((err) => {
        if (err) throw err;
        con.query(`INSERT INTO notes (user_id, name, content) VALUES (${uid}, '${name}', '${content}')`, (err, result) => {
            if (err) throw err;
            else{
                res.status(201);
                res.json({msg: "Note Created Successfully!"});
            }
        });
        con.end();
    });
    res.status(500);
});

router.delete('/destroy', auth, (req, res, next) => {
    const username = req.query.username;
    const note_id = req.query.note_id;
    const uid = getUserId(username);
    var con = mysql.createConnection({
        host: "151.236.216.100",
        user: "app_db_admin",
        password: "Kira2014!",
        database: "app_notes"
    });
    con.connect((err) => {
        if (err) throw err;
        con.query(`DELETE FROM notes WHERE id=${note_id} AND user_id=${uid}`, (err, result) => {
            if (err) throw err;
            else{
                res.status(200);
                res.json({msg: "Note deleted!"});
            }
        });
        con.end();
    });
    res.status(500);
});

router.put('/update', auth, (req, res, next) => {
    const username = req.query.username;
    const note_id = req.query.note_id;
    const name = req.body.name;
    const content = req.body.content;
    const uid = getUserId(username);
    var con = mysql.createConnection({
        host: "151.236.216.100",
        user: "app_db_admin",
        password: "Kira2014!",
        database: "app_notes"
    });
    con.connect((err) => {
        if (err) throw err;
        con.query(`UPDATE notes SET name='${name}',content='${content}' WHERE id=${note_id} AND user_id=${uid}`, (err, result) => {
            if (err) throw err;
            else{
                res.status(200);
                res.json({msg: "Note updated!"});
            }
        });
        con.end();
    });
    res.status(500);
});

module.exports = router;
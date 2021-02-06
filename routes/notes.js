const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const auth = require('../middleware/auth');


router.get('/view/all', auth, (req, res, next) => {
    const username = req.query.username;
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
            var uid = result[0].id;
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
        con.end();
    });
});

router.get('/view/:note_id', auth, (req, res, next) => {
    const note_id = req.params.note_id;
    const username = req.query.username;
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
            var uid = result[0].id;
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
        con.end();
    });
});

router.post('/create', auth, (req, res, next) => {
    const name = req.body.name;
    const content = req.body.content;
    const username = req.query.username;
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
            var uid = result[0].id;
            var con2 = mysql.createConnection({
                multipleStatements: true,
                host: "151.236.216.100",
                user: "app_db_admin",
                password: "Kira2014!",
                database: "app_notes"
            });
            con2.connect((err) => {
                if (err) throw err;
                con2.query(`INSERT INTO notes (user_id, name, content) VALUES (${uid}, '${name}', '${content}');SELECT LAST_INSERT_ID()`, (err, result) => {
                    if (err) throw err;
                    else{
                        var note_id = result[0].insertId;
                        res.status(201);
                        res.json({msg: "Note Created Successfully!", id: note_id});
                    }
                });
                con2.end();
            });
        });
        con.end();
    });
    res.status(500);
});

router.delete('/destroy', auth, (req, res, next) => {
    const username = req.query.username;
    const note_id = req.query.note_id;
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
            var uid = result[0].id;
            var con2 = mysql.createConnection({
                host: "151.236.216.100",
                user: "app_db_admin",
                password: "Kira2014!",
                database: "app_notes"
            });
            con2.connect((err) => {
                if (err) throw err;
                con2.query(`DELETE FROM notes WHERE id=${note_id} AND user_id=${uid}`, (err, result) => {
                    if (err) throw err;
                    else{
                        res.status(200);
                        res.json({msg: "Note deleted!"});
                    }
                });
                con2.end();
            });
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
            var uid = result[0].id;
            var con2 = mysql.createConnection({
                host: "151.236.216.100",
                user: "app_db_admin",
                password: "Kira2014!",
                database: "app_notes"
            });
            con2.connect((err) => {
                if (err) throw err;
                con2.query(`UPDATE notes SET name='${name}',content='${content}' WHERE id=${note_id} AND user_id=${uid}`, (err, result) => {
                    if (err) throw err;
                    else{
                        note = {
                            name: req.body.name,
                            content: req.body.content
                        }
                        res.status(200);
                        res.json({msg: "Note updated!", note: note});
                    }
                });
                con2.end();
            });
        });
        con.end();
    });
    res.status(500);
});

module.exports = router;
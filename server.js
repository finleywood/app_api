const express = require('express');
const app = express();

const port = process.env.PORT || 8000;
const host = process.env.HOST || '127.0.0.1';

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/v1', require('./routes/v1'));
app.use((req, res) => {
    res.status(404);
    res.json({msg: 'Endpoint not found!'});
});

app.listen(port, host, (error) => {
    if (error) throw error;
    else{
        console.log(`Server started on ${host}:${port}`);     
    }
});
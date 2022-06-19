
const db = require('./db');
const { User, Phone } = db;
const express = require('express');
const path = require('path');
const app = express();


app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));
app.use('/dist', express.static('dist'));

app.get('/api/users', async (req, res, next)=> {
    try {
        res.send(await User.findAll());
    } catch(er) {
        next(er)
    }
});

app.get('/api/phones', async (req, res, next)=> {
    try {
        res.send(await Phone.findAll());
    } catch(er) {
        next(er)
    }
});

const start = async() => {
    try {
        await db.syncAndSeed();
        const port = process.env.port || 3600;
        app.listen(port, ()=> {
            console.log(`listening on port ${ port }`)
        })

    } catch(er) {
        console.log(er)
    }
}

start();


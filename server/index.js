const express = require('express')
const path = require('path')
const http = require('http')

const knex = require('./db.js')

const app = express()
const people = [
    { id: 1, givenName: 'Alan', familyName: 'Turing' },
    { id: 2, givenName: 'Alan', familyName: 'Kay' },
]

app.get('/api/people', (req, res) => {
    res.json(people);
})

app.use(express.static(path.join(__dirname, '../build')));

const server = http.createServer(app);

const promiseToStart = knex.migrate.latest()
    .then(() => {
        return new Promise((resolve, reject) => {
            server.on('error', err => reject(err));
            server.on('listening', () => {
                console.log('Listening on', server.address());
                resolve(server);
            });
            server.listen(3000);
        })
    });

const stop = () => {
    return new Promise((resolve, reject) => {
        server.close(() => resolve());
    }).then(() => knex.destroy())
};

module.exports = { app, server, stop, promiseToStart }

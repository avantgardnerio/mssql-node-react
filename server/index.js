const express = require('express')
const path = require('path')
const http = require('http')

const knex = require('./db.js')

const app = express()

app.get('/api/people', async (req, res) => {
    const people = await knex.select().table('person')
    res.json(people)
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

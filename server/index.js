const express = require('express')
const app = express()
const path = require('path')

const people = [
    {id: 1, givenName: 'Alan', familyName: 'Turing'},
    {id: 2, givenName: 'Alan', familyName: 'Kay'},
]

app.get('/api/people', (req, res) => {
    res.json(people);
})

app.use(express.static(path.join(__dirname, '../build')));

let server;
const promiseToStart = new Promise(resolve => {
    server = app.listen(3000, () => {
        console.log('Example app listening on port 3000!')
        resolve(true);
    })
}); 

module.exports = { app, server, promiseToStart }

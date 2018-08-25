const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

let server;
const promiseToStart = new Promise(resolve => {
    server = app.listen(3000, () => {
        console.log('Example app listening on port 3000!')
        resolve(true);
    })
}); 

module.exports = { app, server, promiseToStart }

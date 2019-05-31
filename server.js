const express = require('express'); // importing a CommonJS module

const apiRoute = require('./routes/api/index.js');

const server = express();

server.use(express.json());



server.get('/', (req, res) => {
    const nameInsert = (req.name) ? ` ${req.name}` : '';

    res.send(`
    <h2>Lambda Sprint API</h2>
    <p>Welcome${nameInsert} to the Lambda API Sprint!</p>
    `);
});

server.use('/api', apiRoute);

module.exports = server;
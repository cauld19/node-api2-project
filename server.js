const express = require('express');

const blogRouter = require('./blogs/blogs-router.js');


const server = express();

server.use(express.json());

server.use('/api/posts', blogRouter);

server.get('/', (req, res) => {
    res.send(`
      <h2>Christian API</h>
    `);
});

module.exports = server;
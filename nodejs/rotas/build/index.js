"use strict";
const express = require('express');
const rotes = require('./rotes/rotes.js');
const port = process.env.PORT || 3000;
const app = express();
app.use('/', rotes);
app.get('*', (require, response) => {
    response.send('Tzion Brazil');
});
app.listen(port, () => {
    console.log('Server Runing...');
    console.log(`PORT: ${port}`);
});

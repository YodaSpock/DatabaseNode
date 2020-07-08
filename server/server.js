const express = require('express');
const apiRouter = require('./routes');

const app = express();

app.use(express.json());

app.use('/users', apiRouter);

app.listen(process.env.PORT || '3001', () => {

    console.log(`Server is Running on Port: ${process.env.PORT || '3001'}`);

});
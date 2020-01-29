const express = require('express');
const app = express();

const bodyParser = require ('body-parser');
app.use(bodyParser.json());

const endpoints = require('./modules/endpoints');
const db = require('./modules/db-operations');

endpoints(app);

app.listen(8000, () => {
    console.log('Server has been started');
    // db.initDB();
});

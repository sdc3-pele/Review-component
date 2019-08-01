require('dotenv').config()
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./controller.js');
const app = express();
const port = process.env.PORT || 3004;

app.use('/:id', express.static('public'));

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// get request based on review number
app.get('/api/reviews/:id', routes.read)

app.delete('/api/reviews/:revid', routes.delete)

app.post('/api/reviews/create/', routes.create);

app.put('/api/reviews/:revid', routes.update);

app.listen(port, () => console.log('listening on: ', port));

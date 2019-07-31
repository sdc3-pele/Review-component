require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const models = require('./controller.js');
const app = express();
const port = process.env.PORT || 3000;

app.use('/:id', express.static('public'));

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// get request based on review number
app.get('/api/reviews/:id', models.read)

app.delete('/api/reviews/:revid', (req, res) => {
  return models.delete(req.params.revid)
})

app.post('/api/reviews/create/', (req, res) => {
  let revObj = req.body
  return models.create(revObj);
})

app.put('/api/reviews/:revid', (req, res) => {
  let revObj = req.body;
  return models.update(req.params.revid, revObj);
})

app.listen(port, () => console.log('listening on: ', port));

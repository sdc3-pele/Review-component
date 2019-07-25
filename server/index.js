const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const router = require('./routes');
const models = require('../database/models.js');
const app = express();
const port = 3004;

app.use('/:id', express.static('public'));

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// get request based on review number
app.get('/api/reviews/:id', (req, res) => {
  return models.read(req.params.id)
    .then(reviews => res.status(200).send(JSON.stringify(reviews)).end())
    .catch(err => res.status(400).send(err).end())
    });

// app.get('/api/listings/', (req, res) => {
//   // let id = ParseInt(req.params.id);
//   getData((err, reviews) => {
//     if (err) {
//       res.status(404);
//       res.end();
//     } else {
//       res.status(200);
//       res.end(JSON.stringify(reviews));
//     }
//   });
// });

app.listen(port, () => console.log('listening on: ', port));

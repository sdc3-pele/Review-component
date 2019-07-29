var express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = 3004;
// const db = require('../database/cas/db.js');
const models = require('../database/cas/models.js')


app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/:id', express.static('public'));

// get request based on review number
app.get('/api/reviews/:id', (req, res) => {
return models.read(req.params.id)
    .then(reviews => res.status(200).send(JSON.stringify(reviews.rows)).end())
    .catch(err => res.status(400).send(err).end())
});

app.delete('/api/reviews/:revid', (req, res) => {
return models.delete(req.params.revid)
    .then(deletedRev => res.status(200).send(JSON.stringify(deletedRev.rows)).end())
    .catch(err => res.status(400).send(err).end())
})

app.post('/api/reviews/create/', (req, res) => {
let revObj = req.body
console.log(revObj)
return models.create(revObj)
    .then(newRev => res.status(201).send(JSON.stringify(newRev.rows)).end())
    .catch(err => res.status(400).send(err).end())
})

// app.put('/api/reviews/:revid', (req, res) => {
// let revObj = req.body;
// return models.update(req.params.revid, revObj)
//     .then(updatedRev => res.status(202).send(JSON.stringify(updatedRev)).end())
//     .catch(err => res.status(400).send(err).end())
// })

app.listen(port, () => console.log('listening on: ', port));

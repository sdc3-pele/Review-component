const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// const router = require('./routes');
const getData = require('../database/getData.js');
const app = express();
const port = 3004;

// app.use(express.static('public'));
// app set at localhost:3004/listing?id=XXX
app.use('/listings/:id', express.static('public'));

app.use(morgan());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// get request based on room number
app.get('/api/listings/:id/reviews', (req, res) => {
  // let id = ParseInt(req.params.id);
  console.log(req.params.id);
  getData(req.params.id, (err, reviews) => {
    if (err) {
      res.status(404);
      res.end();
    } else {
      res.status(200);
      res.end(JSON.stringify(reviews));
    }
  });
});


app.listen(port, () => console.log('listening on: ', port));

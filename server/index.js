var express = require('express');
var app = express();
var port = 3004;

app.use(express.static('public'));

app.listen(port, () => console.log('listening on: ', port));
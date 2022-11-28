var express = require('express');
var app = express();

const PORT = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
});

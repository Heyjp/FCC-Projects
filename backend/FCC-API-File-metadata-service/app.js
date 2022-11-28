require('dotenv').config();
var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: './uploads/'});
var path = require('path')
var app = express();

// View Engine
var ejs = require('ejs');
app.set('view engine', ejs);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index.ejs')
});

// accept one file where the name of the form field is named
app.post('/upload', upload.single('file'), function(req, res){
    // Take name and file size and return as json Object
    let newObj = {};
    newObj.name = req.file.originalname
    newObj.size = req.file.size
    res.json(newObj);
});

app.listen(process.env.PORT || 3000, function (){
  console.log("connected on port 3000");
});

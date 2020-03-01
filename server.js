// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
let date;
app.get("/api/timestamp/", function(req, res){
  date = new Date();
  res.json({"unix":date.getTime(), "utc":date.toUTCString()})
})
app.get("/api/timestamp/:date_string?", function(req, res){
  // (isNaN(req.params.date_string) ? res.json({"unix":null, "utc":"Invalid Date"}) : date = new Date(req.params.date_string * 1000))
  // res.json({"unix":date.getTime(), "utc":date.toUTCString()})
  let date_string = req.params.date_string;
  //check if the date string is 5 numbers and above
  if(/\d{5,}/.test(date_string)){
    date = new Date(date_string * 1000)
    res.json({"unix":date_string, "utc":date.toUTCString()})
  }
  //if the date is not in UNIX format, then we create a new date object, check if it's valid and return the specified json response
  date = new Date(date_string)
  if(date.toString === "Invalid Date"){
    res.json({"unix":"null","utc":"Invalid Date"})
  }
  res.json({"unix":date.getTime(), "utc":date.toUTCString()})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
const mySecret = process.env['MESSAGE_STYLE']
let express = require('express');
let app = express();
var bodyParser = require("body-parser");

console.log('Hello World');

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/json",function middleware(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.post("/name", function(req, res) {
  var string = req.body.first + " " + req.body.last;;
  res.json({ name: string });
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html" );
});

app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
  response = "Hello json".toUpperCase();
  } else {
  response = "Hello json";
  };
  res.json({"message": response});
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString() 
      //+ new Date().toString();
    next();
  },
  (req, res) => {
    return res.json({time: req.time});
  });

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({echo : word});
});

app.get("/name", (req, res) => {
  var firstName = req.query.first;
  var lastName = req.query.last;
  res.json({name: `${firstName} ${lastName}`});
});

 module.exports = app;

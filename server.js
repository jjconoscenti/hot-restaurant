// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

var maxCapacity = 5;
//Create empty array to store reserved tables
var tables = [];
var waitlist = [];

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Create Basic Routes for serving html files
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/tables', function(request, response) {
    response.sendFile(path.join(__dirname, 'view.html'));
});

app.get('/reserve', function(request, response) {
    response.sendFile(path.join(__dirname, 'reservations.html'));
});

app.get('/api/table', function(request, response) {
    response.json(tables);
});

app.get('/api/waitlist', function(request, response) {
    response.json(waitlist);
});

//Create new table reservations

app.post('/api/waitlist', function(request, response) {
    var newTable = request.body;
    waitlist.push(newTable);
    response.json(waitlist);
});

app.post('/api/table', function(request, response) {
    var newTable = request.body;
    tables.push(newTable);
    response.json(tables);
});


//Listen for PORT and Start Server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

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
    response.sendFile(path.join(__dirname, 'tables.html'));
});

app.get('/reserve', function(request, response) {
    response.sendFile(path.join(__dirname, 'reserve.html'));
});


var maxCapacity = 5;
//Create empty array to store reserved tables
var tables = [];
var waitlist = [];

//Create new table reservations
if (tables.length >= maxCapacity) {
    app.post('/api/waitlist', function(request, response) {
        var newTable = request.body;
        waitlist.push(newTable);
        response.json(waitlist);
    });
} else {
   app.post('/api/table', function(request, response) {
        var newTable = request.body;
        tables.push(newTable);
        response.json(tables);
    }); 
}
    

//Listen for PORT and Start Server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

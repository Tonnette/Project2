// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var session = require("express-session");
var exphbs = require("express-handlebars");
// Requiring passport as we've configured it
var passport = require("./config/passport");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var icecreams = [
    { name: "vanilla", price: 10, awesomeness: 3 },
    { name: "chocolate", price: 4, awesomeness: 8 },
    { name: "banana", price: 1, awesomeness: 1 },
    { name: "green tea", price: 5, awesomeness: 7 },
    { name: "jawbreakers", price: 6, awesomeness: 2 },
    { name: "pistachio", price: 11, awesomeness: 15 }
  ];
  
  // Routes
  app.get("/icecreams/:name", function(req, res) {
    for (var i = 0; i < icecreams.length; i++) {
      if (icecreams[i].name === req.params.name) {
        return res.render("icecream", icecreams[i]);
      }
    }
  });

app.use(express.static("public"));

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/film-api-routes.js")(app);
require("./routes/blog-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
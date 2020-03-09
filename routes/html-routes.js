// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");


// Routes
// =============================================================
module.exports = function(app) {


  app.get("/", function(req, res) {
    res.render("index");
  });
  var scripts = [{ script: "/js/profile.js" }, { script: "/js/members.js" }];
  app.get("/members", function(req, res) {
    res.render("members", { scripts: scripts });
  });

  app.get("/aboutUs", function(req, res) {
    res.render("aboutUs");
  });

  // // homepage
  // app.get("/", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/index.html"));
  // });

  // app.get("/login", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/index.html"));
  // });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
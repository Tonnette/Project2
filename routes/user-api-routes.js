var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  //add new user
  app.post("/api/signup", function(req, res) {
    db.Users.create(req.body).then(function(addUser) {
      res.json(addUser);
    }).then(function() {
      res.redirect(307, "/api/login");
    })
      .catch(function(err) {
        res.status(401).json(err );
      });
  });

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
    console.log(req.user);
  });


  //get all users
  app.get("/api/users", function(req, res) {
    db.Users.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  //get single user
  app.get("/api/signup/:email", function(req, res) {
    db.Users.findOne({
      where: {
        email: req.params.email
      }
    }).then(function(dbAuthor) {
      console.log(dbAuthor);
      res.json(dbAuthor);
    });
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name,
        email: req.user.email,
        id: req.user.id
      });
    }
  });

};
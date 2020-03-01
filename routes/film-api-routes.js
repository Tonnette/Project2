var db = require("../models");

module.exports = function(app) {
  app.get("/api/movie", function(req, res) {
    db.Movie.findAll({include: [db.Blog]}).then(function(dbresult) {
      res.json(dbresult);
    });
  });

  app.get("/api/movie/:id", function(req, res) {
    // Find one Author with the id in req.params.id and return them to the user with res.json
    db.Movie.findOne({
      where: {
        id: req.params.id
      }, include: [db.Blog]
    }).then(function(dbresult) {
      res.json(dbresult);
    });
  });

  app.post("/api/movie", function(req, res) {
    // Create an Author with the data available to us in req.body
    console.log(req.body);
    db.Movie.create(req.body).then(function(dbresult) {
      res.json(dbresult);
    });
  });

};

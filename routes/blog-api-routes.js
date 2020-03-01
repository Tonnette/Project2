var db = require("../models");

module.exports = function(app) {

   // GET route for getting all of the posts
   app.get("/api/blog", function(req, res) {
    var query = {};
    if (req.query.movie_id) {
      query.MovieId = req.query.movie_id;
    }
    db.Blog.findAll({
      where: query
    }).then(function(dbresult) {
      res.json(dbresult);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/blog/:id", function(req, res) {
    db.Blog.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbresult) {
      console.log(dbresult);
      res.json(dbresult);
    });
  });

  // POST route for saving a new post
  app.post("/api/blog", function(req, res) {
    db.Blog.create(req.body).then(function(dbresult) {
      res.json(dbresult);
    });
  });


};
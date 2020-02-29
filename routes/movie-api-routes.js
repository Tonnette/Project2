var db = require("../models");

module.exports = function(app) {
    app.post("/api/new_comment", function(req, res) {
        db.comments.create(req.body).then(function(dbComment) {
            res.json(dbComment);
        });
    });

    app.get("/api/comments", function(req, res) {
        db.Comments.findAll({
            include: [db.User]
        }).then(function(dbComment) {
            res.json(dbComment);
        });
    });






    // Get all blogs
    app.get("/api/all", function(req, res) {
        db.Blog.findAll({}).then(function(results) {
            res.json(results);
        });
    });

    // Add a blog
    app.post("/api/new", function(req, res) {

        console.log("blog Data:");
        console.log("what is req.body " + req.body);

        db.Blog.create({
            name: req.body.name,
            blog: req.body.blog,
            // created_at: req.body.created_at
        }).then(function(results) {
            // `results` here would be the newly created chirp
            res.end();
        });

    });




    // app.get("/api/users/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    //     db.Blog.findOne({
    //         where: {
    //             id: req.params.id
    //         },
    //         include: [db.Post]
    //     }).then(function(dbUsers) {
    //         res.json(dbUsers);
    //     });
    // });

    // app.post("/api/users", function(req, res) {
    //     db.Users.create(req.body).then(function(dbUsers) {
    //         res.json(dbUsers);
    //     });
    // });

    // app.delete("/api/authors/:id", function(req, res) {
    //     db.Author.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function(dbAuthor) {
    //         res.json(dbAuthor);
    //     });
    // });

};
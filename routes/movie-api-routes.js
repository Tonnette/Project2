var db = require("../models");

module.exports = function(app) {
    app.post("/api/blog", function(req, res) {
        db.Blog.create(req.body).then(function(dbComment) {
            res.json(dbComment);
        });
    });

    // Get all
    app.get("/api/user", function(req, res) {
        db.Blog.findAll({}).then(function(results) {
            res.json(results);
        });
    });


    // Get route for retrieving a single post
    app.get("/api/blog/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Author
        db.Blog.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Blog]
        }).then(function(result) {
            res.json(result);
        });
    });

    //add new user
    app.post("/api/user", function(req, res) {
        db.Users.create(req.body).then(function(addUser) {
            res.json(addUser);
        });
    });

    //get all user
    app.get("/api/users", function(req, res) {
        db.Users.findAll({}).then(function(results) {
            res.json(results);
        });
    });

    app.get("/api/user/:name", function(req, res) {
        db.Users.findOne({
            where: {
                name: req.params.name
            }
        }).then(function(dbAuthor) {
            console.log(dbAuthor)
            res.json(dbAuthor);
        });
    });


    // app.get("/api/new/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    //     db.Blog.findOne({
    //         where: {
    //             id: req.params.id
    //         },
    //         include: [db.Blog]
    //     }).then(function(dbUsers) {
    //         res.json(dbUsers);
    //     });
    // });

    // app.post("/api/new", function(req, res) {
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
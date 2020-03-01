var db = require("../models");

module.exports = function(app) {
    //add new user
    app.post("/api/user", function(req, res) {
        db.Users.create(req.body).then(function(addUser) {
            res.json(addUser);
        });
    });

    //get all users
    app.get("/api/users", function(req, res) {
        db.Users.findAll({}).then(function(results) {
            res.json(results);
        });
    });

    //get single user
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

};
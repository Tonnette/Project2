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






};
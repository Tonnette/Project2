// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

    // homepage
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // search result list when user clicked search
    // app.get("/api/blogs", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/index.html"));
    // });

 

    // // user profile page
    // app.get("/profile", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/.html"));
    // });

    // result when user clicked for any movie detail and comment on them
    // app.get("/movie", function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/index.html"));
    // });
};
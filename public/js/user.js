$(document).ready(function() {

    $("#login").on("click", function(event) {
        event.preventDefault();
        var newUser = {
            name: $("#userName").val().trim(),
            password: $("#pass").val().trim(),
        };

        console.log(newUser);
        // Send an AJAX POST-request with jQuery

        $.post("/api/user", newUser)
            // console.log("new blog after post " + newBlog)
            // On success, run the following code
            .then(function() {

            });

        // $("#author").val("");
        // $("#chirp-box").val("");
    });





    //document.ready root, don't go over this
});
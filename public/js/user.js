$(document).ready(function() {

    $("#signUpBtn").on("click", function(event) {
        event.preventDefault();
        var newUser = {
            name: $("#userName").val().trim(),
            password: $("#pass").val().trim(),
        };

        $.post("/api/user", newUser)
            .then(function() {
                $(".userPlace").hide();
                $(".userName").append("<i class=\"fas fa-user\"></i> " + newUser.name);


                $.get("/api/user/" + newUser.name, function(data) {
                    $(".userName").attr("value", data.id);
                });
            });
    });





    //document.ready root, don't go over this
});
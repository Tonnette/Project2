$(document).ready(function() {
    $("#signUpBtn").on("click", function(event) {
        event.preventDefault();
        var newUser = {
            name: $("#userName").val().trim(),
            email: $("#userEmail").val().trim(),
            password: $("#pass").val().trim()
        };

        $.post("/api/user", newUser)
            .then(function() {
                $(".userPlace").hide();
                $(".userName").append("<i class=\"fas fa-user\"></i> " + newUser.name);

                $.get("/api/user/" + newUser.name, function(data) {
                    $(".userName").attr("value", data.id);
                });
            }).catch(function(err) {
                console.log(err);
            });
    });

    $("#loginBtn").on("click", function(event) {
        event.preventDefault();
        var verifyUser = {
            name: $("#loginName").val().trim(),
            password: $("#loginPass").val().trim()
        };

        $.get("/api/users", function(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == verifyUser.name && data[i].password == verifyUser.password) {
                    $(".userPlace").hide();
                    $(".userName").append("<i class=\"fas fa-user\"></i> " + verifyUser.name);
                    $(".userName").attr("value", data[i].id);
                }
            }
            var temp = $(".userName").text();

            if (temp == "") {
                M.toast({ html: 'Login failed! Please login again' });
            }
        }).catch(function(err) {
            console.log(err);
        });
    });



    //document.ready root, don't go over this
});
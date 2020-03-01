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
            });
    });

    $("#loginBtn").on("click", function(event) {
        event.preventDefault();
        var verifyUser = {
            name: $("#loginName").val().trim(),
            password: $("#loginPass").val().trim()
        };

        $.get("/api/users", function(data) {
            console.log(data);
            console.log(verifyUser);
            for (var i; i < data.length; i++) {
                console.log(verifyUser.name + "compare" + data[i].name);
                console.log(verifyUser.password + "compare" + data[i].password);
                if (verifyUser.name === data[i].name && verifyUser.password === data[i].password) {
                    $(".userPlace").hide();
                    $(".userName").append("<i class=\"fas fa-user\"></i> " + verifyUser.name);
                }
            }
            var temp = $(".userName").val();
            console.log("thisis" + temp)
            if (temp == "") {
                M.toast({ html: 'Login failed! Please login again' });
            }
        });
    });





    //document.ready root, don't go over this
});
$(document).ready(function() {




    var verifyUserArr;
    $("#signUpBtn").on("click", function(event) {
        event.preventDefault();
        var newUser = {
            name: $("#userName").val().trim(),
            email: $("#userEmail").val().trim(),
            password: $("#pass").val().trim()
        };

        if (!newUser.email || !newUser.password) {
            return;
        }
        signUpUser(newUser);

    });

    function signUpUser(newUser) {
        $.post("/api/signup", newUser)
            .then(function() {
                $(".userPlace").hide();
                $(".userName").append("<i class=\"fas fa-user\"></i> " + newUser.name);
                window.location.replace("/members");
                
                $.get("/api/signup/" + newUser.email, function(data) {
                    $(".userName").attr("value", data.id);
                });
            }).catch(handleLoginErr);
    };

    function handleLoginErr(err) {
        alert("error");
        // $("#alert").fadeIn(500);
    };

    $("#loginBtn").on("click", function(event) {
        event.preventDefault();
        verifyUser = {
            email: $("#loginEmail").val().trim(),
            password: $("#loginPass").val().trim()
        };
        verifyUserArr = verifyUser.email;
        if (!verifyUser.email || !verifyUser.password) {
            return;
        };
        loginUser(verifyUser)

    });

    function loginUser(verifyUser) {
        $.post("/api/login", verifyUser)
            .then(function(verifyUser) {
                window.location.replace("/members");
            })
            .catch(handleLoginErr);
        };
    
        function handleLoginErr(err) {
            alert("error");
            // $("#alert").fadeIn(500);
        };
    
    


    // /member/:id
    // - handlebars render with id
    // - html + [js]()


    //document.ready root, don't go over this
});
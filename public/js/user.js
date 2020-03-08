$(document).ready(function () {

    var verifyUserArr;
    $("#signUpBtn").on("click", function (event) {
        event.preventDefault();
        var newUser = {
            name: $("#userName").val().trim(),
            email: $("#userEmail").val().trim(),
            password: $("#pass").val().trim()
        };

        if (!newUser.email || !newUser.password) {
            return;
        }


        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (newUser.password.match(passw)) {


        } else {
            M.toast({
                html: "Password must be btw 6 - 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
                classes: 'passwordToast',
                displayLength: 10000,

            })
            return false;
        }
        signUpUser(newUser);

    });

    function signUpUser(newUser) {
        $.post("/api/signup", newUser)
            .then(function () {
                $(".userSign").hide();
                $(".userName").append("<i class=\"fas fa-user\"></i> " + newUser.name);

                M.toast({
                    html: '*****    You are now signed up. Please log in! *****',
                    classes: 'myToast',
                    displayLength: 10000,

                })

                // $("#alert .msg").text("You are now signed up. Please log in!");
                // $("#alert").fadeIn(500);

                $.get("/api/signup/" + newUser.email, function (data) {
                    $(".userName").attr("value", data.id);
                });
            }).catch(userSignErr);
    };

    function userSignErr(err) {

        M.toast({ html: 'You are already a member. Please log in' })
    };

    $("#loginBtn").on("click", function (event) {
        console.log("62 clicked")
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

        console.log("78 clicked")
        $.post("/api/login", verifyUser)
            .then(function (verifyUser) {
                window.location.replace("/members");
            })
            .catch(handleLoginErr);
    };

    function handleLoginErr(err) {
        M.toast({
            html: 'incorrect user name or password',
            classes: 'passwordToast',
            displayLength: 10000,

        })
    };








    // /member/:id
    // - handlebars render with id
    // - html + [js]()


    //document.ready root, don't go over this
});
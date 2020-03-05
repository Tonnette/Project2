$(document).ready(function() {
    $(".userName").on("click", function() {
        var userName = $(".userName").text();
        var userId = $(".userName").value();
        $.get("api/profile").then(getAllBlogs)


    })

    function getAllBlogs() {
        $(".userName").text(userName);
        $(".userName").attr("value", userId);
        $get("/api/user_blogs/" + userId, function(res) {
            for (var i; i < res.length; i++) {
                //append blogs into table
            }
        })
    }



    //document.ready root, don't go over this
});
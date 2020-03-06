$(document).ready(function() {
    var tempBlogId;
    var userId;

    $(".userName").on("click", function() {
        userId = $(".userName").attr('value');
        $(".myform").empty();
        $(".posterContainer").empty();
        getAllBlogs();
    });

    function getAllBlogs() {
        $(".blogBox").empty();
        $(".blogBox").append(`<h4>Manage your reviews!</h4>
        <table class="highlight">
            <thead>
                <tr>
                    <th class="col s5">Comment</th>
                    <th class="col s3">Rating</th>
                    <th class="col s4"></th>
                </tr>
                
            </thead>
            <tbody class="blogEdit"></tbody>
            </table>`)

        console.log(userId);
        $.get("/api/user_blogs/" + userId, function(res) {

            $(".slider").hide();
            $(".searchDiv").hide();
            $(".reviewContainer").hide();
            $(".poster").hide();
            console.log("trying");
            console.log(res);
            if (res.length == 0) {
                $(".blogEdit").append("<h5>No reviews added</h5>");
            }
            for (var i = 0; i < res.length; i++) {
                //append blogs into table
                var newTableEl = $('<tr>');

                newTableEl.attr("value", res[i].id);
                newTableEl.append('<td>' + res[i].blog + '</td>');
                newTableEl.append('<td>' + res[i].rating + " for " + res[i].movie_name + '</td>');
                newTableEl.append(`<td>
                <a class="waves-effect waves-light red btn deleteBlog" value = \"` + res[i].id + `\">
                <i class="fas fa-trash-alt"></i>Delete</a>
                </td>`);
                $(".blogEdit").append(newTableEl);
            }
        }).then(function() {
            $(".deleteBlog").on("click", function() {
                tempBlogId = $(this).attr("value");
                console.log("line 50" + tempBlogId)
                removeBlog();
            });
        })
    }



    function removeBlog() {
        console.log("line59")
        $.ajax({
                method: "DELETE",
                url: "/api/blog/" + tempBlogId
            })
            .then(getAllBlogs);
    }



    //document.ready root, don't go over this
});
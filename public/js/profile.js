$(document).ready(function() {
    var tempBlogId;
    var userId;
    var movieIdArray = [];
    var movieId;

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
                    <th class="col s3">Comment</th>
                    <th class="col s3">Rating</th>
                    <th class="col s3">Delete Blog</th>
                    <th class="col s3 movieMatch">Movie</th>
                    <th class="col s3"></th>
                </tr>
                
            </thead>
            <tbody class="blogEdit"></tbody>
            </table>`)


        $.get("/api/user_blogs/" + userId, function(res) {
            $(".slider").hide();
            $(".searchDiv").hide();
            $(".reviewContainer").hide();
            $(".poster").hide();
            console.log(userId);
            console.log("trying");
            console.log(res);
            if (res.length == 0) {
                $(".blogEdit").append("<h5>No reviews added</h5>");
            }
            for (var i = 0; i < res.length; i++) {
                //append blogs into table
                var newTableEl = $('<tr>');
                newTableEl.addClass("movieTable");

                userId = res[i].id;
                // console.log({res})
                movieId = res[i].MovieId
                    // console.log({movieId})
                movieIdArray.push(movieId);
                newTableEl.attr("value", res[i].id);
                newTableEl.append('<td>' + res[i].blog + '</td>');
                newTableEl.append('<td>' + res[i].rating);
                newTableEl.append(`<td>
                <a class="waves-effect waves-light red btn deleteBlog" value = \"` + res[i].id + `\">
                <i class="fas fa-trash-alt"></i>Delete</a>
                </td>`);
                newTableEl.append('<td class="blogMId emp' + [i] + '" value="' + res[i].MovieId + '"></td>');
                $(".blogEdit").append(newTableEl);
            };
        }).then(function() {
            $.get("/api/movie/", function(res) {
                var box = $('.blogMId');
                // console.log(box[0].attr('value'))
                for (var i = 0; i < box.length; i++) {
                    var classTemp = ".emp" + [i];
                    var tempBlog = $('.blogMId').closest(classTemp);
                    console.log(tempBlog);
                    for (var j = 0; j < res.length; j++)
                        if (tempBlog.attr("value") == res[j].id) {
                            tempBlog.text(res[j].movie_name);
                            tempBlog.removeClass('blogMId');
                        }
                }

            });

        }).then(function() {
            $(".deleteBlog").on("click", function() {
                tempBlogId = $(this).attr("value");
                console.log("line 50" + tempBlogId)
                $(this).parent().parent().remove();
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
    }




    //document.ready root, don't go over this
});
$(document).ready(function () {
    var tempBlogId;
    var userId;
    var movieIdArray = [];
    var movieId;

    $(".userName").on("click", function () {
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





        $.get("/api/user_blogs/" + userId, function (res) {

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
                </td>`
                );

                $(".blogEdit").append(newTableEl);
            }


        }).then(function () {
            $.get("/api/movie/", function (res) {
                for (var i = 0; i < res.length; i++) {


                    // console.log(movieIdArray);
                    var numberId = Number(res[i].id)
                    // console.log({numberId});

                    var lucky = movieIdArray.filter(function (number) {
                        // console.log (number)
                        if (number == res[i].id) {
                            // console.log("yay")

                            var newTableEl = $('<td>');
                            newTableEl.attr("value", res[i].id);

                            // $(".movieMatch").find(".blogEdit").text(res[i].movie_name);
                            newTableEl.append('<br><td>' + res[i].movie_name);

                            $(".movieTable").append(newTableEl);

                        }
                        // console.log("yay")

                    })
                }

            })

        }).then(function () {
            $(".deleteBlog").on("click", function () {
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
$(document).ready(function() {
    $(".myform").hide();
    $(".myText").hide();
    $(".dbButton").hide();

    var userMoviesArray = [];
    var starValue;
    var commentInput = $("#textarea1")

    $(".submit").on("click", commentSubmit);
    $("label").on("click", function() {
        starValue = this.id;
    });


    function commentSubmit(event) {
        event.preventDefault();
        if (!commentInput.val().trim().trim()) {
            return;
        }
        newComment({
            comment: commentInput.val(),
            rating: starValue
        });
    };

    // $(".blogContainer").hide();


    $("#add-movie").on("click", function(event) {
        event.preventDefault();
        $(".posterContainer").hide();

        $(".myText").show();
        $(".dbButton").show();
        $(".blogContainer").show();


        chosenMovie = $("#movie-input").val().trim();
        chosenMovie = chosenMovie.replace(/\s/g, "_");
        displayChosenMovie();
    });

    $(".dbButton").on("click", function(event) {
        event.preventDefault();
        var newBlog = {
            name: $("#name").val().trim(),
            blog: $(".blog-box").val().trim(),

        };

        console.log(newBlog);
        // Send an AJAX POST-request with jQuery

        $.post("/api/blog", newBlog)
            // console.log("new blog after post " + newBlog)
            // On success, run the following code
            .then(function() {
                var row = $("<div>");
                row.addClass("blog");
                row.append("<p>" + newBlog.name + " reviewed: </p>");
                row.append("<p>" + newBlog.blog + "</p>");
                // row.append("<p>At " + moment(newBlog.created_at).format("h:mma on dddd") + "</p>");
                $("#blog-box").prepend(row);

            });

        // $("#author").val("");
        // $("#chirp-box").val("");

    });

    // When the page loads, grab all of our chirps
    $.get("/api/all", function(data) {

        if (data.length !== 0) {

            for (var i = 0; i < data.length; i++) {

                var row = $("<div>");
                row.addClass("blog");

                row.append("<p>" + data[i].name + " reviewed. </p>");
                row.append("<p>" + data[i].blog + "</p>");


                $("#blog-area").prepend(row);

            }

        }

    });



    function displayPosters() {
        var queryURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=6dab14e95b96319c6b9d19d21edcbaaa";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            for (var i = 9; i > 0; i--) {
                let cardID = "card-" + (i - 1);
                var randomImage = response.results[i].poster_path
                var randomURL = "https://image.tmdb.org/t/p/w200" + randomImage;

                $("#" + cardID).find("img").attr("src", randomURL);
                $("#" + cardID).find(".card-title").text(response.results[i].title);
                $("#" + cardID).find(".card-action").attr("href", randomURL);
            };
        });
    };


    function newComment(newCommentData) {
        $.post("/api/new_comment", newCommentData)
            .then(getComments);
    };

    $(".card-image").click(function(event) {
        event.stopPropagation();
        $(".dbButton").show();
        chosenMovie = $(this).find(".card-title").text();
        console.log(chosenMovie)
        displayChosenMovie();

    });

    displayPosters();


    //document.ready root, don't go over this
});
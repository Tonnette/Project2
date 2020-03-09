$(document).ready(function() {
    $(".myform").hide();
    $(".myText").hide();
    $(".dbButton").hide();
    $(".signText").hide();

    var blogContainer = $(".reviewContainer");
    var starValue;
    var chosenMovie;
    var movieId;


    $("label").on("click", function() {
        starValue = parseInt(this.id);
        console.log(starValue);
    });


    function displayPosters() {
        var queryURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=6dab14e95b96319c6b9d19d21edcbaaa";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            for (var i = 9; i > 0; i--) {
                var cardID = "card-" + (i - 1);
                var randomImage = response.results[i].poster_path
                var randomURL = "https://image.tmdb.org/t/p/w200" + randomImage;
                $("#" + cardID).find("img").attr("src", randomURL);
                $("#" + cardID).find(".movieInfo").text(response.results[i].title);
                $("#" + cardID).find(".card-content").text(response.results[i].title);
                $("#" + cardID).find(".card-action").attr("href", randomURL);
            }
        })
    }

    $(".card-image").click(function(event) {
        event.stopPropagation();
        $(".dbButton").show();
        $(".blogContainer").show();
        $(".reviewContainer").show();
        chosenMovie = $(this).find(".nameText").text();
        console.log(chosenMovie)
        displayChosenMovie(getAllBlogs);

    })


    $("#add-movie").on("click", function(event) {
        event.preventDefault();
        $(".posterContainer").hide();
        $(".myText").show();
        $(".dbButton").show();
        $(".blogContainer").show();
        $(".reviewContainer").show();
        $("#blog-area").empty();
        $("#signInMessage").empty();
        $("#signInMessageMember").empty();
        $("#synopsis-area").val('');
        $(".blurb").empty();




        chosenMovie = $("#movie-input").val().trim().toLowerCase();
        console.log(chosenMovie);

        if (chosenMovie == "") {
            M.toast({
                html: "<div class='message'>Movie not found!</div>",
                classes: 'orangeToast',
                displayLength: 3500,

            })
        } else {
            displayChosenMovie(getSearchedBlogs);
        }



    });


    $(".dbButton").on("click", function(event) {
        event.preventDefault();

        $.get("/api/movie").then(function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].movie_name == chosenMovie) {
                    movieId = data[i].id;
                }
            }
            console.log(movieId);
        }).then(function() {
            // console.log("whats movie id now? " + movieIdDatabase)
            var userId = $(".userName").attr("value");
            var userName = $('.userName[class="modal-trigger userName uMain"]').text();
            console.log(userId);
            console.log(movieId);
            var newBlog = {
                name: userName,
                blog: $(".blog-box").val().trim(),
                rating: starValue,
                MovieId: movieId,
                UserId: userId
            };

            console.log("whats my name? " + userName)
            var appendName = userName;
            var appendBlog = newBlog.blog;
            var appendRating = newBlog.rating;

            var newRow = $("<div>");
            newRow.addClass("blogger");
            newRow.append("<p>" + "<b>" + appendName + " reviewed " + chosenMovie + "<b>" + "</p>");
            newRow.append("<p>" + appendBlog + "</p>");
            newRow.append("<p>" + appendRating + " star rating! </p>");
            $("#blog-area").prepend(newRow);
            // console.log("what is newBlog ?" + JSON.stringify(newBlog));

            $.post("/api/blog", newBlog)
                .then(function() {
                    $(".blog-box").val("");
                }).catch(function(err) {
                    console.log(err);
                });

        }).catch(function(err) {
            console.log(err);
        });

    })



    function getSearchedBlogs() {
        $(".signText").show();

        var newMovieId;
        $.get("/api/movie").then(function(res) {
            console.log(res);
            console.log(chosenMovie);
            for (var i = 0; i < res.length; i++) {
                var compareName = res[i].movie_name;

                if (compareName == chosenMovie) {
                    console.log("there is a match")
                    newMovieId = res[i].id;
                }
            }
            console.log(newMovieId)
        }).then(function() {
            // When the page loads, grab all of our blogs
            $.get("/api/movie/" + newMovieId, function(data) {

                whatLength = data.Blogs.length;
                console.log(whatLength)
                if (whatLength == 0) {
                    $(".latestText").hide();
                    $("#signInMessage").prepend("<b> No reviews yet. Please <a href='#signup' class='modal-trigger userSign'> Sign up</a> or  <a href='#login' class='modal-trigger userPlace'> Login</a> to be the first to review this film </b>");
                    $("#signInMessageMember").prepend("<b> No reviews yet. </b>");
                } else {
                    for (var i = 0; i < data.Blogs.length; i++) {
                        console.log(data.Blogs.length)

                        var row = $("<div>");
                        row.addClass("blog");


                        row.append("<p>" + "<b>" + data.Blogs[i].name + "'s review of " + chosenMovie + "</b>" + "</p>");
                        row.append("<p>" + data.Blogs[i].rating + " star rating! </p>");
                        row.append("<p>" + data.Blogs[i].name + " reviewed " + chosenMovie + "</p>");

                        $("#blog-area").prepend(row);

                        movieId = newMovieId;
                    }
                }
            }).catch(function(err) {
                console.log(err);
            });
        }).catch(function(err) {
            console.log(err);
        });
    }


    function getAllBlogs() {
        $(".signText").show();
        $.get("/api/movie").then(function(data) {
            for (var i = 0; i < data.length; i++) {
                if (chosenMovie == data[i].movie_name) {
                    movieId = data[i].id;
                    console.log(movieId)
                    return movieId
                }
            }
        }).then(function(movieId) {
            // When the page loads, grab all of our blogs
            $.get("/api/movie/" + movieId, function(data) {
                // if (data.length !== 0) {
                console.log({ data })
                whatLength = data.Blogs.length;
                console.log(whatLength)

                if (whatLength == 0) {

                    $(".latestText").hide();
                    $("#signInMessage").prepend("<b> No reviews yet. Please <a href='#signup' class='modal-trigger userSign'> Sign up</a> or  <a href='#login' class='modal-trigger userPlace'> Login</a> to be the first to review this film </b>");
                    
                    $("#signInMessageMember").prepend("<b> No reviews yet. </b>");
                } else {
                    for (var i = 0; i < data.Blogs.length; i++) {
                        var row1 = $("<div>");

                        $(".upperText").prepend(row1);
                        var row = $("<div>");
                        row.addClass("blog");
                        row.append("<p>" + "<b>" + data.Blogs[i].name + "'s review of " + chosenMovie + "</b>" + "</p>");
                        row.append("<p>" + "<i>" + data.Blogs[i].blog + "</i>" + "</p>");
                        row.append("<p>" + data.Blogs[i].rating + " star rating! </p>");

                        $("#blog-area").prepend(row);
                    }
                }

            })
        }).catch(function(err) {
            console.log(err);
        });
    }




    function displayChosenMovie(thenFunction) {
        $(".posterContainer").hide();
        $(".myText").show();
        $("#movie-poster").empty();
        $("#movie-input").val('');
        $("#synopsis-area").val('');
        $(".blurb").val('');



        console.log("what's chosen movie" + chosenMovie)
        var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=6dab14e95b96319c6b9d19d21edcbaaa&query=" + chosenMovie;

        $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {

                var posterDiv = $("<div class='movie'>");
                // Retrieving the URL for the image
                var choseMovieImage = response.results[0].poster_path;
                var chosenMovieName = response.results[0].title;
                chosenMovie = response.results[0].title;


                console.log("what's chosen movie? " + chosenMovieName)
                var imgURL = "https://image.tmdb.org/t/p/w200" + choseMovieImage;
                // Creating an element to hold the image
                var image = $("<img>").attr("src", imgURL);
                // Appending the image
                posterDiv.append(image);
                $("#movie-poster").prepend(posterDiv);

                var row = $("<div>");
                row.addClass("blurb");
                row.append("<p><b><h5>" + response.results[0].original_title + "</h5></b></p>");
                row.append("<p>" + "<b>" + " Synopsis: " + "</b>" + response.results[0].overview + "</p>");
                var releaseYear = response.results[0].release_date
                var newRel = String(releaseYear.slice(0, -6))
                console.log(releaseYear);
                console.log(newRel);
                row.append("<p>" + "<i>" + "Release year: " + newRel + "</i>" + "</p>");

                $("#synopsis-area").prepend(row);

                var chosenMovieJSON = {
                    movie_name: chosenMovieName
                };

                $.post("/api/movie", chosenMovieJSON)
                    // console.log("new blog after post " + newBlog)
                    // On success, run the following code
                    .then(function() {
                        var row = $("<div>");
                        row.addClass("blog");
                        row.append("<p>" + chosenMovieJSON.movie_name + " reviewed: </p>");
                        // row.append("<p>At " + moment(newBlog.created_at).format("h:mma on dddd") + "</p>");
                        $("#blog-box").prepend(row);
                    }).catch(function(err) {
                        console.log(err);
                    });
            }).then(thenFunction)
            .fail(function() {
                $(".latestText").hide();
                M.toast({
                    html: "<div class='message'>Sorry, can't find that movie. Try another one!</div>",
                    classes: 'orangeToast',
                    displayLength: 3500,

                });
            });
    }




    displayPosters();

    //Login module
    $('.modal').modal();
    //Login module end


    //document.ready root, don't go over this

})
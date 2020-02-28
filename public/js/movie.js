$(document).ready(function () {
    $(".myform").hide();
    $(".myText").hide();
   

    $("#add-movie").on("click", function (event) {
        event.preventDefault();
        $(".posterContainer").hide();

        $(".myText").show();
        // displayChosenPosters()

        chosenMovie = $("#movie-input").val().trim();
        chosenMovie = chosenMovie.replace(/\s/g, "_");
        displayChosenMovie();
    })

    function displayPosters() {
        var queryURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=6dab14e95b96319c6b9d19d21edcbaaa";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 9; i > 0; i--) {
                let cardID = "card-" + (i - 1);
                var randomImage = response.results[i].poster_path
                var randomURL = "https://image.tmdb.org/t/p/w200" + randomImage;

                $("#" + cardID).find("img").attr("src", randomURL);
                $("#" + cardID).find(".card-title").text(response.results[i].title);
                $("#" + cardID).find(".card-action").attr("href", randomURL);
            }
        })

    }

    function displayChosenMovie() {
            $(".posterContainer").hide();
            $(".myText").show();
           
            console.log("what's chosen movie" + chosenMovie)
            var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=6dab14e95b96319c6b9d19d21edcbaaa&query=" + chosenMovie;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                var posterDiv = $("<div class='movie'>");

                // Retrieving the URL for the image

                var randomImage = response.results[0].poster_path

                var imgURL = "https://image.tmdb.org/t/p/w200" + randomImage;

                // Creating an element to hold the image
                var image = $("<img>").attr("src", imgURL);

                // Appending the image
                posterDiv.append(image);
                $("#movie-poster").prepend(posterDiv);

            })

   
    }

    $(".card-image").click(function (event) {
        event.stopPropagation();
        chosenMovie = $(this).find(".card-title").text();
        console.log(chosenMovie)
        displayChosenMovie();

    })

    displayPosters();

})
  


















$(document).ready(function () {

    var userMoviesArray = [];

    

    function displayPosters(){
        var queryURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=6dab14e95b96319c6b9d19d21edcbaaa";
        

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var posterDiv = $("<div class='movie'>");

             // Retrieving the URL for the image
             for (var i = 0; i < 12; i++){
                var randomImage = response.results[i].poster_path

                var imgURL = "https://image.tmdb.org/t/p/w200" + randomImage;
   
                // Creating an element to hold the image
                var image = $("<img>").attr("src", imgURL);
   
                // Appending the image
                posterDiv.append(image);
                $("#poster-view").prepend(posterDiv);


             }
          

        })



    }

displayPosters();

    function displayMovieInfo() {

        // This function handles events where a movie button is clicked
        $("#add-movie").on("click", function (event) {
            event.preventDefault();
            // This line grabs the input from the textbox
            var userMovie = $("#movie-input").val().trim();

                // Adding movie from the textbox to our array
                userMoviesArray.push(userMovie);

                

            // Calling renderButtons which handles the processing of our movie array
            var movie = $("#movie-input").val().trim();
            var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

            // Creating an AJAX call for the specific movie button being clicked
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                var blogDiv = $("<textarea class='blog'>");

                // Creating a div to hold the movie with class "movie"
                var movieDiv = $("<div class='movie'>");

                // Storing the rating data
                var rating = response.Rated;

                // Creating an element to have the rating displayed
                var pOne = $("<p>").text("Rating: " + rating);

                // Displaying the rating
                movieDiv.append(pOne);

                 // Storing the title
                 var title = response.Title;

                 // Creating an element to hold the release year
                 var blog = $("<p>").text("title: " + title);
 
                 // Displaying the title
                 blogDiv.append(blog);

                // Storing the release year
                var released = response.Released;

                // Creating an element to hold the release year
                var pTwo = $("<p>").text("Released: " + released);

                // Displaying the release year
                movieDiv.append(pTwo);

                // Storing the plot
                var plot = response.Plot;

                // Creating an element to hold the plot
                var pThree = $("<p>").text("Plot: " + plot);

                // Appending the plot
                movieDiv.append(pThree);

                // Retrieving the URL for the image
                var imgURL = response.Poster;

                // Creating an element to hold the image
                var image = $("<img>").attr("src", imgURL);

                // Appending the image
                movieDiv.append(image);

                // Putting the entire movie above the previous movies
                $("#movies-view").prepend(movieDiv);
                $("#blog-view").prepend(blogDiv);
            });

        });


        // Adding a click event listener to all elements with a class of "movie-btn"


    }
    displayMovieInfo()
})

















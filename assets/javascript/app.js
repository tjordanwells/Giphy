var topics = ["True Detective", "Twin Peaks", "No Country For Old Men", "There Will Be Blood"];

function displayGifSearch() {

    var apiKey = "&api_key=JNVSpiNfpdWuvNggqkr0qeNnZwAPWYpA";

    var gifSearch = $(this).attr("data-gif");

    var queryUrl = "https://api.giphy.com/v1/gifs/search?&q=" + gifSearch + apiKey + "&limit=10";


    console.log(gifSearch);

    $.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(response) {

    console.log(response);

    var results = response.data

    for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div>");
        var gifInfo = $("<p>");
        gifInfo.text("Title: " + results[i].title + " || Rating: " + results[i].rating);
        

        var gifImage = $("<img>");
        gifImage.addClass("img-fluid");

        gifImage.attr("src", results[i].images.original_still.url);
        gifImage.attr("data-still", results[i].images.original_still.url);
        gifImage.attr("data-animate", results[i].images.original.url);
        gifImage.attr("data-state", "still");


        gifDiv.append(gifInfo);
        gifDiv.append(gifImage);

        $("#gif-view").prepend(gifDiv);

    }

});

}

function renderButtons() {

    $("#button-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("gif-button");
        button.addClass("btn");
        button.addClass("btn-outline-dark");
        button.addClass("m-1");
        button.attr("data-gif", topics[i]);
        button.text(topics[i]);

        $("#button-view").append(button);

    }
}

$("#add-gif").on("click", function(event) {

    event.preventDefault();

    var gif = $("#gif-input").val().trim();

    $("#gif-input").val("");

    topics.push(gif);

    renderButtons();

});


$(document).on("click", ".gif-button", displayGifSearch);

$(document).on("click", ".img-fluid", function() {
            
    var state = $(this).attr("data-state");

    if (state === "still") {
         $(this).attr("src", $(this).attr("data-animate"));
         $(this).attr("data-state", "animate");
        } else {
        $(this).attr("src", $(this).attr("data-still"));
         $(this).attr("data-state", "still");
         }        
 })

renderButtons();



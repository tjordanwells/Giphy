var apiKey = "JNVSpiNfpdWuvNggqkr0qeNnZwAPWYpA";

var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=" + apiKey + "&limit=10";

var gifSearch = $(this).attr("data-name");

var buttons = [];

$("#add-gif").on("click", function (event) {

    event.preventDefault();

    var gif = $("#gif-input").val().trim();

    buttons.push(gif);

    renderButtons();

})

function renderButtons() {
    $("#button-view").empty();

    for (var i = 0; i < buttons.length; i++) {
        var button = $("<button></button>");
        button.addClass("btn, btn-dark, gif-button");
        button.attr("data-name", buttons[i]);
        button.text(buttons[i]);

        $("#button-view").append(button);

    }
}


$(document).on("click", ".gif-button", displayGifSearch, function() {
    console.log(gifSearch);

});

function displayGifSearch() {
    $.ajax({
    url: queryUrl,
    method: "GET"
})

.then(function (response) {

    console.log(response);

    var results = response.data

    for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div>");
        var gifInfo = $("<p>");
        gifInfo.text("Rating: " + results[i].rating);

        var gifImage = $("<img>");
        gifImage.addClass("img-fluid");

        gifImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.append(gifInfo);
        gifDiv.append(gifImage);

        $("#gif-view").prepend(gifDiv);
    }

})

}

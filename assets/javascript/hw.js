$(document).ready(function (event) {

    var loadedGifs = ["seinfeld", "the office", "funny", "fail", "cats"];

    function search() {

        var limits = 10;
        var key = "p7clLYOVgVD3hlsIC4BP5leqCONLE0Ot";
        var search = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + key + "&limit=" + limits;

        $(".gifResults").empty();

        // In browser, the sources tab says $.ajax is not a function...???????????????
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (var i = 0; i < limits; i++) {

                var holder = $("<div>");
                holder.addClass("holders");
                var imgStill = $("<img>").attr({
                    "src": response.data[i].images.fixed_height_still.url,
                    "data-still": response.data[i].images.fixed_height_still.url,
                    "data-animate": response.data[i].images.fixed_height.url,
                    "data-state": "still",
                    "class": "pics"

                });

                var rated = $("<p>").text("Rated: " + response.data[i].rating);

                $(holder).append(imgStill);
                $(holder).append(rated);
                $(".gifResults").append(holder);

                loop();

            };

        });
    };

    function loop() {

        $(".group").empty();

        for (let i = 0; i < loadedGifs.length; i++) {

            var buttons = $("<button class='btn btn-outline-light'>");
            buttons.text(loadedGifs[i]);
            buttons.addClass("tabs");
            buttons.attr("data-name", loadedGifs[i]);
            $(".group").append(buttons);

        };
    };

    $("#add-loadedGifs").on("click", function (event) {

        event.preventDefault();
        var userSearch = $("#loadedGifs-input").val().trim();
        loadedGifs.push(userSearch);

        loop();
    });

    function play() {

        var state = $(this).attr("data-state");
        var dataAnimate = $(this).attr("data-animate");
        var dataStill = $(this).attr("data-still");

        if (state === "still") {

            $(this).attr("src", dataAnimate);
            $(this).attr("data-state", "animate");

        } else {

            $(this).attr("src", dataStill);
            $(this).attr("data-state", "still");

        }
    };

    $(document).on("click", ".tabs", search);

    $(document).on("click", ".pics", play);

    loop();


});
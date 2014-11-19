/*
	On Ready
*/
$(document).ready(function(){

                  $("#description").addClass("hidden");
                  
                  
                  $( document ).on("vmousedown", "html", showDescription)
                  .on("vmouseup","html",hideDescription);
});

function showDescription(event) {
    $("#text").addClass("blurry");
    $("#description").removeClass("hidden");
}

function hideDescription(event) {
    $("#text").removeClass("blurry");
    $("#description").addClass("hidden");
}


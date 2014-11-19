/*
	On Ready
*/
$(document).ready(function(){

                  $("#description").addClass("hidden");
                  
                  
                  $( "html" )
                  .mousedown(showDescription)
                  .mouseup(hideDescription);
});

function showDescription(event) {
    $("#text").addClass("blurry");
    $("#description").removeClass("hidden");
}

function hideDescription(event) {
    $("#text").removeClass("blurry");
    $("#description").addClass("hidden");
}


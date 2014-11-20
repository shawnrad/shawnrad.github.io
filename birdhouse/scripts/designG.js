/*
	On Ready
*/
BUTTONS = true;
NUMBERS = ["0","1","2","3","4","5"]
SPANISH = ["Cero","Uno","Dos","Tres","Quatro","Cinco"]
$(document).ready(function(){

	$(".description").addClass("hidden");
	$("#grading").hide()

	$( document ).on("vmousedown", "html", showDescription)
		.on("vmouseup","html",hideDescription);

	$(document).on("swipeleft",function() {

        // $("#grading").fadeOut(500);
        
        $(".current").animate({
            left: '-50%'
        }, 500, function() {
            $(this).css('left', '150%');
            $(this).appendTo('#container');
        });

        next = $(".current").next(".card")
        $(".current").removeClass("current");

        next.addClass("current").animate({
            left: '50%'
        }, 500);


        // $("#grading").hide();
    });

    $(document).on("swiperight",function() {
        // $("#grading").fadeOut(500);

        $(".current").animate({
            left: '150%'
        }, 500, function() {
            $(this).css('left', '150%');
            $(this).appendTo('#container');

        });

		next = $(".current").next(".card")
        $(".current").removeClass("current");

        next.addClass("current")
        .css('left',"-50%")
        .animate({
            left: '50%'
        }, 500);
        // $("#grading").hide();
    });
    
});

function showDescription(event) {
    $(".text").addClass("blurry");
    $(".description").removeClass("hidden");



    if(BUTTONS){
    	$("#grading").fadeIn(100);
    }

}

function hideDescription(event) {
    $(".text").removeClass("blurry");
    $(".description").addClass("hidden");


	// $(document).off("swipeleft");
 //    $(document).off("swiperight");

	if(BUTTONS){
    	$("#grading").fadeOut(50);
    }    
}
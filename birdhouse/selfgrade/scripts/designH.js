/*
	On Ready
*/
BUTTONS = false;
NUMBERS = ["0","1","2","3","4","5"]
SPANISH = ["Cero","Uno","Dos","Tres","Quatro","Cinco"]
VAL = 2
rotateMe = true;
$(document).ready(function(){

	// //Set initial value
	// //Portrait
	// if (window.orientation % 180) == 0{
	// 	value = 0
	// }
	// //Landscapre
	// else{
	// 	value = 1
	// }

	$(".back").hide();
	$(".front").show();

	$("#grading").hide();
	
	$("#rotateMe_text").text("Rotate to see definition");

	$(window).bind('orientationchange', function() {
		if(window.orientation%180 == 0){
			$(".back").hide();
			$(".front").show();

			$("#rotateMe").hide();

			allowGrading();
			$("#grading").show();
		}
		else{
			$(".back").show();
			$(".front").hide();

			disallowGrading();
			if (rotateMe){
				$("#rotateMe_text").text("Rotate back for next card").
				rotateMe = false;
			}
		}
	});

});

function allowGrading(){
    $("#grading").show();


    $('.cards').on("swipeleft",function() {

        // $("#grading").fadeOut(500);

        $(this).animate({
            left: '-50%'
        }, 500, function() {
            $(this).css('left', '150%');
            $(this).appendTo('#container');
        });

		$(".back").hide();
		$(".front").show();

        $(this).next().animate({
            left: '30%'
        }, 500);

        disallowGrading();
    });

    $('.cards').on("swiperight",function() {

        // $("#grading").fadeOut(500);

        $(this).animate({
            left: '150%'
        }, 500, function() {
            $(this).css('left', '150%');
            $(this).appendTo('#container');
        });

		$(".back").hide();
		$(".front").show();

        $(this).next().css('left',"-50%")
            .animate({
            left: '30%'
        }, 500);

        disallowGrading();
    });
}

function disallowGrading(){
    $("#grading").hide();

    $('.cards').off("swipeleft")
    $('.cards').off("swiperight")
}
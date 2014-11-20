/*
	On Ready
*/
BUTTONS = false;
NUMBERS = ["0","1","2","3","4","5"]
SPANISH = ["Cero","Uno","Dos","Tres","Quatro","Cinco"]
VAL = 2
rotateMe = false;
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
	$("#card_text").text(NUMBERS[VAL]);

	$("#grading").hide();
	$("#rotateMe_text").text("Rotate to see definition").

	$(window).bind('orientationchange', function() {
		if(window.orientation%180 == 0){
			$("#card_text").text( NUMBERS[VAL]);
			$("#rotateMe").hide();
			$("#grading").show();
		}
		else{
			$("#card_text").text( SPANISH[VAL]);
			if (rotateMe){
				$("#rotateMe_text").text("Rotate back for next card").
				rotateMe = false;
			}
		}
	});

    $(document).on("vclick","#correct",markIncorrect);
    $(document).on("vclick","#incorrect",markCorrect);
});

function markIncorrect(event) {
    nextCard()
}

function markCorrect(event) {
    nextCard()
}

function nextCard(){
    $("#grading").hide();

    //Slight delay to hide answer
    VAL = Math.floor(Math.random()*5);
    $("#card_text").text(NUMBERS[VAL]);
}
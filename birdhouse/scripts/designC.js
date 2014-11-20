/*
	On Ready
*/
BUTTONS = true;
NUMBERS = ["0","1","2","3","4","5"]
SPANISH = ["Cero","Uno","Dos","Tres","Quatro","Cinco"]
$(document).ready(function(){

	$("#description").addClass("hidden");
	$("#grading").hide()

	$( document ).on("vmousedown", "html", showDescription)
		.on("vmouseup","html",hideDescription);

	$(document).on("vmouseup","#correct",markIncorrect);
	$(document).on("vmouseup","#incorrect",markCorrect);

});

function showDescription(event) {
    $("#text").addClass("blurry");
    $("#description").removeClass("hidden");

    if(BUTTONS){
    	$("#grading").fadeIn(100);
    }

}

function hideDescription(event) {
    $("#text").removeClass("blurry");
    $("#description").addClass("hidden");

	if(BUTTONS){
    	$("#grading").fadeOut(50);
    }    
}

function markIncorrect(event) {
	nextCard()
}

function markCorrect(event) {
	nextCard()
}

function nextCard(){
	val = Math.floor(Math.random()*5)
	$("#text").text(NUMBERS[val]);
 	$("#description").text(SPANISH[val]);
}
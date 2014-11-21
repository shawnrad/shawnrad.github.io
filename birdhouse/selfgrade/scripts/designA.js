/*
	On Ready
*/
BUTTONS = true;
NUMBERS = ["0","1","2","3","4","5"]
SPANISH = ["Cero","Uno","Dos","Tres","Quatro","Cinco"]
$(document).ready(function(){
    $("#grading").hide();

    $('.flip').click(function(){
    	var card = $(this).find('.card')
        if(card.hasClass("flipped")){
        	card.removeClass("flipped");
        }
        else{
        	card.addClass("flipped");
        }

        if(BUTTONS){
            $("#grading").fadeIn(1000)
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
    $('.card').removeClass("flipped");
    $("#grading").hide();

    //Slight delay to hide answer
    setTimeout(function(){
        val = Math.floor(Math.random()*5);
        $(".front").text(NUMBERS[val]);
        $(".back").text(SPANISH[val]);
    },
    200)
    
}
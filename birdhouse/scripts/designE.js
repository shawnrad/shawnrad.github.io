/*
	On Ready
*/
BUTTONS = true;
$(document).ready(function(){
    // $("#grading").hide()

    $('.flip').click(function(){
    	var card = $(this).find('.card')
        if(card.hasClass("flipped")){
        	card.removeClass("flipped");
        }
        else{
        	card.addClass("flipped");
        }

        // if(BUTTONS){
        //     $("#grading").fadeIn(1000)
        // }
    });

    $('.flip').on("swipeleft",function() {

        // $("#grading").fadeOut(500);

        $(this).animate({
            left: '-50%'
        }, 500, function() {
            $(this).css('left', '150%');
            $(this).appendTo('#container');
        });

        $('.card').removeClass("flipped");

        $(this).next().animate({
            left: '50%'
        }, 500);

        // $("#grading").hide();
    });

    $('.flip').on("swiperight",function() {

        // $("#grading").fadeOut(500);

        $(this).animate({
            left: '150%'
        }, 500, function() {
            $(this).css('left', '150%');
            $(this).appendTo('#container');

        });

        $('.card').removeClass("flipped");

        $(this).next().css('left',"-50%")
            .animate({
            left: '50%'
        }, 500);

        // $("#grading").hide();
    });

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
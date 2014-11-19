/*
	On Ready
*/
$(document).ready(function(){
    $('.flip').click(function(){
    	var card = $(this).find('.card')
        if(card.hasClass("flipped")){
        	card.removeClass("flipped");
        }
        else{
        	card.addClass("flipped");
        }
    });
});

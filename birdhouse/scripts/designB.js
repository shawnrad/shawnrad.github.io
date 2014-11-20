/*
	On Ready
*/
BUTTONS = true;
NUMBERS = ["0","1","2","3","4","5"]
SPANISH = ["Cero","Uno","Dos","Tres","Quatro","Cinco"]
$(document).ready(function(){
	
	$("#grading").hide()

	$("#description").draggable({
		axis:"y",
		scroll:"false",
		cursor:"move",
		revert:true,
		icons:{primary:"ui-icon-locked"}
	});

	$("#target").droppable({
		accept: "#description",
		hoverClass: 'hovered',
		drop:handleCardDrop
	});

    $(document).on("vclick","#correct",markIncorrect);
    $(document).on("vclick","#incorrect",markCorrect);
});

function handleCardDrop( event, ui ) {
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );

    if(BUTTONS){
    	$("#grading").fadeIn(750);
    }
}

function markIncorrect(event) {
    nextCard()
}

function markCorrect(event) {
    nextCard()
}

function nextCard(){
    
    $("#grading").hide();

    val = Math.floor(Math.random()*5);
    $("#text").text(NUMBERS[val]);
 
 	/* Replace old description card*/
    $("#description").remove();
    p = document.createElement("p");
    $(p).text(SPANISH[val]);
    div = document.createElement("div");
    $(div).attr("id","description").append(p)
    $("#content").append(div);
    
    
 	$("#description").draggable({
		axis:"y",
		scroll:"false",
		cursor:"move",
		revert:true,
		icons:{primary:"ui-icon-locked"}
	});
 	$("#target").droppable('enable');
}
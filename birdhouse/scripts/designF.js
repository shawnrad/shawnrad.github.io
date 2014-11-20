/*
	On Ready
*/
BUTTONS = false;
NUMBERS = ["0","1","2","3","4","5"]
SPANISH = ["Cero","Uno","Dos","Tres","Quatro","Cinco"]
$(document).ready(function(){
	
	$("#grading").hide()

	$(".description").draggable({
		axis:"y",
		scroll:"false",
		cursor:"move",
		revert:true,
		icons:{primary:"ui-icon-locked"}
	});

	$("#target").droppable({
		accept: ".description",
		hoverClass: 'hovered',
		drop:handleCardDrop
	});

	$(document).on("vclick","#target",targetClick)

});

function handleCardDrop( event, ui ) {
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );

    if(BUTTONS){
    	$("#grading").fadeIn(750);
    }

    listenForSwipe()
}

function targetClick(event){
	$(".description").css({
		bottom:"-150px",
		top:"auto"})
		.animate({
			bottom:($(window).height()-602 + "px")
		},500,function(){
			$(this).position({ 
				of: $(this), 
				my: 'left top', 
				at: 'left top' })
			.draggable( 'disable' )
			.draggable( 'option', 'revert', false )		
		});

    $(this).droppable( 'disable' );

    if(BUTTONS){
    	$("#grading").delay(500).fadeIn(750);
    }

    listenForSwipe();
}

function listenForSwipe(){

	$("#grading").fadeIn(150);

    $('.cards').on("swipeleft",function() {

        // $("#grading").fadeOut(500);

        $(this).animate({
            left: '-50%'
        }, 500, function() {
            $(this).css('left', '150%');
            $(this).appendTo('#container');
        });

        $(this).next().animate({
            left: '30%'
        }, 500);

        resetDragNDrop();
        // $("#grading").hide();
    });

    $('.cards').on("swiperight",function() {

        // $("#grading").fadeOut(500);

        $(this).animate({
            left: '150%'
        }, 500, function() {
            $(this).css('left', '150%');
            $(this).appendTo('#container');
        });

        $(this).next().css('left',"-50%")
            .animate({
            left: '30%'
        }, 500);

        resetDragNDrop();
        // $("#grading").hide();
    });

}

function resetDragNDrop(){
    
    $("#grading").fadeOut(100);

 	$(".description").draggable({
		axis:"y",
		scroll:"false",
		cursor:"move",
		revert:true,
		icons:{primary:"ui-icon-locked"}
	});
 	$("#target").droppable('enable');

 	$(".cards").off("swipeleft");
 	$(".cards").off("swiperight");
}
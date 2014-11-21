/*
	On Ready
*/
$(document).ready(function(){
	

	$("#description").draggable({
		axis:"y",
		scroll:"false",
		cursor:"move",
		revert:true
	});

	$("#target").droppable({
		accept: "#description",
		hoverClass: 'hovered',
		drop:handleCardDrop
	});


});

function handleCardDrop( event, ui ) {
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
}

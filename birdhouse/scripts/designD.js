/*
	On Ready
*/
$(document).ready(function(){
	values = ["2","Dos"]
	value = 0

	// //Set initial value
	// //Portrait
	// if (window.orientation % 180) == 0{
	// 	value = 0
	// }
	// //Landscapre
	// else{
	// 	value = 1
	// }
	$("#card_text").text(values[value]);

	$(window).bind('orientationchange', function() {
   		value = (window.orientation%180 == 0) ? 0 : 1
   		$("#card_text").text(values[value]);
	});

	
});
/*
	On Ready
*/
$(document).ready(function(){
	background_video();
	map_controls();
});

/*
	Increase/Decrease SVG text by +/- scale
*/
function SVG_zoom(scale){
	fontsize = parseInt($("#svg_text").attr("font-size"));
	$("#svg_text").attr("font-size", Math.max(1,fontsize+scale));
}

/*
	Set background as input from camera.
*/
function background_video(){
	if (hasGetUserMedia()) {
	  
	} else {
	  //DO NOTHING
	}
}

/*
	Map keypresses to actions
*/
function map_controls(){    
    $(document).keypress(function (event) {
        switch (event.charCode) {
            case (50): // 2
                SVG_zoom(-5);
                break;
            case (56): // 8
                SVG_zoom(5)
                break;
        }
    });
};

/**
* UTILITIES
*/
function hasGetUserMedia(){return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);}

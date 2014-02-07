/*
	On Ready
*/
$(document).ready(function(){
	background_video();
	map_controls();
});

/*
	Increase/Decrease by CSS
*/
function CSS_zoom(selector, scale) {
	var MIN_SCALE = 0.2;
	
	try {
		matrix = $.map($(selector).css("transform").split("(")[1].split(")")[0].split(","), function(el,index){return parseFloat(el);});
		$(selector).css("transform", "scale("+Math.max(MIN_SCALE,matrix[0] + scale)+","+Math.max(MIN_SCALE,matrix[3] + scale)+")");
	}
	catch(err){/*CSS3 not supported*/}
  
	try {
		matrix = $.map($(selector).css("-ms-transform").split("(")[1].split(")")[0].split(","), function(el,index){return parseFloat(el);});
		$(selector).css("-ms-transform", "scale("+Math.max(MIN_SCALE,matrix[0] + scale)+","+Math.max(MIN_SCALE,matrix[3] + scale)+")");
	}
	catch(err){/* not IE9 */}
	
	try {
		matrix = $.map($(selector).css("-webkit-transform").split("(")[1].split(")")[0].split(","), function(el,index){return parseFloat(el);});
		$(selector).css("-webkit-transform", "scale("+Math.max(MIN_SCALE,matrix[0] + scale)+","+Math.max(MIN_SCALE,matrix[3] + scale)+")");
	}
	catch(err){/* Safari and Chrome */}
}


/*
	Map keypresses to actions
*/
function map_controls(){    
    $(document).keypress(function (event) {
        switch (event.charCode) {
            case (50): // 2
                CSS_zoom("div",-.2);
                break;
            case (56): // 8
                CSS_zoom("div",.2);
                break;
        }
    });
};



/*
	Set background as input from camera.
*/
function background_video(){
	if (hasGetUserMedia()) {
	  
	} else {
	  //DO NOTHING
	}
}

/**
* UTILITIES
*/
function hasGetUserMedia(){return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);}

/*
	On Ready
*/
$(document).ready(function(){
	dbug(false);
	
	if(!init_orientation()){
		//return;
	}
	
	init_controls();
	
	if(!init_background_video()){
		$("video").hide();
	}
	
});

/* Adjust with orientation data */
function init_orientation() {
	if (!window.DeviceOrientationEvent) {
		$("#infobar").text("DeviceOrientation is not supported").css("background","#FF6666");
		console.warn("DeviceOrientation is not supported");
		return false;
	}
	else{
		var init_roll, init_pitch, init_yaw;
		init_roll = false;
		init_pitch = false;
		init_yaw = false;
		
	
		// Listen for the deviceorientation event and handle the raw data
		window.addEventListener('deviceorientation',
		function(eventData) {
			// gamma is the left-to-right tilt in degrees, where right is positive
			var roll = eventData.gamma;
			// beta is the front-to-back tilt in degrees, where front is positive
			var pitch = eventData.beta;
			// alpha is the compass direction the device is facing in degrees
			var yaw = eventData.alpha
			
			/*Capture initial yaw*/
			if(init_yaw === false){
				init_yaw = yaw;
			}
			
			/*Adjust yaw*/
			yaw = (yaw - init_yaw + 360)%360;
			
			
			$("#infobar").text("Yaw: "+Math.round(yaw) + " Pitch: " + Math.round(pitch) + " Roll: " + Math.round(roll));
			
			/*/ Apply the transform to the image
			// Some fun rotations to try...
			var rotation;
			rotation = "rotate3d(0,1,0, "+ (roll*-1)+"deg) rotate3d(1,0,0, "+ (pitch*-1)+"deg)";
			rotation = "rotate("+ roll +"deg) rotate3d(0,1,0, "+ (roll*-1)+"deg) rotate3d(1,0,0, "+ (pitch*-1)+"deg)";
			rotation = "rotate("+ roll +"deg) rotate3d(1,0,0, "+ (pitch*-1)+"deg)"; //ORIGINAL  //MOZ = "rotate("+ roll +"deg)";
			rotation = "rotate("+ yaw + "deg)";

			var logo = document.getElementById("imgLogo");
			logo.style.webkitTransform = rotation;
			logo.style.MozTransform = rotation;
			logo.style.transform = rotation;
			*/
		},
		false);
	}
}


/*
	Increase/Decrease by CSS
*/
/*TODO: Set z-index based on scale (NUM = SCALE/0.2, implies default = 5)*/
function CSS_zoom(selector, scale) {
	var MIN_SCALE = 0.2;
	
	try {
		if($(selector).css("transform")=="none"||$(selector).css("transform")==undefined){
			$(selector).css("transform", "scale("+Math.max(MIN_SCALE,scale)+","+Math.max(MIN_SCALE,scale)+")");
		}
		else{
			matrix = $.map($(selector).css("transform").split("(")[1].split(")")[0].split(","), function(el,index){return parseFloat(el);});
			$(selector).css("transform", "scale("+Math.max(MIN_SCALE,matrix[0] + scale)+","+Math.max(MIN_SCALE,matrix[3] + scale)+")");
		}
	}
	catch(err){/*CSS3 not supported*/}
  
	try {
		if($(selector).css("-ms-transform")=="none"||$(selector).css("-ms-transform")==undefined){
			$(selector).css("-ms-transform", "scale("+Math.max(MIN_SCALE,scale)+","+Math.max(MIN_SCALE,scale)+")");
		}
		else{
			matrix = $.map($(selector).css("-ms-transform").split("(")[1].split(")")[0].split(","), function(el,index){return parseFloat(el);});
			$(selector).css("-ms-transform", "scale("+Math.max(MIN_SCALE,matrix[0] + scale)+","+Math.max(MIN_SCALE,matrix[3] + scale)+")");
		}
	}
	catch(err){/* not IE9 */}
	
	try {
		if($(selector).css("-webkit-transform")=="none"||$(selector).css("-webkit-transform")==undefined){
			$(selector).css("-webkit-transform", "scale("+Math.max(MIN_SCALE,scale)+","+Math.max(MIN_SCALE,scale)+")");
		}
		else{
			matrix = $.map($(selector).css("-webkit-transform").split("(")[1].split(")")[0].split(","), function(el,index){return parseFloat(el);});
			$(selector).css("-webkit-transform", "scale("+Math.max(MIN_SCALE,matrix[0] + scale)+","+Math.max(MIN_SCALE,matrix[3] + scale)+")");
		}
	}
	catch(err){/* Safari and Chrome */}
}



/*
	Map controls to DOM elements
*/
function init_controls(){    
    
	$("#div_text").draggable().zoomable();
};


/*
	Set background as input from camera.
*/
function init_background_video(){
	if (hasGetUserMedia()) {
		
		navigator.getUserMedia = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

		
		var video = document.querySelector('video');

		navigator.getUserMedia({audio: false, video: {mandatory:{minWidth:window.screen.availWidth, minHeight:window.screen.availHeight}}}, function(stream) {
			video.src = window.URL.createObjectURL(stream);
			
			/*TODO:  Send browser (not just single element) fullscreen.
			Single element - http://www.sitepoint.com/html5-full-screen-api/)
			*/
			
		  }, function(e) {console.error('getUserMedia error', e);}
		);
		
		return true;
	} else {
		$("#infobar").text("getUserMedia not supported.").css("background","#FF6666");
		console.warn("getUserMedia is not supported");
		return false;
	}
}

function dbug(debugging){
	if(debugging){
		$(".infobar").show();
		$("#show_infobar").hide();
	}
	else{
		$(".infobar").hide();
		$("#show_infobar").show();
	}
}

/*Zoomable Jquery Plugin Source: http://learn.jquery.com/plugins/basic-plugin-creation/*/
(function( $ ) {
    $.fn.zoomable = function() {
		/*BEGIN FUNCTION*/
        return this.each(function() {
			/*MOUSE SCROLL Source: http://blogs.sitepointstatic.com/examples/tech/mouse-wheel/index.html*/
			function MouseWheelHandler(e) {
				// Cross-browser wheel delta
				var e = window.event || e; // old IE support
				var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
				CSS_zoom(this, delta*0.2)
			}
			
            if (this.addEventListener) {
				// IE9, Chrome, Safari, Opera
				this.addEventListener("mousewheel", MouseWheelHandler, false);
				// Firefox
				this.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
			}
			// IE 6/7/8
			else{
				this.attachEvent("onmousewheel", MouseWheelHandler);
			}
        });/*END FUNCTION*/
    };
}( jQuery ));

/**
* UTILITIES
*/
function hasGetUserMedia(){return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);}
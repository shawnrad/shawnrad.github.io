/*
	On Ready
*/
$(document).ready(function(){
	
	init_orientation()
	background_video();
	
	map_controls();
});

/* Adjust with orientation data */
function init_orientation() {
	if (!window.DeviceOrientationEvent) {
		$("#infobar").text("DeviceOrientation is not supported").css("background","#FF6666");
		console.warn("DeviceOrientation is not supported");
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
		
		navigator.getUserMedia = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

		
		var video = document.querySelector('video');

		navigator.getUserMedia({audio: false, video: {mandatory:{minWidth:window.screen.availWidth, minHeight:window.screen.availHeight}}}, function(stream) {
			video.src = window.URL.createObjectURL(stream);
			
			//Go Full-screen (Taken from http://www.sitepoint.com/html5-full-screen-api/)
			video.requestFullScreen(); 			//Standard
			video.webkitRequestFullScreen();	//Chrome/Safari
			video.mozRequestFullScreen();		//Firefox
			
			console.log(video);
			
		  }, function(e) {console.error('getUserMedia error', e);}
		);

	} else {
		$("#infobar").text("getUserMedia not supported.").css("background","#FF6666");
		console.warn("getUserMedia is not supported");
	}
}

/**
* UTILITIES
*/
function hasGetUserMedia(){return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);}
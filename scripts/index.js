/*
	On Ready
*/
$(document).ready(function(){
	initialization();
	background_video();
	map_controls();
});

var count = 0;
function initialization(){
	if (!window.DeviceOrientationEvent) {
		$("#infobar").text("DeviceOrientation is not supported").css("background","#FF6666");
		console.warn("DeviceOrientation is not supported");
	}
	else{ 
		init()
	}

}

function init() {
  if (window.DeviceOrientationEvent) {
	document.getElementById("doEvent").innerHTML = "DeviceOrientation";
	// Listen for the deviceorientation event and handle the raw data
	window.addEventListener('deviceorientation', function(eventData) {
	  // gamma is the left-to-right tilt in degrees, where right is positive
	  var tiltLR = eventData.gamma;
	  
	  // beta is the front-to-back tilt in degrees, where front is positive
	  var tiltFB = eventData.beta;
	  
	  // alpha is the compass direction the device is facing in degrees
	  var dir = eventData.alpha
	  
	  // call our orientation event handler
	  deviceOrientationHandler(tiltLR, tiltFB, dir);
	  }, false);
  } else {
	document.getElementById("doEvent").innerHTML = "Not supported on your device or browser.  Sorry."
  }
}

function deviceOrientationHandler(tiltLR, tiltFB, dir) {
  document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
  document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
  document.getElementById("doDirection").innerHTML = Math.round(dir);
  
  // Apply the transform to the image

  // Some other fun rotations to try...
  // var rotation = "rotate3d(0,1,0, "+ (tiltLR*-1)+"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
  // var rotation = "rotate("+ tiltLR +"deg) rotate3d(0,1,0, "+ (tiltLR*-1)+"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";

  var logo = document.getElementById("imgLogo");
  logo.style.webkitTransform = "rotate("+ -dir +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
  logo.style.MozTransform = "rotate("+ -dir +"deg)";
  logo.style.transform = "rotate("+ -dir +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
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
		//DO SOMETHING WITH GETUSERMEDIA
	} else {
		$("#infobar").text("getUserMedia not supported.").css("background","#FF6666");
		console.warn("getUserMedia is not supported");
	}
}

/**
* UTILITIES
*/
function hasGetUserMedia(){return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);}

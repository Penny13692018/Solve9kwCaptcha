var AndroidYes = 1;

function check_device()
{
	if( navigator.userAgent.match(/Android/i))
		AndroidYes = 1;
	else if(navigator.userAgent.match(/iPhone/i))
		AndroidYes = 0;
	else
		AndroidYes = 0;
	
	if(AndroidYes==0)
	{
/*		setCookie('vibration','0','2');
		alert("Vibration Available Only on Android Device");
		document.getElementById("vibration").checked = false;
*/
	}
		
}

function getDeviceType()
{
	return AndroidYes;
}

function detectmob() 
{ 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    //setCookie('interactivecaptcha','0','2');
	//setCookie('rc2audio','0','2');
	//alert("Solving reCaptcha Now Testing!");
	//document.getElementById("interactivecaptcha").checked = false;
	//document.getElementById("rc2audio").checked = false;
	
  }
 else {
    
  }
}
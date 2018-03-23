var interactive_ok = 1;

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, 30);
       }
    }
}

function listCookie() {
  document.writeln("<table>");
  document.writeln("<tr><th>Name<th>Value");
  cookieArray = document.cookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    thisCookie = cookieArray[i].split("=");
    cName = unescape(thisCookie[0]);
    cValue = unescape(thisCookie[1]);
    document.writeln("<tr><td>" + cName + "</td><td>" + cValue + "</td>");
  }
  document.writeln("</table>");
}

function deleteAllCookies() {	
	cookieArray = document.cookie.split(";");
	for (var i = 0; i < cookieArray.length; i++) {
		thisCookie = cookieArray[i].split("=");
		cName = unescape(thisCookie[0]);
		cValue = unescape(thisCookie[1]);
		document.thisCookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}

}

function check_cookie(selectdata){
	if(selectdata == "interactivecaptcha"){
		if($('#'+selectdata).is(':checked') == true && interactive_ok == 1){
			setCookie(selectdata,'1','365');
		}else{
			setCookie(selectdata,'0','365');
		}
	}else if(selectdata == "interactivecaptchaserver"){
		if($('#interactivecaptcha').is(':checked') == true){
			setCookie(selectdata,'1','365');
		}else{
			setCookie(selectdata,'0','365');
		}
	}else if(selectdata == "textcaptcha_word"){
		if($('#textcaptcha').is(':checked') == true){
			setCookie(selectdata,'yes','365');
		}else{
			setCookie(selectdata,'no','365');
		}
	}else{
		if($('#'+selectdata).is(':checked') == true){
			setCookie(selectdata,'1','365');
		}else{
			setCookie(selectdata,'0','365');
		}
	}
}
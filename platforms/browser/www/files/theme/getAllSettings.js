  function getAllSettings()
	{
		document.getElementById("apikey").value = getCookie('apikey');
		document.getElementById("zoomdata").value = getCookie('zoomdata');
		getCheckSettings("flip");
		getCheckSettings("mirror");
		getCheckSettings("sound");
		getCheckSettings("vibration");
		document.getElementById("refresh").checked = true;
		getCheckSettings("textcaptcha");
		getCheckSettings("mousecaptcha");
		getCheckSettings("multimousecaptcha");
		getCheckSettings("audiocaptcha");
		getCheckSettings("rotatecaptcha");
		getCheckSettings("puzzlecaptcha");
		getCheckSettings("textonlycaptcha");
		getCheckSettings("confirmcaptcha");
		getCheckSettings("interactivecaptcha");
		document.getElementById("widthc").value = getCookie('widthc');
		document.getElementById("heightc").value = getCookie('heightc');
		getCheckSettings("rc2audio");
		getCheckSettings("startpre");
		document.getElementById("autostart").checked = false;
		document.getElementById("grau").checked = false;
		document.getElementById("desktopinfo").checked = false;
		document.getElementById("speed").checked = false;
		document.getElementById("speedlevel").value = '0';			
	}
	
  function getAllSettingsForSettingPage()
	{
		if(getCookie('widthc')=='')
			setCookie('widthc','350',2);
		if(getCookie('heightc')=='')
			setCookie('heightc','200',2);
		
		document.getElementById("apikey").value = getCookie('apikey');
		document.getElementById("zoomdata").value = getCookie('zoomdata');
		getCheckSettings("sound");
		getCheckSettings("vibration");
		getCheckSettings("textcaptcha");
		getCheckSettings("mousecaptcha");
		getCheckSettings("multimousecaptcha");
		getCheckSettings("audiocaptcha");
		getCheckSettings("rotatecaptcha");
		getCheckSettings("puzzlecaptcha");
		getCheckSettings("textonlycaptcha");
		getCheckSettings("confirmcaptcha");
		getCheckSettings("interactivecaptcha");
		document.getElementById("widthc").value = getCookie('widthc');
		document.getElementById("heightc").value = getCookie('heightc');
		getCheckSettings("rc2audio");
		getCheckSettings("startpre");
	}

	function getCheckSettings(dataforcheck)
	{
		if(getCookie(dataforcheck)=='1')
		{
			document.getElementById(dataforcheck).checked = true;
		}
		else
		{
			document.getElementById(dataforcheck).checked = false;
		}
	}

/*進度: 接上9kw.js並讓reCaptcha可用(ok!)
		把skip按鈕放入inappbrowser中 (ok!)
*/
	
	var freebitcoinurl = null;
	
	var iabRef = null;  //browser for target website
	var datasitekey = null;
	var answerforcaptcha = null; //save captcha answer and send to 9kw
	var skipnote = null;
	var tempcode = "localStorage.answerforcaptcha = response;";
	var skipcode = "localStorage.answerforcaptcha = 1;";
	
	
	//設定好reCaptcha的放置區塊
	function setContentArea()
	{
		//Clear Environment
		iabRef.executeScript({code: "document.body.innerHTML = '';"});
		iabRef.executeScript({code: "document.getElementsByTagName('head')[0].innerHTML = '';"});
		
		//Add Content
		iabRef.executeScript({code: "var testarea = document.createElement('div');"});
		iabRef.executeScript({code: "testarea.innerHTML = '';"});
		iabRef.executeScript({code: "testarea.setAttribute('id', 'html_element');"});
		iabRef.executeScript({code: "testarea.setAttribute('data-callback', 'correctCaptcha');"});
		iabRef.executeScript({code: "testarea.setAttribute('class', 'g-recaptcha');"});
		iabRef.executeScript({code: "testarea.setAttribute('data-type', 'image');"});
		iabRef.executeScript({code: "testarea.setAttribute('data-sitekey', '"+datasitekey+"');"});
		iabRef.executeScript({code: "document.body.appendChild(testarea);"});
		addSkipButton();
	}
	
	//設定skip item
	function addSkipButton()
	{
		iabRef.executeScript({code: "var skipbutton = document.createElement('input');"});
		iabRef.executeScript({code: "skipbutton.setAttribute('id','skipbutton');"});
		iabRef.executeScript({code: "skipbutton.setAttribute('type','button');"});
		iabRef.executeScript({code: "skipbutton.setAttribute('title','Skip');"});
		iabRef.executeScript({code: "skipbutton.setAttribute('value','SKIP');"});
		iabRef.executeScript({code: "skipbutton.setAttribute('onclick','skipCaptcha()');"});
		iabRef.executeScript({code: "document.body.appendChild(skipbutton);"});
		
		iabRef.executeScript({code: "var skipResponseScript = document.createElement('script');"});
		iabRef.executeScript({code: "skipResponseScript.type = 'text/javascript';"});
		iabRef.executeScript({code: "var t3 = document.createTextNode('function skipCaptcha(){"+skipcode+"}')"});
		iabRef.executeScript({code: "skipResponseScript.appendChild(t3);"});;		
		iabRef.executeScript({code: "document.head.appendChild(skipResponseScript);"});		
	}
	
	//將網頁放入reCaptcha的必須函式
	function loadreCaptchaScript()
	{		
		iabRef.executeScript({code: "var reCaptchaScript = document.createElement('script');"});
		iabRef.executeScript({code: "reCaptchaScript.type = 'text/javascript';"});
		iabRef.executeScript({code: "reCaptchaScript.src = 'https://www.google.com/recaptcha/api.js';"});
		iabRef.executeScript({code: "document.body.appendChild(reCaptchaScript);"});

		iabRef.executeScript({code: "var getResponseScript = document.createElement('script');"});
		iabRef.executeScript({code: "getResponseScript.type = 'text/javascript';"});
		iabRef.executeScript({code: "var t2 = document.createTextNode('var correctCaptcha = function(response){"+tempcode+"};')"});
		iabRef.executeScript({code: "getResponseScript.appendChild(t2);"});;		
		iabRef.executeScript({code: "document.head.appendChild(getResponseScript);"});
		//iabRef.executeScript({code: "alert(skipResponseScript.outerHTML);"});

	}

	//拿解出答案的方法
	function getAnswer()
	{
		iabRef.executeScript({code: "localStorage.answerforcaptcha"},function(values){answerforcaptcha = values[0];});				
	}

	function checkAnswer()
	{
		if(answerforcaptcha==null){}
		
		else if(answerforcaptcha==="1")
		{		
			iabRef.executeScript({code: "localStorage.removeItem('answerforcaptcha');"});
			answerforcaptcha=null;
			iabRef.close();
			captchaskip();
		}
				
		else
		{
			//alert(answerforcaptcha);
			iabRef.executeScript({code: "localStorage.removeItem('answerforcaptcha');"});
			iabRef.close();			
		}
	}
	
	//Event Trigger in freebitco.in site
    function iabLoadStart(event) 
	{
		answerforcaptcha = null;
        //alert(event.type + ' - ' + event.url);
    }	
	
	//Get Google reCaptcha if site is loaded
	function iabLoadStop(event) 
	{
		//alert(event.type + ' - ' + event.url);	
		setContentArea();
		loadreCaptchaScript();
		
		var getAns = setInterval(function(){getAnswer(); checkAnswer(); if(answerforcaptcha!=null){clearInterval(getAns)}}, 1000);
	}
	
	function iabLoadError(event) 
	{ 
		alert(event.type + ' - ' + event.message);
	}
        
    function iabClose(event) 
	{
		 //alert(event.type + ' - ' + event.url);	 
         iabRef.removeEventListener('loadstart', iabLoadStart);
         iabRef.removeEventListener('loadstop', iabLoadStop);
         iabRef.removeEventListener('loaderror', iabLoadError);
         iabRef.removeEventListener('exit', iabClose);
    }
	
	//Put all events into freebitcoin site trigger
	function openfreebitcoin(pageurl, theKey)
	{
		 //alert("inappbrowser 有啟動!");
		 datasitekey = theKey;
		 iabRef = cordova.InAppBrowser.open(pageurl, '_blank', 'location=no');
         iabRef.addEventListener('loadstart', iabLoadStart);
		 iabRef.addEventListener('loadstop', iabLoadStop);	 
         iabRef.addEventListener('loaderror', iabLoadError);
         iabRef.addEventListener('exit', iabClose);		
	}
	
	
	function CheckCaptchaAnswer()
	{
		//alert('answerforcaptcha is \n'+answerforcaptcha);
		return answerforcaptcha;
	}

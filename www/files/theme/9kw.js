// Presettings
var zoomold = "";
var captchaid = "";
var timeout = "";
var stopit = 1;
var captchanext = 0;
var captchatry;
var skipcaptchaid = "";
var interactive_ok = 1;
var apikey = "__apikey__";
var version = "1.2";
var missedcaptcha = 0;

var idleSeconds = 1000;
var idleSecondsCheck = idleSeconds;
var win = null;
var maximages = "";//For puzzle captchas
var string95 = String.fromCharCode(95);

var zoomused = "";
var move1used = "";
var move2used = "";
var move3used = "";

var totalstop = "";
var fooTimeout = "";
var fooTimeout2 = "";
var fooTimeout3 = "";
var fooTimeout4 = "";
var roundTimeout = 0;

var credits = "";
var captchas = {};
var statuscaptcha = {};
var statuscaptchadate = {};
var statusdata = {};
var checks = {};

var lognumber = 0;
var logdata = "";
var topuserdata = "";

var serverqueue = "";
var usersandboxfull = "";
var usersandboxlight = "";

function multiLineHtmlEncode(value) {
	var lines = value.split(/\r\n|\r|\n/);
	for (var i = 0; i < lines.length; i++) {
		lines[i] = htmlEncode(lines[i]);
	}
	return lines.join('\r\n');
}

function htmlEncode(value) {
	return $('<div/>').text(value).html();
}

function showPuzzle(){
	var imagebackground = captchas[captchaid].file1;
	var imagesample = captchas[captchaid].file2;

	var image1 = captchas[captchaid].file3;
	var image2 = captchas[captchaid].file4;
	var image3 = captchas[captchaid].file5;
	var image4 = captchas[captchaid].file6;
	var image5 = captchas[captchaid].file7;
	var image6 = captchas[captchaid].file8;

	$('#containment-wrapper').css('background-image', "url("+imagebackground+")");
	$('#sampleimg').attr('src',imagesample);
	if(maximages > 2){
		$('#draggable1img').attr('src',image1).load(function(){
			var parentPos = $("#draggable1").parent().position();
			$('#draggable1').css({left: parseInt(parentPos.left + 10)+"px", top: parseInt(parentPos.top + 32)+"px"});
			$('#draggable1').css('width', $('#draggable1img').width()+'px');
			$('#draggable1').css('height', $('#draggable1img').height()+'px');
			$('#draggable1').show();
		});
	}else{
		$('#draggable1').hide();
	}
	if(maximages > 3){
		$('#draggable2img').attr('src',image2).load(function(){
			var parentPos = $("#draggable2").parent().position();
			$('#draggable2').css({left: parseInt(parentPos.left + 12)+"px", top: parseInt(parentPos.top + 36)+"px"});
			$('#draggable2').css('width', $('#draggable2img').width()+'px');
			$('#draggable2').css('height', $('#draggable2img').height()+'px');
			$('#draggable2').show();
		});
	}else{
		$('#draggable2').hide();
	}
	if(maximages > 4){
		$('#draggable3img').attr('src',image3).load(function(){
			var parentPos = $("#draggable3").parent().position();
			$('#draggable3').css({left: parseInt(parentPos.left + 14)+"px", top: parseInt(parentPos.top + 40)+"px"});
			$('#draggable3').css('width', $('#draggable3img').width()+'px');
			$('#draggable3').css('height', $('#draggable3img').height()+'px');
			$('#draggable3').show();
		});
	}else{
		$('#draggable3').hide();
	}
	if(maximages > 5){
		$('#draggable4img').attr('src',image4).load(function(){
			var parentPos = $("#draggable4").parent().position();
			$('#draggable4').css({left: parseInt(parentPos.left + 16)+"px", top: parseInt(parentPos.top + 44)+"px"});
			$('#draggable4').css('width', $('#draggable4img').width()+'px');
			$('#draggable4').css('height', $('#draggable4img').height()+'px');
			$('#draggable4').show();
		});
	}else{
		$('#draggable4').hide();
	}
	if(maximages > 6){
		$('#draggable5img').attr('src',image5).load(function(){
			var parentPos = $("#draggable5").parent().position();
			$('#draggable5').css({left: parseInt(parentPos.left + 18)+"px", top: parseInt(parentPos.top + 48)+"px"});
			$('#draggable5').css('width', $('#draggable5img').width()+'px');
			$('#draggable5').css('height', $('#draggable5img').height()+'px');
			$('#draggable5').show();
		});
	}else{
		$('#draggable5').hide();
	}
	if(maximages > 7){
		$('#draggable6img').attr('src',image6).load(function(){
			var parentPos = $("#draggable6").parent().position();
			$('#draggable6').css({left: parseInt(parentPos.left + 20)+"px", top: parseInt(parentPos.top + 52)+"px"});
			$('#draggable6').css('width', $('#draggable6img').width()+'px');
			$('#draggable6').css('height', $('#draggable6img').height()+'px');
			$('#draggable6').show();
		});
	}else{
		$('#draggable6').hide();
	}

	$("#draggable1").draggable({
		containment: "#contain",
		scroll: false,
		drag: function() {
			nextcoords(maximages);
		}
	});
	$("#draggable2").draggable({
		containment: "#contain",
		scroll: false,
		drag: function() {
			nextcoords(maximages);
		}
	});
	$("#draggable3").draggable({
		containment: "#contain",
		scroll: false,
		drag: function() {
			nextcoords(maximages);
		}
	});
	$("#draggable4").draggable({
		containment: "#contain",
		scroll: false,
		drag: function() {
			nextcoords(maximages);
		}
	});
	$("#draggable5").draggable({
		containment: "#contain",
		scroll: false,
		drag: function() {
			nextcoords(maximages);
		}
	});
	$("#draggable6").draggable({
		containment: "#contain",
		scroll: false,
		drag: function() {
			nextcoords(maximages);
		}
	});
}

function nextcoords (images,x,y){
	var newcoords = "";
	if(images > 2){
		var thisPos = $("#draggable1").position();
		var parentPos = $("#draggable1").parent().position();

		var x = thisPos.left - parentPos.left;
		var y = thisPos.top - parentPos.top;
		//newcoords += parseInt(x)+"."+parseInt(y)+"."+(parseInt(x)+parseInt($("#draggable1img").width()))+"."+(parseInt(y)+parseInt($("#draggable1img").height()));
		newcoords += parseInt(x)+"."+parseInt(y);
	}
	if(images > 3){
		newcoords += ".";
		var thisPos = $("#draggable2").position();
		var parentPos = $("#draggable2").parent().position();

		var x = thisPos.left - parentPos.left;
		var y = thisPos.top - parentPos.top;
		newcoords += parseInt(x)+"."+parseInt(y);
	}
	if(images > 4){
		newcoords += ".";
		var thisPos = $("#draggable3").position();
		var parentPos = $("#draggable3").parent().position();

		var x = thisPos.left - parentPos.left;
		var y = thisPos.top - parentPos.top;
		newcoords += parseInt(x)+"."+parseInt(y);
	}
	if(images > 5){
		newcoords += ".";
		var thisPos = $("#draggable4").position();
		var parentPos = $("#draggable4").parent().position();

		var x = thisPos.left - parentPos.left;
		var y = thisPos.top - parentPos.top;
		newcoords += parseInt(x)+"."+parseInt(y);
	}
	if(images > 6){
		newcoords += ".";
		var thisPos = $("#draggable5").position();
		var parentPos = $("#draggable5").parent().position();

		var x = thisPos.left - parentPos.left;
		var y = thisPos.top - parentPos.top;
		newcoords += parseInt(x)+"."+parseInt(y);
	}
	if(images > 7){
		newcoords += ".";
		var thisPos = $("#draggable6").position();
		var parentPos = $("#draggable6").parent().position();

		var x = thisPos.left - parentPos.left;
		var y = thisPos.top - parentPos.top;
		newcoords += parseInt(x)+"."+parseInt(y);
	}
	$("#input_text").val(newcoords);
}

// Notification
function showNotifications(){
	if(typeof Notification === 'function'){ 
		Notification.requestPermission(function (status) {
			if(Notification.permission !== status){
				Notification.permission = status;
			}
			if(Notification.permission === 'granted'){
				if(captchaid != ""){
					var ms = 8000;
					var en = new Notification('New captcha '+captchaid+' is available.', { 
						body: '9kw.eu',
						icon: 'https://www.9kw.eu/grafik/email.png' 
					});
					en.onshow = function(){setTimeout(function(){en.close}, ms)}
				}
			}
		});
	}
}

function play_popup(){
	myleft = (screen.width)?(screen.width-350)/2:100;mytop=(screen.height)?(screen.height-120)/2:100;
	settings = "width=350,height=120,top=" + mytop + ",left=" + myleft + ",scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no,dependent=no";
	win = window.open("https://www.9kw.eu/index.cgi/popup.html","9kw.eu - NEW CAPTCHA "+captchaid,settings);
	win.focus();
}

// Starts vibration at passed in level - not available yet
function startVibrate() {
    navigator.vibrate(500);
}

function play_sound(){
	//playSound();
	$('#nextsoundplay')[0].currentTime = 0;
	$('#nextsoundplay')[0].play();
}

function playSound(soundFile) {
	if(soundFile === undefined) return; 
	var audio = document.createElement('audio');
	audio.src = soundFile;
	audio.play();
	audio = undefined;
}

function captchastart(){
	if(apikey == ""){
		return false;
	}

	$("#usercaptchaget").hide();
	$("#progressbar2").show();

	$("#captchaskip").prop("disabled",false);
	$("#captchasend1").prop("disabled",false);
	$("#captchasend2").prop("disabled",false);
	$("#captchastop").prop("disabled",false);
	$("#captchastart").prop("disabled",true);

	captchaid = "";
	captchanext = 0;

	$("#input_text").show();
	$("#captchasend").show();
	$("#captchaskip").show();
	$("#captchaskipinteractive").hide();

	$("#input_text").val("");

	$("#mycaptcha").html("");
	$("#captchaidsize").html("");
	$("#textthing").hide();
	$("#usercaptchatext").hide();

	$("#captchasendempty").hide();
	$("#emptything").hide();

	$("#interactivecaptchahtml").hide();
	$("#confirmcaptchahtml").hide();
	$("#puzzlecaptchahtml").hide();
	$("#audiocaptchahtml").hide();
	$("#imagecaptchahtml").hide();
}

function captchastop(){
	captchatry = 0;
	$("#progressbar").progressbar({value: 100});
	$(".progress-label").text('? seconds');
	$("#progressbar2").hide();

	$("#captchaskip").prop("disabled",true);
	$("#captchasend1").prop("disabled",true);
	$("#captchasend2").prop("disabled",true);
	$("#captchastop").prop("disabled",true);
	$("#captchastart").prop("disabled",false);

	$("#captchasandbox").hide();
	$("#captchamath").hide();
	$("#captchaphrase").hide();
	$("#captchanospace").hide();
	$("#captchalength").hide();
	$("#captchachars").hide();
	$("#captchatype").hide();

	$("#input_text").show();
	$("#captchasend").show();
	$("#captchaskip").show();
	$("#captchaskipinteractive").hide();

	$("#input_text").val("");

	$("#mycaptcha").html("");
	$("#captchaidsize").html("");
	$("#textthing").hide();
	$("#usercaptchatext").hide();

	$("#captchasendempty").hide();
	$("#emptything").hide();

	$("#interactivecaptchahtml").hide();
	$("#confirmcaptchahtml").hide();
	$("#puzzlecaptchahtml").hide();
	$("#audiocaptchahtml").hide();
	$("#imagecaptchahtml").hide();

	for(key in statuscaptcha){
		delete statuscaptchadate[captchas[key].serverdate];
		delete statuscaptcha[key];
		delete captchas[key];
	}
	for(key in statusdata){
		statusdata[key] = 0;
	}

	if(totalstop == 2){
		$("#usercaptchatext").html("Missing captcha "+captchaid+" - Stop...");
	}else{
		$("#usercaptchatext").html("Stop...");
	}
	$("#usercaptchatext").show();
	stopit = 1;
	totalstop = "";
	captchaid = "";
}

function captchastopget(){
	if(captchaid != ""){
		$.ajax({
			url: 'https://www.9kw.eu/index.cgi/index.cgi',
			async: true,
			cache: false,
			type: 'GET',
			data: {action: "usercaptchaskip", apikey: apikey, json: "1", speed: captchas[captchaid].speed, end: 1, speedlevel: captchas[captchaid].speedlevel, id: captchaid, captcha: $("#input_text").val(), source: "solve9kwcaptcha", time: $.now()},
			dataType: 'json',
			timeout: 5000,
			retryCount: 0,
			retryLimit: 5,
			retryTimeout: 10000,
			created: Date.now(),
			success: function(data, textStatus, request){
				if(request.status != 200){
					this.retryCount++;
					if(this.retryCount <= this.retryLimit && Date.now() - this.created < this.retryTimeout){
						return($.ajax(this));
					}
				}
			},
			error: function(xhr, textStatus, errorThrown){
				this.retryCount++;
				if(this.retryCount <= this.retryLimit && Date.now() - this.created < this.retryTimeout){
					return($.ajax(this));
				}
			}
		});
	}
}

function usercaptchanewok(){
	if(captchaid != ""){
		$.ajax({
			url: 'https://www.9kw.eu/index.cgi/index.cgi',
			async: true,
			cache: false,
			type: 'GET',
			data: {action: "usercaptchanewok", apikey: apikey, json: "1", captcha: captchaid, speed: captchas[captchaid].speed, speedlevel: captchas[captchaid].speedlevel, source: "solve9kwcaptcha", time: $.now()},
			dataType: 'json',
			timeout: 5000,
			retryCount: 0,
			retryLimit: 5,
			retryTimeout: 10000,
			created: Date.now(),
			success: function(data, textStatus, request){
				if(request.status != 200){
					this.retryCount++;
					if(this.retryCount <= this.retryLimit && Date.now() - this.created < this.retryTimeout){
						return($.ajax(this));
					}
				}
			},
			error: function(xhr, textStatus, errorThrown){
				this.retryCount++;
				if(this.retryCount <= this.retryLimit && Date.now() - this.created < this.retryTimeout){
					return($.ajax(this));
				}
			}
		});
	}
}

function captchaskip(){
	captchatry = 0;
	skipcaptchaid = captchaid;
	captchaid = "";
	$("#input_text").show();
	$("#captchasend").show();
	$("#captchaskip").show();
	$("#progressbar2").show();
	$("#captchaskipinteractive").hide();

	$("#input_text").val("");

	$("#mycaptcha").html("");
	$("#captchaidsize").html("");
	$("#textthing").hide();
	$("#usercaptchatext").hide();

	$("#captchasendempty").hide();
	$("#emptything").hide();

	$("#interactivecaptchahtml").hide();
	$("#confirmcaptchahtml").hide();
	$("#puzzlecaptchahtml").hide();
	$("#audiocaptchahtml").hide();
	$("#imagecaptchahtml").hide();

	$("#progressbar").progressbar({value: 100});
	$(".progress-label").text('? seconds');

	if(skipcaptchaid != ""){
		statusdata[captchas[skipcaptchaid].speedlevel] = 0;

		$.ajax({
			url: 'https://www.9kw.eu/index.cgi/index.cgi',
			async: true,
			cache: false,
			type: 'GET',
			data: {action: "usercaptchaskip", apikey: apikey, json: "1", speed: captchas[skipcaptchaid].speed, speedlevel: captchas[skipcaptchaid].speedlevel, id: skipcaptchaid, captcha: $("#input_text").val(), source: "solve9kwcaptcha", time: $.now()},
			dataType: 'json',
			timeout: 5000,
			retryCount: 0,
			retryLimit: 5,
			retryTimeout: 10000,
			created: Date.now(),
			success: function(data, textStatus, request){
				if(request.status != 200){
					this.retryCount++;
					if(this.retryCount <= this.retryLimit && Date.now() - this.created < this.retryTimeout){
						return($.ajax(this));
					}
				}
			},
			error: function(xhr, textStatus, errorThrown){
				this.retryCount++;
				if(this.retryCount <= this.retryLimit && Date.now() - this.created < this.retryTimeout){
					return($.ajax(this));
				}
			}
		});
		delete statuscaptchadate[captchas[skipcaptchaid].serverdate];
		delete statuscaptcha[skipcaptchaid];
		delete captchas[skipcaptchaid];
	}
}

function getPos(evt,mousetyp){
	var img_x;
	var img_y;
	if(evt.offsetX && evt.offsetY){
		img_x = evt.offsetX;
		img_y = evt.offsetY;
	}else{
		img_x = evt.pageX;
		img_y = evt.pageY;
		for (var offMark = evt.target; offMark != null; offMark = offMark.offsetParent){
			img_x -= offMark.offsetLeft;
		}
		for (var offMark = evt.target; offMark != null; offMark = offMark.offsetParent){
			img_y -= offMark.offsetTop;
		}
	}

	if(mousetyp == "1"){
		$("#input_text").show();
		$("#input_text").val(img_x + 'x' + img_y);
		captchasend();
	}else{
		$("#captchasend").show();
		$("#input_text").show();
		if($("#input_text").val().length > 0){
			$("#input_text").val($("#input_text").val()+';'+img_x + 'x' + img_y);
		}else{
			$("#input_text").val(img_x + 'x' + img_y);
		}
		$("#input_text").hide();
	}
}

function captchasendsub(t_captchaid,t_input_text,t_speed,t_confirm,t_speedlevel){
	if(t_captchaid != ""){
		$.ajax({
			url: 'https://www.9kw.eu/index.cgi/index.cgi',
			async: true,
			cache: false,
			type: 'GET',
			data: {action: "usercaptchacorrect", apikey: apikey, json: "1", speed: t_speed, confirm: t_confirm, speedlevel: t_speedlevel, id: t_captchaid, captcha: t_input_text, source: "solve9kwcaptcha", time: $.now()},
			dataType: 'json',
			timeout: 5000,
			retryCount: 0,
			retryLimit: 5,
			retryTimeout: 10000,
			created: Date.now(),
			success: function(data, textStatus, request){
				if(request.status != 200){
					this.retryCount++;
					if(this.retryCount <= this.retryLimit && Date.now() - this.created < this.retryTimeout){
						return($.ajax(this));
					}
				}else{
					if(data.hasOwnProperty('error')){
						lognumber++;
						logdata = t_captchaid + ": " + data.error + "<br>\n" + logdata;
						$("#userlog").html(logdata);
						$("#logname").html("Log ("+lognumber+")");
					}
				}
			},
			error: function(xhr, textStatus, errorThrown){
				this.retryCount++;
				if(this.retryCount <= this.retryLimit && Date.now() - this.created < this.retryTimeout){
					return($.ajax(this));
				}
			}
		})
	}
}

function captchasend(){
	if(captchaid != ""){
		if($("#input_text").val() == ''){
			return false;
		}
		if(captchaid == ''){
			alert('No captcha found.');
			return false;
		}

		$("#input_text").show();
		$("#captchasend").show();
		$("#captchaskip").show();
		$("#captchaskipinteractive").hide();
		$("#progressbar2").show();

		$("#mycaptcha").html("");
		$("#captchaidsize").html("");
		$("#textthing").hide();
		$("#usercaptchatext").hide();

		$("#captchasendempty").hide();
		$("#emptything").hide();

		$("#interactivecaptchahtml").hide();
		$("#confirmcaptchahtml").hide();
		$("#puzzlecaptchahtml").hide();
		$("#audiocaptchahtml").hide();
		$("#imagecaptchahtml").hide();

		$("#progressbar").progressbar({value: 100});
		$(".progress-label").text('? seconds');

		$("#captchamath").hide();
		$("#captchaphrase").hide();
		$("#captchanospace").hide();
		$("#captchalength").hide();
		$("#captchachars").hide();
		$("#captchatype").hide();

		captchasendsub(captchaid,$("#input_text").val(),captchas[captchaid].speed,captchas[captchaid].confirm,captchas[captchaid].speedlevel);

		statusdata[captchas[captchaid].speedlevel] = 0;
		delete statuscaptchadate[captchas[captchaid].serverdate];
		delete statuscaptcha[captchaid];
		delete captchas[captchaid];

		$("#input_text").val("");
		captchaid = "";
	}
}

function captchasendempty(){
	$("#input_text").val('0');
	captchasend();
}

function captchazoom(zoomfirst){
	if(captchas[captchaid].text == 1 && captchaid != "" && zoomused != captchaid){
		zoomused = captchaid;
		if(parseInt(parseInt(captchas[captchaid].width) + parseInt(captchas[captchaid].height)) < 400){
			var zoom = $("#zoomdata").val();
			zoom -= 100;
			$("#captchaimage").width(parseInt(captchas[captchaid].width));
			$("#captchaimage").height(parseInt(captchas[captchaid].height));
			if(parseInt(zoom) > 1){
				$("#captchaimage").animate({ width: "+="+zoom+"%", height: "+="+zoom+"%"},{duration:1});
			}
		}
	}
}

function showcaptchaeffect() {
	if(captchaid != ""){
		if(captchas[captchaid].text == 1 || captchas[captchaid].mouse == 1 || captchas[captchaid].multimouse == 1 || captchas[captchaid].rotate == 1){
			if(captchas[captchaid].text == 1){
				captchazoom(1);
			}

			if(captchas[captchaid].text == 1 || captchas[captchaid].mouse == 1 || captchas[captchaid].multimouse == 1 || captchas[captchaid].rotate == 1){
				if($('#grau').is(':checked') == true && captchaid != move1used){
					grayscale($("#captchaimage"));
					move1used = captchaid;
				}
			}

			if(captchas[captchaid].text == 1){
				if($('#flip').is(':checked') == true && captchaid != move2used){
					$("#captchaimage").rotate(180);
					move2used = captchaid;
				}

				if($('#mirror').is(':checked') == true && captchaid != move3used){
					$("#captchaimage").rotate3Di('flip', 100);
					move3used = captchaid;
				}
			}
		}
	}
}

function userselect_check(selectdata){
	if(selectdata == "interactivecaptcha"){
		if($('#'+selectdata).is(':checked') == true && interactive_ok == 1){
			return("1");
		}else{
			return("0");
		}
	}else if(selectdata == "interactivecaptchaserver"){
		if($('#interactivecaptcha').is(':checked') == true){
			return("1");
		}else{
			return("0");
		}
	}else if(selectdata == "textcaptcha_word"){
		if($('#textcaptcha').is(':checked') == true){
			return("yes");
		}else{
			return("no");
		}
	}else{
		if($('#'+selectdata).is(':checked') == true){
			return("1");
		}else{
			return("0");
		}
	}
}

function showcaptchasave() {
	var newsaveobj = {
		apikey: apikey, 
		speed: userselect_check('speed'), 
		speedlevel: $("#speedlevel").val(), 
		refresh: userselect_check('refresh'), 
		rotateselect: userselect_check('rotatecaptcha'), 
		audioselect: userselect_check('audiocaptcha'), 
		puzzleselect: userselect_check('puzzlecaptcha'), 
		interactiveselect: userselect_check('interactivecaptcha'), 
		textonlyselect: userselect_check('textonlycaptcha'), 
		autostart: userselect_check('autostart'), 
		zoom: $("#zoomdata").val(),
		widthc: $("#widthc").val(),
		heightc: $("#heightc").val(),
		mirror: userselect_check('mirror'), 
		flip: userselect_check('flip'), 
		startpre: userselect_check('startpre'), 
		rc2audio: userselect_check('rc2audio'), 
		sound: userselect_check('sound'), 
		popup: userselect_check('popup'), 
		grau: userselect_check('grau'), 
		textselect: userselect_check('textcaptcha'), 
		mouseselect: userselect_check('mousecaptcha'), 
		multimouseselect: userselect_check('multimousecaptcha'), 
		confirmselect: userselect_check('confirmcaptcha'), 
		desktopinfo: userselect_check('desktopinfo'), 
		time: $.now(), source: "solve9kwcaptcha"
	};

	$.ajax({
		type: "POST",
		async: true,
		cache: false,
		url: "http://127.0.0.1:12345/save/settings/",
		data: {jsondata: JSON.stringify(newsaveobj)},
		dataType: 'json',
		//success: function(newsaveobj) {alert("Save Success! Saved Settings: " + JSON.stringify(newsaveobj));},
		//error: function(jqXHR, textStatus, errorThrown) {alert("Error! Saved Settings should be: "+ JSON.stringify(newsaveobj) +" status: "+jqXHR.status); alert(errorThrown);}
	});
}

function nextrotate (element,angle,way){
	var newrotate = 0;
	if(element.getRotateAngle() != ""){
		newrotate = parseInt(element.getRotateAngle());
	}
	if(way == 1){
		newrotate += angle;
	}else{
		newrotate -= angle;
	}
	element.rotate({angle: newrotate});
	$("#input_text").val(newrotate);
}

$(document).ready(function() {
	$(function(){
		var idleTimer;
		function resetTimer(){
			clearTimeout(idleTimer);

			idleSecondsCheck = idleSeconds;
			$("#timertimebad").html('Inactive in '+idleSecondsCheck+' seconds');

			idleTimer = setTimeout(whenUserIdle,idleSeconds*1000);
		}
		$(document.body).bind('mousemove keydown click touchstart touchmove mouseleave mousewheel DOMMouseScroll mousedown',resetTimer);
		$("#input_text").bind('mousemove keydown click touchstart touchmove mouseleave mousewheel DOMMouseScroll mousedown',resetTimer);
		resetTimer();
	});

	function whenUserIdle(){
		totalstop = 1;
		stopit = 1;
		captchastop();
	}

	$("#captchatrue").click(function(){
		$("#input_text").val("yes");
		captchasend();
	});

	$("#captchafalse").click(function(){
		$("#input_text").val("no");
		captchasend();
	});

	$('#input_text').keyup(function(e){
		if(e.keyCode == 13){
			captchasend();
		}
	});

	$('#captchasend1').click(function() {
		captchasend();
	});

	$('#captchasend2').click(function() {
		captchasend();
		totalstop = 1;
		stopit = 1;
		captchastop();
	});

	$('#captchasendempty').click(function() {
		captchasendempty();
	});

	$('#captchaskipinteractive').click(function() {
		captchaskip();
	});

	$('#captchaskip').click(function() {
		captchaskip();
	});

	$(document).keyup(function(e) { 
		if (e.which === 27){
			captchaskip();
		}
	});

	$('#captchastart').click(function() {
		if(apikey != ""){
			totalstop = 0;
			stopit = 0;
			captchastart();
		}else{
			alert("No apikey found.");
		}
	});

	$('#captchastop').click(function() {
		totalstop = 1;
		stopit = 1;
		captchastop();
	});

	$(window).unload( 
		function(){ 
			totalstop = 1;
			captchastop();
		} 
	);

	$("#popup:checkbox").click(function() {
		showcaptchasave();
	});

	$("#rc2pre:checkbox").click(function() {
		showcaptchasave();
	});

	$("#startpre:checkbox").click(function() {
		showcaptchasave();
	});

	$("#sound:checkbox").click(function() {
		showcaptchasave();
	});

	$("#refresh:checkbox").click(function() {
		showcaptchasave();
	});

	$("#grau:checkbox").click(function(){
		if(captchaid != ""){
			if(captchas[captchaid].text == 1 || captchas[captchaid].rotate == 1 || captchas[captchaid].mouse == 1 || captchas[captchaid].multimouse == 1){
				if($('#grau').is(':checked') == true){
					grayscale($("#captchaimage"));
				}
			}
		}
		showcaptchasave();
	});

	$("#flip:checkbox").click(function() {
		if(captchaid != ""){
			if(captchas[captchaid].text == 1){
				if($('#flip').is(':checked') == true){
					$("#captchaimage").rotate(180);
				}else{
					$("#captchaimage").rotate(0);
				}
			}
		}
		showcaptchasave();
	});

	$("#mirror:checkbox").click(function(){
		if(captchaid != ""){
			if(captchas[captchaid].text == 1){
				if($('#mirror').is(':checked') == true){
					$("#captchaimage").rotate3Di('flip', 100);
				}else{
					$("#captchaimage").rotate3Di('unflip', 100);
				}
			}
		}
		showcaptchasave();
	});

	$("#textcaptcha:checkbox").click(function() {
		showcaptchasave();
	});

	$("#mousecaptcha:checkbox").click(function() {
		showcaptchasave();
	});

	$("#multimousecaptcha:checkbox").click(function() {
		showcaptchasave();
	});

	$("#textonlycaptcha:checkbox").click(function() {
		showcaptchasave();
	});

	$("#rotatecaptcha:checkbox").click(function() {
		showcaptchasave();
	});

	$("#audiocaptcha:checkbox").click(function() {
		showcaptchasave();
	});

	$("#puzzlecaptcha:checkbox").click(function() {
		showcaptchasave();
	});

	$("#interactivecaptcha:checkbox").click(function() {
		showcaptchasave();
	});

	$("#confirmcaptcha:checkbox").click(function() {
		showcaptchasave();
	});

	$("#desktopinfo:checkbox").click(function() {
		if($('#desktopinfo').is(':checked') == true){
			if(typeof Notification === 'function'){ 
				showNotifications();
				showcaptchasave();
			}else{
				alert('Your browser does not support Web Notifications API.');
			}
		}
		showcaptchasave();
	});

	$("#speed:checkbox").click(function() {
		showcaptchasave();
	});

	$("#speedlevel").change(function() {
		showcaptchasave();
	});

	$("#autostart:checkbox").click(function() {
		showcaptchasave();
	});

	$("#zoomdata").change(function(){
		showcaptchasave();

		if(captchaid != ""){
			if(captchas[captchaid].text == 1){
				captchazoom(0);
			}
		}
	});

	function CheckFunc(){
		roundTimeout++;

		idleSecondsCheck -= 1;
		$("#timertimebad").html('Inactive in '+idleSecondsCheck+' seconds');

		if(stopit == 0){
			for(var i = 0; i <= $("#speedlevel").val(); i++){
				if(userselect_check('speed') == "1" || userselect_check('speed') == "0" && captchaid == ""){
					if(statusdata[i] != 1){
						$.ajax({
							url: 'https://www.9kw.eu/index.cgi/index.cgi',
							async: true,
							cache: false,
							type: 'GET',
							data: {action: "usercaptchanew", moretimes: 1, version: version, apikey: apikey, json: "1", speed: userselect_check('speed'), speedlevel: i, base64: "1", filedata: "1", withok: "1", proxy: "0", rotate: userselect_check('rotatecaptcha'), audio: userselect_check('audiocaptcha'), puzzle: userselect_check('puzzlecaptcha'), interactive: userselect_check('interactivecaptcha'), textonly: userselect_check('textonlycaptcha'), text: userselect_check('textcaptcha_word'), mouse: userselect_check('mousecaptcha'), multimouse: userselect_check('multimousecaptcha'), confirm: userselect_check('confirmcaptcha'), source: "solve9kwcaptcha", time: $.now()},
							dataType: 'json',
							timeout: 5000,
							retryCount: 0,
							retryLimit: 5,
							retryTimeout: 5000,
							created: Date.now(),
							success: function(data, textStatus, request){
								if(request.status == 200){
									try {
										if(data.captchaid.match(/^\d+$/)){
											var d = new Date();
											var n = d.getTime();
											data['newtimeout'] = n;
											captchas[data.captchaid] = data;
											statuscaptcha[data.captchaid] = 0;
											statuscaptchadate[data.serverdate] = data.captchaid;
											statusdata[data.speedlevel] = 1;
											captchatry = 1;
										}
									}catch(e){}
								}else{
									this.retryCount++;
									if(this.retryCount <= this.retryLimit && Date.now() - this.created < this.retryTimeout){
										return($.ajax(this));
									}
								}
							},
							error: function(xhr, textStatus, errorThrown){
								this.retryCount++;
								if(this.retryCount <= this.retryLimit && Date.now() - this.created < this.retryTimeout){
									return($.ajax(this));
								}
							}
						});
					}
				}
			}
		}

		if(captchaid != "" && stopit == 0 && captchatry == 1){
			var countdown_startwert = 0;
			var alter1 = parseInt(captchas[captchaid].serverdate) - parseInt(captchas[captchaid].startdate);
			if(parseInt(captchas[captchaid].maxtimeout) - alter1 <= parseInt(captchas[captchaid].timeout)){
				countdown_startwert = parseInt(captchas[captchaid].maxtimeout) - alter1;
			}else{
				var alter2 = parseInt(captchas[captchaid].serverdate) - parseInt(captchas[captchaid].userstart);
				countdown_startwert = parseInt(captchas[captchaid].timeout) - alter2;
			}
			var d = new Date();
			var n = d.getTime();
			countdown_startwert -= Math.round(parseInt(parseInt(n) - parseInt(captchas[captchaid].newtimeout))/1000);

			var my_progress = parseInt((parseInt(countdown_startwert) / parseInt(captchas[captchaid].timeout)) * 100);
			$("#progressbar").progressbar({value: my_progress});
			$(".progress-label").text(countdown_startwert+' seconds');

			if(captchanext == 0 || countdown_startwert == 0 || countdown_startwert < 0 || missedcaptcha > 5){
				captchatry = 0;
				$("#progressbar").progressbar({value: 100})
				missedcaptcha += 1;
				$("#missedcaptcha_header").html("Missed: "+missedcaptcha);

				if(countdown_startwert < 0 && missedcaptcha < 5 || captchanext > 10 && countdown_startwert < 3 && missedcaptcha < 5){
					captchaskip();
				}else{
					missedcaptcha = 0;
					totalstop = 2;
					captchastop();
				}
			}else{
				if(captchas[captchaid].interactive == 1){				
					//這裡輸入取得的captcha answer並send出去
					var answerforcaptcha = CheckCaptchaAnswer();
					if(answerforcaptcha!="1")
					{
						$("#input_text").val(answerforcaptcha);
						captchasend();						
					}
				}
			}

			if(captchanext > 0){
				captchanext -= 1;
			}
		}
		fooTimeout = setTimeout(CheckFunc, 1000);
	}

	function CheckShow(){
		apikey = $("#apikey").val();

		if(stopit == 0){
			//for(key in statuscaptcha){
			Object.keys(statuscaptchadate).sort().forEach(function(newkey, i){//.reverse()
				var key = statuscaptchadate[newkey];

				for(var ix = 0; ix < 1; ix++){
					if(statuscaptcha[key] == 0 && captchaid == "" && captchas[key].captchaid.match(/^\d+$/)){
						statuscaptcha[key] = 1;
						statusdata[captchas[key].speedlevel] = 0;
						captchaid = captchas[key].captchaid;
						if(captchas[key].withok == "1"){
							usercaptchanewok();
						}

						$("#captchasandbox").hide();
						$("#captchamath").hide();
						$("#captchaphrase").hide();
						$("#captchanospace").hide();
						$("#captchalength").hide();
						$("#captchachars").hide();
						$("#captchatype").hide();

						if($('#sound').is(':checked') == true){
							play_sound();

						}
						
						if($('#vibration').is(':checked') == true)
						{
							startVibrate();	
						}						

												
						if($('#popup').is(':checked') == true){
							play_popup();
						}
						if($('#desktopinfo').is(':checked') == true){
							showNotifications();
						}

						$("#input_text").show();
						$("#captchasend").show();
						$("#captchaskip").show();
						$("#captchaskipinteractive").hide();

						$("#mycaptcha").html("");
						$("#captchaidsize").html("");
						$("#textthing").hide();
						$("#usercaptchatext").hide();
						$("#progressbar2").hide();

						$("#captchasendempty").hide();
						$("#emptything").hide();

						$("#interactivecaptchahtml").hide();
						$("#confirmcaptchahtml").hide();
						$("#puzzlecaptchahtml").hide();
						$("#audiocaptchahtml").hide();
						$("#imagecaptchahtml").hide();

						if(captchas[key].textinstructions.length > 0){
							$("#textthing").html(multiLineHtmlEncode(captchas[key].textinstructions)+"<br>\n");
							$("#textthing").show();
						}else{
							$("#textthing").hide();
						}

						captchanext = captchas[key].timeout;
						if(captchas[key].audio != 1 && captchas[key].interactive != 1 && captchas[key].textonly != 1){
							$("#captchaidsize").html('('+captchas[key].width+"x"+captchas[key].height+')');
						}else{
							$("#captchaidsize").html('');
						}
						$("#mycaptcha").html("Current Captcha "+captchas[key].captchaid);
						$("#input_text").val("");

						if(
							captchas[key].oldsource == "recaptchav2" && captchas[key].text == 1 ||
							captchas[key].oldsource == "recaptchav2" && captchas[key].mouse == 1 || 
							captchas[key].oldsource == "recaptchav2" && captchas[key].multimouse == 1
						){
							$("#captchasendempty").show();
							$("#emptything").show();
						}else{
							$("#emptything").hide();
							$("#captchasendempty").hide();
						}
						$("#usercaptchaget").hide();

						var new_captchapic = "";
						if(captchas[key].confirm == 1 && captchas[key].interactive != 1){
							new_captchapic += "https://www.9kw.eu/index.cgi?action=usercaptchashow&id="+captchas[key].captchaid;
						}else{
							if(captchas[key].file1 == ""){
								new_captchapic = captchas[key].file1;
							}else{
								new_captchapic = "https://www.9kw.eu/grafik/captchas/"+captchas[key].captchaid+".txt";
							}
						}

						if(captchas[key].text == 1){
							$("#captchatype").show();
							$("#captchatype").html('Text');

							$("#input_text").show();
							$("#input_text").focus();
							$("#imagecaptchahtml").show();
							$("#imagecaptchahtml").html('<img src="'+new_captchapic+'" id="captchaimage" border="0">');

							$('#captchaimage').load(function() {
								showcaptchaeffect();
							});

							if(captchas[key].textinstructions.length == 0){
								$("#textthing").html("Please enter the captcha as text.<br>\n");
								$("#textthing").show();
							}
						}else if(captchas[key].mouse == 1 || captchas[key].multimouse == 1){
							$("#input_text").hide();
							$("#imagecaptchahtml").show();
							$("#captchatype").show();
							$("#captchasend").hide();
							if(captchas[key].multimouse == 1){
								if(captchas[key].textinstructions.length == 0){
									$("#textthing").html("Please enter the captcha with multiple clicks and then press OK.<br>\n");
									$("#textthing").show();
								}

								$("#captchatype").html('2+ clicks');
								$("#imagecaptchahtml").html('<img src="'+new_captchapic+'" id="captchaimage" border="0" style="cursor:crosshair;" onclick="getPos(event,\'2\');">');
							}else{
								if(captchas[key].textinstructions.length == 0){
									$("#textthing").html("Please enter the captcha with one click.<br>\n");
									$("#textthing").show();
								}

								$("#captchatype").html('1 click');

								$("#imagecaptchahtml").html('<img src="'+new_captchapic+'" id="captchaimage" border="0" style="cursor:crosshair;" onclick="getPos(event,\'1\');">');
								$("#captchasend").hide();
							}

							$('#captchaimage').load(function() {
								showcaptchaeffect();
							});
						}else if(captchas[key].interactive == 1){
							$("#captchaskip").hide();
							$("#captchaskipinteractive").show();

							if(captchas[key].textinstructions.length == 0){
								$("#textthing").html("Please enter the captcha as like a normal web page, then press OK.<br>\n");
								$("#textthing").show();
							}

							$("#captchatype").show();
							$("#captchatype").html('Interactive');

							if(interactive_ok == 1){
								$("#captchasend").hide();
								$("#input_text").hide();
								$("#interactivecaptchahtml").show();
								var rcv2_js_new = 'script';
								var rcv2_js = "<"+rcv2_js_new+" src='https://www.google.com/recaptcha/api.js' async defer></"+rcv2_js_new+">";
								var preselect = "image";
								if($("#rc2audio").is(':checked') == true){
									preselect = "audio";
								}
								var rcv2_thing1 = rcv2_js+'<'+rcv2_js_new+' type="text/javascript">var correctCaptcha = function(response){var xhr = new XMLHttpRequest();xhr.open("POST", "http://127.0.0.1:12345/save/captchaanswer", true);xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");xhr.send(JSON.stringify({answer: response}));};</'+rcv2_js_new+'><form action="" name="send" method="GET"><div data-callback="correctCaptcha" id="rc" class="g-recaptcha" data-type="'+preselect+'" data-sitekey="'+captchas[key].sitekey+'"></div><noscript><p>Javascript is required!</p></noscript></form>';
								if(captchas[key].oldsource == "funcaptcha"){
									rcv2_thing1 = '<form action="http://127.0.0.1:80/save/funcaptcha" name="myForm" id="myForm" method="post">';
									//rcv2_thing1 = '<'+rcv2_js_new+' type="text/javascript">function correctCaptcha(response){var xhr = new XMLHttpRequest();xhr.open("POST", "http://127.0.0.1:12345/save/captchaanswer", true);xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");xhr.send(JSON.stringify({answer: response}));};</'+rcv2_js_new+'>';
									rcv2_thing1 += '<'+rcv2_js_new+' type="text/javascript">';
									rcv2_thing1 += 'function loadFunCaptcha() {new FunCaptcha({public_key: "'+captchas[key].sitekey+'",callback: function(){document.getElementById("myForm").submit();}});}';
									rcv2_thing1 += '</'+rcv2_js_new+'>';
									rcv2_thing1 += '<'+rcv2_js_new+' src="http://funcaptcha.com/fc/api/?onload=loadFunCaptcha" async defer></'+rcv2_js_new+'>';
									rcv2_thing1 += '<div id="funcaptcha" data-pkey="'+captchas[key].sitekey+'"></div>';
									rcv2_thing1 += '<no'+rcv2_js_new+'>';
									rcv2_thing1 += '<iframe src="https://funcaptcha.com/fc/api/nojs/?pkey='+captchas[key].sitekey+'" frameborder="0" scrolling="no" style="width: 308px; height:408px; border-style: none;"></iframe>';
									rcv2_thing1 += '<div style="width: 306px;height: 60px;border-style: none;bottom: 12px;left: 25px;margin: 5px 0 0 0;padding: 0px;right: 25px;background: #ffffff;border: 1px solid #f7f7f7;border-radius: 5px;">';
									rcv2_thing1 += '<input type="text" id="fc-token" name="fc-token" style="width: 270px;">';
									rcv2_thing1 += '</div>';
									rcv2_thing1 += '</no'+rcv2_js_new+'>';
									//rcv2_thing1 += '<'+rcv2_js_new+' type="text/javascript">setInterval(function() {if(document.getElementById("fc-token").value.length > 0){correctCaptcha(document.getElementById("fc-token").value);}}, 300);</'+rcv2_js_new+'>';
									rcv2_thing1 += '</form>';
								}else if(captchas[key].oldsource == "coincaptcha"){
									rcv2_thing1 = '<'+rcv2_js_new+' type="text/javascript">function correctCaptcha(response){var xhr = new XMLHttpRequest();xhr.open("POST", "http://127.0.0.1:12345/save/captchaanswer", true);xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");xhr.send(JSON.stringify({answer: response}));};</'+rcv2_js_new+'>';
									rcv2_thing1 += '<'+rcv2_js_new+' src="https://authedmine.com/lib/captcha.min.js" async></'+rcv2_js_new+'>';
									if(captchas[key].hasOwnProperty('hashes')){
										rcv2_thing1 += '<div class="coinhive-captcha" data-hashes="'+captchas[key].hashes+'" data-key="'+captchas[key].sitekey+'"></div>';
									}else{
										rcv2_thing1 += '<div class="coinhive-captcha" data-hashes="1024" data-key="'+captchas[key].sitekey+'"></div>';
									}
									rcv2_thing1 += '<'+rcv2_js_new+' type="text/javascript">setInterval(function() {if(document.getElementsByName("coinhive-captcha-token")[0].value.length > 0){correctCaptcha(document.getElementsByName("coinhive-captcha-token")[0].value);}}, 300);</'+rcv2_js_new+'>';
								}
								var newpageurl = captchas[key].pageurl;
								if(newpageurl == "__undefined__"){
									newpageurl = "";
								}
								if(newpageurl.match("https://") || newpageurl.match("http://"))
									{newpageurl = newpageurl;}
								else if(newpageurl.length > 5)
									{newpageurl = "http://"+newpageurl;}
								
								var newuseragent = captchas[key].useragent;
								if(newuseragent == "__undefined__"){
									newuseragent = "";
								}else if(newuseragent.length > 5){
									newuseragent = " nwUserAgent=\""+newuseragent+"\"";
								}else{
									newuseragent = "";
								}
								var newcookies = captchas[key].cookies;
								if(newcookies == "__undefined__" && newcookies.length < 5){
									newcookies = "";
								}
								
								//這邊放inappbrowser to show reCaptcha
								openfreebitcoin(newpageurl, captchas[key].sitekey);
								
								
							}else{
								lognumber++;
								logdata = captchaid + ": " + "No interactive mode found." + "<br>\n" + logdata;
								$("#userlog").html(logdata);
								$("#logname").html("Log ("+lognumber+")");
								totalstop = 1;
								stopit = 1;
								captchastop();
								break;
							}
						}else if(captchas[key].puzzle == 1){
							if(captchas[key].textinstructions.length == 0){
								$("#textthing").html("Please enter the captcha as puzzle and then press OK.<br>\n");
								$("#textthing").show();
							}

							$("#captchatype").show();
							$("#captchatype").html('Puzzle');

							$("#input_text").hide();
							$("#puzzlecaptchahtml").show();
							maximages = captchas[key].files;
							showPuzzle();
						}else if(captchas[key].audio == 1){
							if(captchas[key].textinstructions.length == 0){
								$("#textthing").html("Please listen the captcha, enter it as text enter and then press OK.<br>\n");
								$("#textthing").show();
							}

							$("#captchatype").show();
							$("#captchatype").html('Audio');

							$("#input_text").show();
							$("#input_text").focus();
							$("#audiocaptchahtml").show();
							$("#audiocaptchahtml").html('<audio id="nextsoundplaycaptcha" autobuffer="autobuffer" autoplay="autoplay" controls="controls" preload="auto"><source src="'+captchas[key].file1.replace('image/png', 'audio/mp3')+'"></audio>');
						}else if(captchas[key].rotate == 1){
							if(captchas[key].textinstructions.length == 0){
								$("#textthing").html("Please enter the captcha with rotate the picture and then press OK.<br>\n");
								$("#textthing").show();
							}

							$("#captchatype").show();
							$("#captchatype").html('Rotate');

							$("#input_text").hide();
							$("#imagecaptchahtml").show();
							if(captchas[key].confirm == 1){
								if(captchas[key].mouse == 1 || captchas[key].multimouse == 1){
									$("#imagecaptchahtml").html('<img src="https://www.9kw.eu/index.cgi/index.cgi?action=usercaptchashow&time='+$.now()+'&source=solve9kwcaptcha&id='+captchas[key].captchaid+'" style="z-index: -2000;" id="captchaimage" border="0">');
								}else{
									$("#imagecaptchahtml").html('<img src="'+new_captchapic+'" style="z-index: -2000;" id="captchaimage" border="0">');
								}
								$("#captchaimage").rotate({angle: captchas[key].captchakey});
							}else{
								$("#imagecaptchahtml").html('<img src="'+new_captchapic+'" style="z-index: -2000;" id="captchaimage" border="0"><br><br><input type="button" onclick="nextrotate($(\'#captchaimage\'),'+captchas[key].angle+',0);" value="&lt;&lt; Left"> - <input type="button" onclick="nextrotate($(\'#captchaimage\'),'+captchas[key].angle+',1);" value="Right &gt;&gt;">');
							}

							$('#captchaimage').load(function() {
								showcaptchaeffect();
							});
						}else if(captchas[key].textonly == 1){
							if(captchas[key].textinstructions.length == 0){
								$("#textthing").html("Read the text and enter a suitable answer and then press OK.<br>\n");
								$("#textthing").show();
							}

							$("#captchatype").show();
							$("#captchatype").html('Textonly');

							var Re = new RegExp("\n","g");
							var new_usertext = multiLineHtmlEncode($.base64.decode(captchas[key].file1.replace('data:image/png;base64,',''))).replace(Re,"<br>\n");
							$("#textthing").html(multiLineHtmlEncode(captchas[key].textinstructions)+"<br>\n<br>\n"+new_usertext);
							$("#input_text").show();
							$("#input_text").focus();
						}else{
							totalstop = 1;
							stopit = 1;
							alert("Unknown captcha "+captchas[key].captchaid+".");
							captchastop();
							break;
						}

						if(captchas[key]["case-sensitive"] > 0){
							$("#captchacase").show();
						}else{
							$("#captchacase").hide();
						}

						if(captchas[key]["min"+string95+"length"] > 0 && captchas[key]["max"+string95+"length"] > 0 && captchas[key]["min"+string95+"length"] == captchas[key]["max"+string95+"length"]){
							$("#captchachars").html(captchas[key]["min"+string95+"length"]+' chars');
							$("#captchalength").show();
						}else if(captchas[key]["min"+string95+"length"] > 0 && captchas[key]["max"+string95+"length"] > 0){
							$("#captchachars").html(captchas[key]["min"+string95+"length"]+'-'+captchas[key]["max"+string95+"length"]+' chars');
							$("#captchalength").show();
						}else if(captchas[key]["min"+string95+"length"] > 0){
							$("#captchachars").html(captchas[key]["min"+string95+"length"]+'+ chars');
							$("#captchalength").show();
						}else if(captchas[key]["max"+string95+"length"] > 0){
							$("#captchachars").html('1-'+captchas[key]["max"+string95+"length"]+' chars');
							$("#captchalength").show();
						}else{
							$("#captchalength").hide();
						}

						if(captchas[key].math > 0){
							$("#captchamath").show();
						}else{
							$("#captchamath").hide();
						}

						if(captchas[key].phrase > 0){
							$("#captchaphrase").show();
						}else{
							$("#captchaphrase").hide();
						}

						if(captchas[key].nospace > 0){
							$("#captchanospace").show();
						}else{
							$("#captchanospace").hide();
						}

						if(captchas[key].selfsolve > 0 || usersandboxfull == 1 || usersandboxlight == 1){
							$("#captchasandbox").show();
						}else{
							$("#captchasandbox").hide();
						}

						if(captchas[key].numeric > 0){
							$("#captchachars").show();

							if(captchas[key].numeric == 1){
								$("#captchachars").html('0-9');
							}else if(captchas[key].numeric == 2){
								$("#captchachars").html('A-Z a-z');
							}else if(captchas[key].numeric == 3){
								$("#captchachars").html('0-9 A-Z a-z');
							}else if(captchas[key].numeric == 4){
								$("#captchachars").html(', 0-9 A-Z a-z');
							}else{
								$("#captchachars").hide();
							}
						}else{
							$("#captchachars").hide();
						}

						if(captchas[key].interactive != 1){
							if(captchas[key].confirm == 1){
								$("#captchatype").show();
								$("#captchatype").html('Confirm');

								$("#confirmcaptchahtml").show();

								$("#input_text").hide();
								$("#captchasend").hide();
								$("#confirmcaptchahtml").show();
								$("#confirmcaptchadata").html(' '+captchas[key].captchakey+' ');

								$("#captchasendempty").hide();
								$("#emptything").hide();
							}
						}
						break;
					}
				}
			//}
			});

			if(captchaid == ""){
				var newloadtext = "";
				if(serverqueue < 10 || usersandboxfull != "" || usersandboxlight != ""){
					if(serverqueue < 10 && usersandboxfull == "" && serverqueue != ""){
						newloadtext += "Only "+serverqueue+" captcha(s) for all worker in our serverqueue. <br>\nIncreased waiting time possible.<br>\n<br>\n";
					}

					if(usersandboxfull == 1){
						newloadtext += "<font color=red>Warning:</font> <br>\nUnder Settings (userconfig) is your Sandbox Mode (Selfonly) active.<br>\nOnly own captchas!<br>\n<br>\n";
					}
					if(usersandboxlight == 1 && usersandboxfull == ""){
						newloadtext += "Note: <br>\nUnder Settings (userconfig) is your Sandbox (Light) Mode (Selfsolve) active. <br>\nOwn and other captchas!<br>\n<br>\n";
					}
				}
				newloadtext += "Captcha is loading...";
				$("#usercaptchatext").html(newloadtext);
				$("#usercaptchatext").show();
			}else{
				$("#usercaptchatext").hide();
			}
		}
		fooTimeout2 = setTimeout(CheckShow, 350);
	}

	$("#progressbar").bind('progressbarchange', function(event, ui) {
		var selector = "#" + this.id + " > div";
		var value = this.getAttribute("aria-valuenow");
		if(value < 20){
			$(selector).css({ 'background': 'Red'});
		}else if (value < 40){
			$(selector).css({ 'background': 'Orange'});
		}else if (value < 60){
			$(selector).css({ 'background': 'Yellow'});
		}else if (value < 90){
			$(selector).css({ 'background': 'LightGreen'});
		}else{
			$(selector).css({ 'background': 'Silver'});
		}
	});

	function CheckServer(){
		if(userselect_check('refresh') == "1"){
			if(apikey != ""){
				$.ajax({
					url: 'https://www.9kw.eu/index.cgi/index.cgi',
					async: true,
					cache: false,
					type: 'GET',
					data: {action: "usercaptchahistory", htmlonly: "1", apikey: apikey, time: $.now(), source: "solve9kwcaptcha"},
					dataType: 'text',
					timeout: 5000,
					created: Date.now(),
					success: function(data, textStatus, request){
						if(request.status == 200){
							if(data != ""){
								$("#userhistory").html(data);
							}
						}
					}
				});
			}

			$.ajax({
				url: 'https://www.9kw.eu/grafik/servercheck.json',
				async: true,
				cache: false,
				type: 'GET',
				data: {source: "solve9kwcaptcha", time: $.now()},
				dataType: 'json',
				timeout: 5000,
				created: Date.now(),
				success: function(data, textStatus, request){
					if(request.status == 200){
						$("#useronline_header").html("User online: "+data.useronline);
						$("#newuser24h_header").html("New users in 24h: "+data.newuser24h);
						$("#totalcaptcha").html("Captchas Need to be Solved: "+data.queue);
						$("#recaptchanumber").html("Number of reCaptcha: "+data.queueinteractive);
						if(data.ninekwclientversion != version){
							$("#newupdate").show();
						}
						serverqueue = data.queue;
					}
				}
			});

			if(apikey != ""){
				$.ajax({
					url: 'https://www.9kw.eu/index.cgi',
					async: true,
					cache: false,
					type: 'GET',
					data: {action: "userconfig", apikey: apikey, json: "1", source: "solve9kwcaptcha", time: $.now()},
					dataType: 'json',
					timeout: 5000,
					created: Date.now(),
					success: function(data, textStatus, request){
						if(request.status == 200){
							if(data.credits != ""){
								credits = data.credits;
								$("#guthaben").html('Credits: '+credits);
							}

							if(data.selfonly == 1){
								usersandboxfull = data.selfonly;
								$("#captchasandbox").html('Sandbox');
							}
							if(data.selfsolve == 1){
								usersandboxlight = data.selfsolve;
								$("#captchasandbox").html('Sandbox (Light)');
							}
						}
					}
				});
			}
		}

		fooTimeout3 = setTimeout(CheckServer, 6000);
	}

    $( "#draggable1" ).draggable({ containment: "#containment-wrapper", scroll: false });
	$( "#draggable2" ).draggable({ containment: "#containment-wrapper", scroll: false });
	$( "#draggable3" ).draggable({ containment: "#containment-wrapper", scroll: false });
	$( "#draggable4" ).draggable({ containment: "#containment-wrapper", scroll: false });
	$( "#draggable5" ).draggable({ containment: "#containment-wrapper", scroll: false });
	$( "#draggable6" ).draggable({ containment: "#containment-wrapper", scroll: false });
   
	$("#captchaskip").prop("disabled",true);
	$("#captchasend1").prop("disabled",true);
	$("#captchasend2").prop("disabled",true);
	$("#captchastop").prop("disabled",true);
	$("#captchastart").prop("disabled",false);

	if($('#autostart').is(':checked') == true){
		if(apikey != ""){
			totalstop = 0;
			stopit = 0;
			captchastart();
		}else{
			alert("No apikey found.");
		}
	}
	//$(document).tooltip({track: true});

	
	$('#progressbar').css('width', "220px");
	$('#progressbar').css('height', "30px");
	$("#progressbar").progressbar({value: 100});
	$(".progress-label").text('? seconds');

	$("#progressbar2").progressbar({value: 100});
	$('#progressbar2').css('width', "220px");
	$('#progressbar2').css('height', "30px");
	$('#progressbar2 .ui-progressbar-value').css('background-image', "url(\"https://www.9kw.eu/grafik/loading.gif\")");
	$('#progressbar2 .ui-progressbar-value').css('height', "30px");
	$('#progressbar2 .ui-progressbar-value').css('opacity', "0.25");
	$('#progressbar2 .ui-progressbar-value').css('filter', "alpha(opacity=25)");
	
	
	//fooTimeout = setTimeout(function(){  }, 1000);
	fooTimeout = setTimeout(CheckFunc, 1000);
	fooTimeout2 = setTimeout(CheckShow, 500);
	fooTimeout3 = setTimeout(CheckServer, 500);
});

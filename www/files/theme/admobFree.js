var i =0;
var admobid = {};
if ( /(android)/i.test(navigator.userAgent) ) {  // for android & amazon-fireos 
  admobid = {
    banner: 'ca-app-pub-9991524825258880/7422844352',
    interstitial: 'ca-app-pub-9991524825258880/2569493993',
  };
} else if ( /(ipod|iphone|ipad)/i.test(navigator.userAgent) ) {  // for ios 
  admobid = {
    banner: 'ca-app-pub-9991524825258880/4960332548',
    interstitial: 'ca-app-pub-9991524825258880/1934660053',
  };
} else {  // for windows phone 
  admobid = {
    banner: 'ca-app-pub-9991524825258880/7422844352',
    interstitial: 'ca-app-pub-9991524825258880/2569493993',
  };
}

document.addEventListener('deviceready', function() {
  admob.banner.config({
    id: admobid.banner,
    isTesting: false,
    autoShow: true,
  })
  admob.banner.prepare()

  admob.interstitial.config({
    id: admobid.interstitial,
    isTesting: false,
    autoShow: false,
  })
  admob.interstitial.prepare()
	 
	 document.addEventListener
	 (
		'onReceiveInterstitialAd', 
		function() 
		{
			if(i<1)
			{admob.interstitial.show(); i++;}
		}
	 );

  
}, false)

document.addEventListener('admob.banner.events.LOAD_FAIL', function(event) {
  console.log(event)
})

document.addEventListener('admob.interstitial.events.LOAD_FAIL', function(event) {
  console.log(event)
})

document.addEventListener('admob.interstitial.events.LOAD', function(event) {
  console.log(event)
})

document.addEventListener('admob.interstitial.events.CLOSE', function(event) {
  console.log(event)

  admob.interstitial.prepare()
})

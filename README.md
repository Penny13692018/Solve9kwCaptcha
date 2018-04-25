# Solve9kwCaptcha 被蟲賺點數app [![bitHound Score][bithound-img]][bithound-url]

Changes in Version 1.2.5
Available for solving reCaptcha
Removed redundant settings such as audio for reCaptcha (not available for mobile), standard reset.
Files changed--changed contents:
index.html--Statements about reCaptcha.
settings.html--Statements about reCaptcha. Audio choice and standard setting choice are removed.
solve-captcha.html--Refer inappbrowser.js code to show reCaptcha.
tutor-2001325991259452341665289.html--Statements about help needed by Comforterworm.

getAllSettings.js--Code of removed settings.
devicecheck.js--Available for reCaptcha, not mobile version lock.
inappbrowser.js--For showing reCaptcha.
9kw.js--For showing reCaptcha. See line 1079 and line 1315.

Version 1.2.5 版本變動
Google"我不是機器人驗證"可以使用了!並移除了一些無用的設定。
相關文件更動請見上方英文說明，被蟲懶得再打一次中文版~

The app is built by replacing the www files in PhoneGap Hello World template with Comforterworm website.
這個app是用PhoneGap的Hello Wolrd，把www資料夾裡面的東西用comforterworm web版的資源塞進去。

Small changes like admob and cordova vibration plugins are added.
為了賺$，棉被蟲將web版塞到模板後，還插入了廣告插件。並且發現cordova的震動插件可以讓Android之外的手機震動，
故也插入了cordova震動插件。

Comforterworm website source link: (English)
https://drive.google.com/file/d/1bamNPFcKpBdeyqx1_enkOp95Ljv1l6T7/view?usp=sharing 

被蟲賺點數網頁版原始檔連結(中文):
https://drive.google.com/file/d/1aH3V9ZXnQMM5g6NJ9LZh4sQa3h3Pcp80/view?usp=sharing 

## Usage

#### PhoneGap CLI

The hello-world template is the default when you create a new application using the [phonegap-cli][phonegap-cli-url].

    phonegap create my-app

Create an app using hello-world template specifically:

    phonegap create my-app --template hello-world

To see a list of other available PhoneGap templates:

    phonegap template list

## [config.xml][config-xml]

#### android-minSdkVersion (Android only)

Minimum SDK version supported on the target device. Maximum version is blank by default.

This template sets the minimum to `14`.

    <preference name="android-minSdkVersion" value="14" />

#### &lt;access ...&gt; (All)

This template defaults to wide open access.

    <access origin="*" />

It is strongly encouraged that you restrict access to external resources in your application before releasing to production.

For more information on whitelist configuration, see the [Cordova Whitelist Guide][cordova-whitelist-guide] and the [Cordova Whitelist Plugin documentation][cordova-plugin-whitelist]

## [www/index.html][index-html]

#### Content Security Policy (CSP)

The default CSP is similarly open:

    <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline'; style-src 'self' 'unsafe-inline'; media-src *" />

Much like the access tag above, you are strongly encouraged to use a more restrictive CSP in production.

A good starting point declaration might be:

    <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: 'unsafe-inline' https://ssl.gstatic.com; style-src 'self' 'unsafe-inline'; media-src *" />

For more information on the Content Security Policy, see the [section on CSP in the Cordova Whitelist Plugin documentation][cordova-plugin-whitelist-csp].

Another good resource for generating a good CSP declaration is [CSP is Awesome][csp-is-awesome]


[phonegap-cli-url]: http://github.com/phonegap/phonegap-cli
[cordova-app]: http://github.com/apache/cordova-app-hello-world
[bithound-img]: https://www.bithound.io/github/phonegap/phonegap-app-hello-world/badges/score.svg
[bithound-url]: https://www.bithound.io/github/phonegap/phonegap-app-hello-world
[config-xml]: https://github.com/phonegap/phonegap-template-hello-world/blob/master/config.xml
[index-html]: https://github.com/phonegap/phonegap-template-hello-world/blob/master/www/index.html
[cordova-whitelist-guide]: https://cordova.apache.org/docs/en/dev/guide/appdev/whitelist/index.html
[cordova-plugin-whitelist]: http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist
[cordova-plugin-whitelist-csp]: http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist#content-security-policy
[csp-is-awesome]: http://cspisawesome.com

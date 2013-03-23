var system = require('system');
var page = require('webpage').create();


page.settings.userAgent = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5'
page.viewportSize = { width: 640, height: 960 }
page.paperSize    = { width: 640, height: 960 } 

var url;

if(system.args.length > 1){
	url = system.args[1];
}
else{
	console.log("Usage: phantomjs capture.js <url>");
	phantom.exit();
}

page.open(url, function (status) {
    console.log("PHANTOM: " + url);
    setTimeout(function(){getSize(url)}, 3000);
});

function getSize(url){
    page.render(pic_name);
    phantom.exit();
}

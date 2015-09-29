/*var exec = require('sync-exec');

var oldHtmlFbtk;
var htmlFBTk;
var tries;

tries = 0;
oldHtmlFbtk = exec('curl https://www.facebook.com/Teknautas');
htmlFBTk = exec('curl https://www.facebook.com/Teknautas');

console.log (oldHtmlFbtk == htmlFBTk);

while ( oldHtmlFbtk == htmlFBTk){
	htmlFBTk = exec('curl https://www.facebook.com/Teknautas');
	tries++;
	console.log('Try: '+tries+' Result -> sin diferencia');
	if (tries == 3) { oldHtmlFbtk = exec('curl https://www.facebook.com/jaumesalatantinya'); }
}
console.log('eureka');
*/

var exec = require('sync-exec');
var jsdom = require("jsdom");

var tries = 0;
var oldHTML;
var newHTML;

function recursive () {
	jsdom.env(
	"https://www.facebook.com/Teknautas",
	["http://code.jquery.com/jquery.js"],
	function (err, window) {
	  	var $ = window.$;
	  	tries ++;
	  	console.log('Tries'+ tries);

		newHTML=$('body').text();
		console.log(oldHTML);
		console.log(newHTML);
		if (oldHTML == newHTML)
			recursive();
		else {
			console.log('something new');
		}
	});
}

jsdom.env(
	"https://www.facebook.com/Teknautas",
	["http://code.jquery.com/jquery.js"],
	function (err, window) {
	  	var $ = window.$;

		//oldHTML=$('body').text();
		//newHTML=$('body').text();
		//recursive();
		$("div._4bl7").each(function() {
			$(this).text();
		});

});



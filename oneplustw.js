var exec = require('sync-exec');
var jsdom = require("jsdom");

var usedCodes = [
	'EUAE-VVDY-L7YT-ONJ0',
	'GL8L-AYEH-45HD-MHWJ',
	'EU6X-NEUX-MNDP-P5WM',
	'EUQB-9PQX-ZLYA-LYLU', 
	'EUXK-QKZ6-2AMI-MJ9R', 
	'EUHS-EWNE-DWON-HAJN',
	'EUYF-SWVO-CCMU-IUNC', 
	'EUWU-NP0Z-KPCE-HST5', 
	'EUPV-4IAF-XLXN-DYF5',
	'EUBZ-CZOG-VHF2-NHBN', 
	'EUWQ-O46F-57PJ-T16W'
	];
var tries = 0;
var found = false;

function recursive () {
	jsdom.env(
	  "https://twitter.com/Teknautas",
	  ["http://code.jquery.com/jquery.js"],
	  function (err, window) {
	  	var $ = window.$;
	  	tries ++;
	  	console.log('Tries'+ tries);

		$("p.TweetTextSize").each(function() {
			var cntTw = $(this).text();
	    	if (cntTw.indexOf("#ConcursoOnePlus2") > -1){
	      		var code = cntTw.substring(18, 37); 
	      		if (code.substring(4,5) == '-'){
	      			var foundInUsedCodes = true;
	      			console.log('- Code: '+code);
	      			if ( usedCodes.indexOf(code) == -1) {
	      				console.log('Nuevo codigo:'+ code);
	      				exec('firefox.exe https://invites.oneplus.net/claim/' + code);
	      				found = true;
	      				return false; return false;
	      			}
	      		}
	      	}
	    });

	    if (!found){
			recursive();
		}
	  }
	);
}

recursive();
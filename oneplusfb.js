var exec = require('sync-exec');
var FB = require('fb');

var newCode;
var lastPostsStream;
var pagesToLoad = 15;
var appAccesToken = process.argv[2];
var idFbStreamToLoad = 253487141364437;
var accesToken = [
	'1479394625704304|0IqWLgFVO5Q5IG5Eq9MVbKTnDCc', // 0 oneplus
	'1032052993485781|nCLvQIUytGO5cO8fHkE_pwqc2Fs', // 1 onepluss
	'1483305858648286|nvJ9jm9SDnljQ4s1ofHnBr8nAos', // 2 oneplusss
	'938113436235615|k1ood9l6KdGf6NjCBJypQrLeEiE'   // 3 oneplussss
	];
var usedCodes = [];

function messageHasCode(msg){
	if (msg == undefined) { return false;}
	else{
		if (msg.search(/\w{4}-\w{4}-\w{4}-\w{4}/g) != -1) 	{ 	return true; 	}
		else												{	return false;	}
	}
}

function getCodefromMessage (msg){
	var pos = msg.search(/\w{4}-\w{4}-\w{4}-\w{4}/g);
	return msg.substring(pos, (pos+19));
}

function getOnePlusCodeFromPostsStream(postStream){
	postStream.forEach(function(element) {
		var msg = element.message;
		if (messageHasCode(msg)) {
			var code = getCodefromMessage(msg);
			if ( usedCodes.indexOf(code) == -1) {
				console.log('New CODE is Released: '+ code);
				exec('firefox.exe https://invites.oneplus.net/claim/' + code);
				usedCodes.push(code);
			}
	  	}
	});
}

function getNextPage(next){
	var pos = next.search(idFbStreamToLoad)
	return next.substring(pos,next.length);
}

function loadFBStream(url, page){
	FB.api(url, function (res) {
		if(!res || res.error) {
        	console.log(!res ? 'error occurred' : res.error);
        	return;
    	}
		page++;
		console.log('Page '+page + ' Procesando PostFB del: '+(1*page) + ' al: '+ (25*page));
		if (page == 1) {console.log('Último Post:'+res.data[0].message.substring(0,80)); }
		getOnePlusCodeFromPostsStream(res.data);
		if (page < pagesToLoad){
			var nextUrl = getNextPage(res.paging.next);
			loadFBStream(nextUrl, page);
		}
		else {
			console.log('Hemos cargado todas las paginas y no hay códigos nuevo volvemos a empezar');
			loadFBStream(idFbStreamToLoad+'/posts?access_token='+accesToken[appAccesToken], 0);
		}
	});
}

loadFBStream(idFbStreamToLoad+'/posts?access_token='+accesToken[appAccesToken], 0);
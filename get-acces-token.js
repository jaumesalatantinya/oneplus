var FB = require('fb');
 
FB.api('oauth/access_token', {
    client_id: '938113436235615',
    client_secret: '060fcd6554a44731a60f4061b8e71a32',
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    var accessToken = res.access_token;
    console.log('accessToken= '+accessToken);
});
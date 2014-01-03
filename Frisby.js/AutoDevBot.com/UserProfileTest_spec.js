/*
Tests the user's profiles API endpoints

 */
var frisby = require('/frisby.js');

var URL = 'https://api.AutoDevBot.com';
var AUTH_TOKEN = '<AUTHENTICATION_TOKEN>';

// Global setup for all tests
frisby.globalSetup({
    request: {
        headers:{'authToken': AUTH_TOKEN}
    }
});

/*
Get the current user's information
 */
frisby.create('User GET')
    .get(URL + '/user')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(
        {
            "f_name":String,
            "l_name":String,
            "email":String
        }
    )
    .toss();

/*
Update the current user's information
 */
frisby.create('User POST')
    .timeout(120000)
    .post(URL + '/user',{
            f_name:'AutoDev',
            l_name:'Bot',
            email:'info@autodevbot.com'
        }
    )
    .expectStatus(201)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(
        {
            "result":"success"
        }
    )
    .toss();
/**
 * Monitoring the test server provided by AutoDevBot.com
 *
 */
var frisby = require(process.env.FRISBY_PATH);

var URL = 'http://test.AutoDevBot.com';

/**
 * GET /sample endpoint example
 */
frisby.create('Sample GET')
    .get(URL + '/sample')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes(
        {
            "user_name":String,
            "has_credit_card":Boolean,
            "age":Number
        }
    )
    .toss();

/**
 * POST to /sample endpoint example
 */
frisby.create('Sample POST')
    .post(URL + '/sample',{
        user_name:'Mary',
        age: 23
        }
    )
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectBodyContains('success')
    .toss();
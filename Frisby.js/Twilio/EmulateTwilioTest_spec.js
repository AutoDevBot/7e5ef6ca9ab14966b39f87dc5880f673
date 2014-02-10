var frisby = require(process.env.FRISBY_PATH);

var URL = 'http://localhost:8080';
// Endpoint that Twilio is pointed to as the message callback
var twilioCallBackEndpoint = '/TwilioCallbackEndpoint';
var MessageSid = 'SM6d3b06231372b19f469e6dc9f9201dd5';
var AccountSid = 'SM6d3b06231372b19f469e6dc9f9201dd5';
var From = '+14085381574';
var To = '+19498912906';

/**
 * Standard incoming SMS message from Twilio
 */
frisby.create('Standard Incoming SMS Message from Twilio')
    .post(URL + twilioCallBackEndpoint,{
        MessageSid : MessageSid,
        AccountSid : AccountSid,
        From : From,
        To : To,
        Body : 'A new SMS message from Twilios callback',
        NumMedia : 2
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'text/xml')
    .toss();

/**
 * An SMS message longer than 160 characters.  Twilio will chuck
 * it up and make the callback in pieces.
 */
frisby.create('Chucked Incoming SMS Message from Twilio')
    .post(URL + '/TwilioCustomerSMS12345678',{
        MessageSid : MessageSid,
        AccountSid : AccountSid,
        From : From,
        To : To,
        Body : '(1/3)A new SMS message from Twilios callback',
        NumMedia : 2
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'text/xml')
    .toss();

module.change_code = 1;
("use strict");

var alexa = require("alexa-app");
var app = new alexa.app("sugar");

app.launch(function(request, response) {
  response
    .say("DBP1 Welcome to Alexa World")
    .reprompt("DBP1 Ask Something.")
    .shouldEndSession(false);
});

app.error = function(exception, request, response) {
  response.say("Sorry some error occured " + exception.message);
  throw exception;
};
function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}
/*func cb(response, reading) {
  response.say("The reading is " + reading);
}
func asyncreq() {

}*/
async function handler(req, res) {
  let reaading;
  try {
    var reqM = require("request");
    reading = await reqM("https://api.keyvalue.xyz/deb0db97/mys_test");
    res.say("The reading is " + reading);
  } catch (err) {
    console.log("http error");
    throw err;
  }
}
app.intent(
  "sayHello",
  {
    utterances: ["say Hello", "Hello alexa", "What's up", "Hey alexa"]
  },
  function(request, response) {
    var request = require("sync-request");
    console.log("DBP inside callback");
    var res = request("GET", "https://api.keyvalue.xyz/deb0db97/mys_test");
    response.say("The reading is " + res.getBody());
    console.log("DBP3 End of callback");
  }
);

module.exports = app;

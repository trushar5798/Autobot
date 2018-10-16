"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.q
      ? req.body.queryResult.parameters.q
      : "Seems like some problem. Speak again.";
  return res.json({
    fulfillmentMessages: [
      {
        text: {
          text: speech
        }
      }
    ]
//     //speech: speech,
//     text: speech,
//     source: "autobot"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

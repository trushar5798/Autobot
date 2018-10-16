"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const WeatherInfo = require("./WeatherInfo.js");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  if (
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.q
  ) {
    var speech = req.body.result.parameters.q;
    return res.json({
      fulfillmentMessages: [
        {
          text: {
            text: [speech]
          }
        }
      ]
    });
  } else {
    var speech = "Seems like some problem. Speak again.";
    return res.json({
      fulfillmentMessages: [
        {
          text: {
            text: [speech]
          }
        }
      ]
    });
  }
  if (req.body.queryResult.action.slice(0, 7) == "weather") {
    var address = req.body.queryResult.parameters.address.city
      ? req.body.queryResult.parameters.address.city
      : null;
    address = req.body.queryResult.parameters.address.country
      ? req.body.queryResult.parameters.address.country
      : address;
    address =
      req.body.queryResult.parameters.address.admin - area.toString()
        ? req.body.queryResult.parameters.address.admin - area.toString()
        : address;
    var datetime =
      req.body.queryResult.parameters.date - time.toString()
        ? req.body.queryResult.parameters.date - time.slice(0, 10)
        : address;
    var speech = getWeatherInfo(address, datetime);
    return res.json({
      fulfillmentMessages: [
        {
          text: {
            text: [speech]
          }
        }
      ]
    });
  } else {
    var speech = "Seems like some problem. Speak again.";
    return res.json({
      fulfillmentMessages: [
        {
          text: {
            text: [speech]
          }
        }
      ]
    });
  }
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

"use strict";

const express = require("express");
const bodyParser = require("body-parser");
var weather = require("weather-js");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

function getWeatherInfo(location, datetime) {
  var response;
  weather.find({ search: location, degreeType: "C" }, function(err, result) {
    if (err) console.log(err);
    var skytext = null;
    result[0].forecast.forEach(function(element) {
      //console.log(element);
      if (datetime == element.date) {
        skytext = element.skytextday;
      }
    });
    var currentdate = new Date().getDate();
    var otherdate = new Date(datetime).getDate();
    var day, verb;
    if (currentdate - otherdate == 0) {
      day = "Today";
      verb = "is";
    } else if (currentdate - otherdate == -1) {
      day = "Tomorrow";
      verb = "will be";
    } else if (currentdate - otherdate == -2) {
      day = "The day after Tomorrow";
      verb = "will be";
    } else if (currentdate - otherdate == 1) {
      day = "Yesterday";
      verb = "was";
    } else if (currentdate - otherdate == 2) {
      day = "The day before Yesterday";
      verb = "was";
    } else if (currentdate - otherdate > 2) {
      if (skytext == null) {
        skytext = result[0].forecast[0].skytextday;
        day = "That day";
        verb = "was";
      }
    } else if (currentdate - otherdate < -2) {
      if (skytext == null) {
        skytext = result[0].forecast[4].skytextday;
        day = "That day";
        verb = "will be";
      }
    }
    response =
      day +
      ", In " +
      result[0].location.name +
      " weather condition " +
      verb +
      " " +
      skytext +
      " and Current Temerature is " +
      result[0].current.temperature +
      "°C.";
    //console.log(result);
    //console.log(response+"1");

  });
  console.log(response);
}

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
  } else if (req.body.queryResult.action.slice(0, 7) == "weather") {
    var address = req.body.queryResult.parameters.address.city
      ? req.body.queryResult.parameters.address.city
      : null;
    address = req.body.queryResult.parameters.address.country
      ? req.body.queryResult.parameters.address.country
      : address;
      console.log("address"+address);
    //address =
    //  req.body.queryResult.parameters.address.admin-area.toString()
    //    ? req.body.queryResult.parameters.address.admin-area.toString()
    //    : address;
    var datetime =
      req.body.queryResult.parameters.datetime.toString()
        ? req.body.queryResult.parameters.datetime.slice(0, 10)
        : null;
        console.log(datetime);

        weather.find({ search: location, degreeType: "C" }, function(err, result) {
          if (err) console.log(err);
          var skytext = null;
          result[0].forecast.forEach(function(element) {
            //console.log(element);
            if (datetime == element.date) {
              skytext = element.skytextday;
            }
          });
          var currentdate = new Date().getDate();
          var otherdate = new Date(datetime).getDate();
          var day, verb;
          if (currentdate - otherdate == 0) {
            day = "Today";
            verb = "is";
          } else if (currentdate - otherdate == -1) {
            day = "Tomorrow";
            verb = "will be";
          } else if (currentdate - otherdate == -2) {
            day = "The day after Tomorrow";
            verb = "will be";
          } else if (currentdate - otherdate == 1) {
            day = "Yesterday";
            verb = "was";
          } else if (currentdate - otherdate == 2) {
            day = "The day before Yesterday";
            verb = "was";
          } else if (currentdate - otherdate > 2) {
            if (skytext == null) {
              skytext = result[0].forecast[0].skytextday;
              day = "That day";
              verb = "was";
            }
          } else if (currentdate - otherdate < -2) {
            if (skytext == null) {
              skytext = result[0].forecast[4].skytextday;
              day = "That day";
              verb = "will be";
            }
          }
          response =
            day +
            ", In " +
            result[0].location.name +
            " weather condition " +
            verb +
            " " +
            skytext +
            " and Current Temerature is " +
            result[0].current.temperature +
            "°C.";
            return res.json({
              fulfillmentMessages: [
                {
                  text: {
                    text: [response]
                  }
                }
              ]
            });
          //console.log(result);
          //console.log(response+"1");

        });
    //var text = getWeatherInfo(address, datetime);
    //console.log(getWeatherInfo(address, datetime));
    console.log(text);
    return res.json({
      fulfillmentMessages: [
        {
          text: {
            text: [text]
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

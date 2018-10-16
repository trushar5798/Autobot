var weather = require("weather-js");

// Options:
// search:     location name or zipcode
// degreeType: F or C
function getTemperatureInfo(location) {
  weather.find({ search: location, degreeType: "C" }, function(err, result) {
    if (err) console.log(err);

    var response =
      "In " +
      result[0].location.name +
      " temperature is " +
      result[0].current.temperature +
      "°C.";
    return response;
  });
}

function getWeatherInfo(location, datetime) {
  weather.find({ search: location, degreeType: "C" }, function(err, result) {
    if (err) console.log(err);
    var skytext = null;
    result[0].forecast.forEach(function(element) {
      console.log(element);
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
    var response =
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
    console.log(result);
    console.log(response);
    return response;
  });
}

//getWeatherInfo("gujarat", "2018-10-20");

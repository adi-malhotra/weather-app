const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'a6b890ff23d97ae170d0269eec754a99';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        var weatherman = {
          "name" : "aditya",
          "lat" : weather.coord.lat,
          "lon" : weather.coord.lon,
          "maxtemp" : weather.main.temp_max,
          "mintemp" :  weather.main.temp_min,
          "humidity" : weather.main.humidity
        }
        res.render('index',{weather: weatherman, error: null})
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

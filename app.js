const express = require("express");
const app =express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const about = "Love to develop web application just made this using openweathermap api which is great and is a must check. Also I used EJS, Node.js, and express ";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
  res.render("home.ejs");
});
app.get("/detail", function(req,res){
  res.render("detail.ejs");
})
app.get("/about", function(req,res){

  res.render("about.ejs", {
    about : about
  })

})
app.post("/",function(req, res){
  const query = req.body.cityName;
  const apiKey = "ddee8936c6cb964c55ed157c1a9d28f6";
  const unit ="metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url, function(response){
        response.on("data", function(data){
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          const feelsLike = weatherData.main.feels_like;
          const tempMax = weatherData.main.temp_max;
          const tempMin = weatherData.main.temp_min;
          const humidity = weatherData.main.humidity;
          const weatherDescription = weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
          const country = weatherData.sys.country;
          console.log(weatherData);
          console.log(icon);

          console.log(temp);
          res.render("detail.ejs" ,{
            temp : temp,
            iconUrl : iconUrl,
            tempMax : tempMax,
            tempMin : tempMin,
            humidity : humidity,
            weatherDescription : weatherDescription,
            country : country,
            feelsLike : feelsLike,
            query : query

          })

        })
  })
})


app.listen(3000, function(){
  console.log("Server is running at port 3000");
})




// current weather DataView(api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key})
// 16 days forcast
// api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}

// Api key
// ddee8936c6cb964c55ed157c1a9d28f6

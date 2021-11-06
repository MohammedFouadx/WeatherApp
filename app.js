const express = require("express")
const app = express()
const https = require("https")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended : true}))
app.get("/" , function(req , res) {

    res.sendFile(__dirname + "/index.html")
   
    
})

app.post("/" , function(req , res){

    const query = req.body.cityName
    const appId = "c50fcc5157c7bc06f3c403dbdfe9ba7e"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appId + "&units=" + unit
    https.get(url , function (response){

        console.log(response.statusCode)

        response.on('data' , function (data){
            const weatherData = JSON.parse(data)
            const weatherDesription = weatherData.main.temp
            const temp = weatherData.weather[0].description

            const icon = weatherData.weather[0].icon    
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write(`<p> The weather is currently ${temp} </p>`)
            res.write(`<h1> The temperature in  ${query} is  ${weatherDesription}  degree Celcius. </h1>`)
            res.write(`<img src = "${imageUrl}">`)
            res.send()
        })

})


})
app.listen(3000 , function(){
    console.log("Every thing is going ok")
})







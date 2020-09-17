const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

 res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){

  const cityname=req.body.cityName;

  url="https://api.openweathermap.org/data/2.5/weather?q="+ cityname +"&appid=4a122b2e21e8d04109d152cee3144feb&units=metric";

  https.get(url,function(response){

    console.log(response.statusCode);

    response.on("data",function(data){

       const weatherData=JSON.parse(data);

       const temp=weatherData.main.temp;

       const icon=weatherData.weather[0].icon;

       const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"

       const info=weatherData.weather[0].description;

       res.write("<h1 style='color:green; text-align:center'>Weather  is "+info+"</h1>");

       res.write("<p style='color:green;font-size:30px; text-align:center'>Temperature in "+cityname+" is currently "+temp+" degree celcius</p>");

       res.write("<img style='margin-left:48%' src="+ imgUrl +">");

       res.send();
    })
  });
})

app.listen(3000,function(){
  console.log("Server is running at port 3000");
})

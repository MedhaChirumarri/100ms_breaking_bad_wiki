const express = require("express")
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index1.html");
})

app.post("/",function(req,res){
  console.log("post request received");

  const name = req.body.name;
  //const apiKey = req.body.key;
  //const unit = req.body.units;
  const url="https://www.breakingbadapi.com/api/characters?name="+name;
  const baseUrl="https://www.breakingbadapi.com/api/characters";


  const quoteUrl="https://www.breakingbadapi.com/api/quote?author="+name;
  res.write(quoteUrl);
  https.get(quoteUrl,function(response1){
    console.log(response1.statusCode);
        response1.on("data",function(data){
          const quoteData = JSON.parse(data);
          var quote="";
          const newLen = quoteData.length;
          res.write(newLen.toString());
          for(m=0;m<newLen;m++)
            quote += quoteData[m].quote;


          res.write(quote);
          res.send()


        })
      })





})


//6788d21d8ed6e5eede785e8f5a7181e2

app.listen(3000,function(){
  console.log("at 3000");
})

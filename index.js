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

  https.get(url , function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const charData = JSON.parse(data);
      const len = charData.length;
    for (i = 0; i < charData.length; i++) {
      const charName = charData[i].name;
      const birthday= charData[i].birthday;
      const imageURL = charData[i].img;
      const nickName = charData[i].nickname;
      const actor = charData[i].portrayed;
      const status = charData[i].status;
      var app="";
      var occ="";
      for(j in charData[i].occupation)
          occ+=charData[i].occupation[j]+",";
      for(j in charData[i].appearance)
          app+=charData[i].appearance[j]+",";
      const quoteUrl="https://www.breakingbadapi.com/api/quote?author="+charName.replace(" ","+");

      res.write("<h1>"+charName+"</h1>");
      res.write("<p>Birthday:"+birthday+"</p><br>");
      res.write("<p>nickname:"+nickName+"</p><br>");
      res.write("<p>Actor who played the character:"+actor+"</p><br>");
      res.write("<p>Status:"+status+"</p><br>");
      res.write("<p>Seasons:"+app+"</p><br>");
      res.write("<p>Occupation:"+occ+"</p><br>");
      res.write("<img src="+imageURL+" width="+300+" height="+300+"><br>");
      }



      res.send()
    })
  })

})


//6788d21d8ed6e5eede785e8f5a7181e2

app.listen(3000,function(){
  console.log("at 3000");
})

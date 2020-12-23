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
  var names=[];
  for(i=1;i<10;i++){
  const baseUrl="https://www.breakingbadapi.com/api/characters/"+i;

  https.get(baseUrl , function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const charData = JSON.parse(data);
      const len = charData.length;

      names.push(charData[0].name);
      const birthday= charData[0].birthday;
      const imageURL = charData[0].img;
      const nickName = charData[0].nickname;
      const actor = charData[0].portrayed;
      const status = charData[0].status;
      var app="";
      var occ="";
      for(j in charData[0].occupation)
          occ+=charData[0].occupation[j]+",";
      for(j in charData[0].appearance)
          app+=charData[0].appearance[j]+",";



    })
  })
  }
  for(k=1;k<10;k++)
    res.write(names[i].toString());
  res.send()
})


//6788d21d8ed6e5eede785e8f5a7181e2

app.listen(3000,function(){
  console.log("at 3000");
})

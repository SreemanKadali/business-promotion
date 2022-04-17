const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https")
const app=express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
})
app.post("/",function(req,resp){
  var name = req.body.name
  var email= req.body.email
  var address= req.body.address
  var phone= req.body.phone
  var order=req.body.order
  var data ={
    members:[{
  email_address: email,
  status: "subscribed",
  merge_fields: {
 NAME: name,
 PHONE: phone,
 STREET:address,
 ORDER:order,
}
}]
 }


var jsonData=JSON.stringify(data)
const url="https://us14.api.mailchimp.com/3.0/lists/4f23e910c3"
const options={
  method:"POST",
  auth:"sreeman:b0bcd9c3487ef3bf25d40daa6ec0c63f-us14"
}
const request1= https.request(url,options,function(response){
  response.on("data",function(data){
    console.log(JSON.parse(data));
    console.log(JSON.parse(data).error_count);
    if(JSON.parse(data).error_count===0){
      resp.sendFile(__dirname+"/success.html");
    }else{
      resp.sendFile(__dirname+"/failure.html");
  }
  })
})
request1.write(jsonData)
request1.end()
})
app.post("/success",function(req,res){
  res.redirect("/")
})
app.post("/failure",function(req,res){
  res.redirect("/")
})
app.listen(process.env.PORT ||3000,function(){
  console.log("server connected to localhost:3000")
})

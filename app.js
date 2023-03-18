const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const { url } = require("inspector");


const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",(req,res)=>{
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;


    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data); 

    const url="https://us9.api.mailchimp.com/3.0/lists/551eb03721";
    const options={
        method:"POST",
        auth:"harshan:6a61bccea8733e4799c0f47dfee9f346-us9"
    }
    
    const request=https.request(url,options,(response)=>{

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure",(req,res)=>{
    res.redirect("/");
})



app.listen(3000,()=>console.log("Server is running on port 3000"));


//API KEy  6a61bccea8733e4799c0f47dfee9f346-us9
//AID 551eb03721
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose =  require("mongoose");
const Houses = require("./routes/house"); 
const bodyParser = require("body-parser");   

mongoose.connect("mongodb+srv://kiossocamuegi:r91KIAaG0tgIugWu@cluster0.jenjepu.mongodb.net/" ,{useNewUrlParser:true})
 
const Connect =  ()=>{
try {
    const DB = mongoose.connection;
    DB.on("error", (error)=>{
        console.log("error connecting with Database *****")
         Connect()
    });
   DB.once("open", ()=>console.log("Connected to Database 👧👱‍♀️🤗😍"));
} catch (error) {
   console.log("error connecting"); 
   Connect();
}
}
Connect();

app.use(function (req, res, next) {
    //res.setHeader('Access-Control-Allow-Origin', 'https://kinghomes.vercel.app');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json()); 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/images', express.static(__dirname+'/images'));
app.use(Houses); 
 
app.listen(4000, ()=>{
    console.log("KIOSSO server IS Running");
});
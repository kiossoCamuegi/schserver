const express = require("express");
const router = express.Router(); 
const  multer = require(`multer`);
const  path = require(`path`);  
const Schools = require("../models/Schools"); 
var store = require('store')

const stream = require("stream");   
const { google } = require("googleapis");
const app = express();
const upload = multer();



//geting houses
router.get("/", async(req, res)=>{
   res.send("Hello to kiosso api !");
});




//geting name
router.get("/name", async(req, res)=>{
   res.send("Hello my best friend how are you today  !");
});

//geting all
router.get("/schools", async(req, res)=>{ 
   try {
      const Data =  await Schools.find();  
      res.json(Data);
   } catch (error) {
       res.status(500).json({message:error.message});
   }
});

///geting single 
router.get("/schoolget/:id", GetSchool, async(req, res)=>{ 
     res.json(res.school);
});
 


//Creating 
router.post("/postschool", async(req, res)=>{ 
   const {name, phone, location, email, type} =  req.body;  
      const Data = new Schools({ 
         name:name,
         location:location,
         type:type,
         email:email,
         phone:phone,  
      });
 
      try {
         const newData = await Data.save();
         res.status(201).json(newData);
      } catch (error){
       console.log(error)
         res.status(500).json({message:error.message});
      } 
});

  

//Updating 
router.put("/updateschool/:id", GetSchool, async(req, res)=>{ 
    const {name, phone, location, email, type} =  req.body; 
    
      res.school.name = name;
      res.school.location = location;
      res.school.type = type;
      res.school.phone = phone;
      res.school.email = email; 
   
      try {
         const updateData = await res.school.save();
         res.status(201).json(updateData);
      } catch (error){
         res.status(500).json({message:error.message});
         console.log(error.message)
      }
});

 
//Delete 
router.delete("/delete/:id", GetSchool,  async(req, res)=>{ 
      try {
         await res.school.deleteOne();
         res.json({message:"Data deleted  !"});
    } catch (error) {
       res.status(500).json({message:error.message});
    } 
});

 


async function GetSchool(req, res, next) {
   let school;
   try {
      school = await Schools.findById(req.params.id);
      if(school == null){
         return res.status(404).json({message:"Cannot find Data"});
      }
   } catch (error) {
      res.status(500).json({message:error.message});
   }

   res.school = school;
   next();
}



module.exports = router;

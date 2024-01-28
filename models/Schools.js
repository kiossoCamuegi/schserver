const moongose = require("mongoose");


const SchoolsSchema  =  new moongose.Schema({
     name:{
        type:String,
        required:true,
     },
     location:{
        type:String,
        required:true,
     },
     type:{
        type:Number,
        required:true,
     },
     phone:{
        type:String,
        required:false,
     },
     email:{
      type:String,
      required:false,
   },
    registerDate:{
        type:Date,
        required:true,        
       default:Date.now
    }
})
module.exports = moongose.model("schools", SchoolsSchema);
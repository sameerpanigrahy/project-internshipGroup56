const mongoose=require('mongoose')


const collegeSchema= new mongoose.Schema({

     name: { 
        type:String,
        required:"name is require",
         unique:true,
         trim:true
        },
     fullName: {
        type:String,
        required:"fullName is require",
     trim:true 
    },
     logoLink: {
        type:String,
        required:"logoLink is require",
         trim:true 
        },
      isDeleted: {type:Boolean, default: false} 

},{timestamps:true})

module.exports=mongoose.model('College',collegeSchema)
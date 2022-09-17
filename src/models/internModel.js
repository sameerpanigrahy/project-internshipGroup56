const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId


const internSchema= new mongoose.Schema({
     name: { 
        type:String,
        required:"name is require",
         trim:true
        },
        email: {
        type:String,
        required:"email address is require",
        unique:true,
         trim:true
        },
        mobile: {
        type:String,
        required:"mobile no. is require",
        unique:true,
         trim:true
        },
        collegeId: {
            type:ObjectId,
             ref:'College'
            } ,

      isDeleted: {type:Boolean, default: false} 

},{timestamps:true})

module.exports=mongoose.model('Intern',internSchema)

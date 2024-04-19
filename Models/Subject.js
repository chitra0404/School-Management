const mongoose=require("mongoose")
const subjectSchema=mongoose.Schema(
    {
        subname:{
            type:String,
            required:true,
        },
        subcode:{
            type:String,
            required:true,
        },
        sessions:{
            type:String,
            required:true,
        },
        className:{
           type:String,
           
        },
       
        teacherName: {
            type: String,
           
        }
    }, { timestamps: true })
        
    
const subject=mongoose.model("subject",subjectSchema);
module.exports=subject;
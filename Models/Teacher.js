const mongoose=require("mongoose");

const teacherSchema=mongoose.Schema({
    teacherName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    teacherID:{
        type:Number,
        required:true,
    },
    role:{
        type:String,
        default:"Teacher",
    },
        mobile:{
            type:Number

        },
        age:{
            type:Number,
        },
        dob:{
type:Date,
        },
       
        teachSubject: {
            type:String,
        },
      className: {
            type: Number,
            
        },
        attendance: [{
            date: {
                type: Date,
                required: true
            },
            presentCount: {
                type: String,
            },
            absentCount: {
                type: String,
            }
        }]
},{ timestamps: true })

const teacher=mongoose.model("teacher",teacherSchema);
module.exports=teacher;
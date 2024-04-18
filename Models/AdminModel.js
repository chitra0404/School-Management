const mongoose=require("mongoose");

const adminSchema=mongoose.Schema({
    adminID:{
type:String,
    },

    name:{
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
    role:{
        type:String,
        default:"Admin",
    },
    schoolName:{
        type:String,
        unique:true,
        required:true,
    }
})

module.exports=mongoose.model("Admin",adminSchema);

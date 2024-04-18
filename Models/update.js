const mongoose=require("mongoose");

const updateSchema=mongoose.Schema({
    title:{
        type:String,
    },
    details:{
        type:String,
    },
   
    date:{
        type:Date
    }
})
const Update=mongoose.model("Update",updateSchema);
module.exports=Update;
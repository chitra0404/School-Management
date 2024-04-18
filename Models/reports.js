const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  



  name: {
    type: String,
   
  },

  age: {
    type: Number,
    
  },

  email: {
    type: String,
    
  },

 
  mobile: {
    type: Number,
   
  },


    
      subjectName: {
        type: String,
      },
      score: {
        type: Number,
      },
      total: {
        type: Number,
      },  

 
  date: {
    type: Date,
  },

  className: {
    type: Number,
  },

});

const ReportModel = mongoose.model("ReportModel", reportSchema);

module.exports =  ReportModel ;
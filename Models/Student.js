const mongoose=require("mongoose");

const studentSchema=mongoose.Schema( 
    { 
        studentID: {
    type: Number,
    required: true,
  },

  studentName: {
    type: String,
  },

  mobile: {
    type: Number,
    minlength: 10,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,
  },

  

  DOB: {
    type: Date,
  },

  address: {
    type: String,
  },
  className: {
    type:Number,
},

  role: {
    type: String,
    default: "Student"
},

  image: {
    type: String,
    default:
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },

  details: {
    type: String,
  },
  examResult: [
    {
        subName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subject',
        },
        marksObtained: {
            type: Number,
            default: 0
        }
    }
],
attendance: [{
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true
    },
    subName: {
        type:String,
    }
}]
});

const student=mongoose.model("student",studentSchema);
module.exports=student;

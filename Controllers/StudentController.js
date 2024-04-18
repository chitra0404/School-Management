const Student=require('../Models/Student');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


module.exports. getStudents = async (req, res) => {
    try {
        let students = await Student.find({} ).populate("className", "className");
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
module.exports.StudentRegister=async(req,res)=>{
    // try{
      
        const existingStudent=await Student.findOne({studentID:req.body.studentID,className: req.body.className, schoolName:req.body.adminID});
            if (existingStudent) {
                res.send({ message: 'Roll Number already exists' });
            }
            else {
                const email=req.body.email;
                const hashedPassword=await bcrypt.hash(req.body.password,10);
                const token=jwt.sign({email},process.env.STUDENT_KEY);
                const student = new Student({
                    ...req.body,
                
               
                    password: hashedPassword
                });
                
             await student.save();
            res.status(200) .header("auth-token").json({token:token});
 }
// }catch(err){
//     res.status(500).json(err);

// }

}

module.exports.studentLogin=async(req,res)=>{
    try{
        const {studentID,email,password}=req.body;
        let student=await Student.findOne({ studentID, email })
        if(!student){
            return res.status(409).json({message:"authentication failed"});
        }
        const passwordmatch=await bcrypt.compare(password,student.password);
        if(!passwordmatch){
            return res.status(409).json({message:"invalid password"}); }
        if(student && passwordmatch){
              
            const token=jwt.sign({ studentId:student.studentID},process.env.Student_KEY,{expiresIn:'24hr'})
                res.json({
                 
                  
                  email: student.email,
                 token:token
                })
            }
        else{
            res.send({ message: "Invalid password" });

        }

    }
   
    
    
    catch (err) {
        res.status(500).json(err);
    }
}

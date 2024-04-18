const Teacher=require('../Models/Teacher');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');



module.exports.teacherRegister=async(req,res)=>{
    // try{
        const existingteacher=await Teacher.findOne({ email:req.body.email});
            if (existingteacher) {
                res.send({ message: 'Roll Number already exists' });
            }
            else {
                const email=req.body.email;
                const hashedPassword=await bcrypt.hash(req.body.password,10);
                const token=jwt.sign({email},process.env.TEACHER_KEY);
                const teacher = new Teacher({
                    ...req.body,
                   
                    password: hashedPassword
                });
                
            let result = await teacher .save();
            res.status(200) .header("auth-token").json({token:token});
 }
// }catch(err){
//     res.status(500).json(err);

// }

}

module.exports.teacherLogin=async(req,res)=>{
    const {email,password}=req.body;
    const teacher=await Teacher.findOne({email});
    if(!teacher){
        return res.status(409).json({message:"authentication failed"});
    }
        const passwordmatch=await bcrypt.compare(password,teacher.password);
        if(!passwordmatch){
            return res.status(409).json({message:"invalid password"}); }
            if (teacher && passwordmatch) {
                const token=jwt.sign({ teacherId:teacher._id},process.env.TEACHER_KEY,{expiresIn:'24hr'})
                res.json({
                 
                  
                  email: teacher.email,
                 token:token
                })}
            else{
                return res.status(400).json({ message: 'invalid password' });
            }
        }

module.exports.updateteach=async (req, res) => {
    const id = req.params.teacherId;
    const payload = req.body;
    try {
      await Teacher.findByIdAndUpdate({ _id: id }, payload);
      const teacher = await Teacher.findById(id);
      if (!teacher) {
        return res
          .status(404)
          .send({ message: `Teacher with id ${id} not found` });
      }
      res.status(200).send({ message: `Teacher Updated`, user: teacher });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "Something went wrong, unable to Update." });
    }
  };
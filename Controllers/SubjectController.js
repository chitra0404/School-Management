const Subject=require("../Models/Subject");
const Teacher=require("../Models/Teacher");
const Student=require("../Models/Student");

module.exports.createSub=async(req,res)=>{
    // try {
        
        // try{
            const update=new Subject({...req.body})
            await update.save();
            res.status(200).send({message:"created Successfully"})
        // }catch(err){
        //     res.status(400).send({ error: "Something went wrong" });

        // }
    // } catch (err) {
    //     res.status(500).json(err);
    // }
}


module.exports. allSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find({ })
            
        if (subjects.length > 0) {
            res.send(subjects)
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports. classSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find({ className: req.params.id })
        if (subjects.length > 0) {
            res.send(subjects)
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
module.exports. deleteSubject = async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

        await Teacher.updateOne(
            { teachSubject: deletedSubject._id },
            { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
        );

        await Student.updateMany(
            {},
            { $pull: { examResult: { subName: deletedSubject._id } } }
        );

        await Student.updateMany(
            {},
            { $pull: { attendance: { subName: deletedSubject._id } } }
        );

        res.send(deletedSubject);
    } catch (error) {
        res.status(500).json(error);
    }
};


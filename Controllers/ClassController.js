const Class=require('../Models/class');
const Student = require('../Models/Student.js');
const Subject = require('../Models/Subject.js');
const Teacher = require('../Models/Teacher.js');

module.exports.addclass=async(req,res)=>{
    try {
        const clasNam = new Class({
            className: req.body.className,
        });

        const existingSclassByName = await Class.findOne({
            className: req.body.className,
        });
        if (existingSclassByName) {
            res.send({ message: 'Sorry this class name already exists' });
        }
        else {
            const result = await clasNam.save();
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};


module.exports.classList = async (req, res) => {
    try {
        let classes = await Class.find({ })
        if (classes.length > 0) {
            res.send(classes)
        } else {
            res.send({ message: "No classes found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports. getclassDetail = async (req, res) => {
    try {
        let classes = await Class.findById(req.params.id);
        if (classes) {
            classes = await Class.populate("school", "schoolName")
            res.send(classes);
        }
        else {
            res.send({ message: "No class found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.getclassStudents = async (req, res) => {
    try {
        let students = await Student.find({ className: req.params.id })
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
}

module.exports. deleteclass = async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.send({ message: "Class not found" });
        }
        const deletedStudents = await Student.deleteMany({ className: req.params.id });
        const deletedSubjects = await Subject.deleteMany({ className: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ teachclass: req.params.id });
        res.send(deletedClass);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports. deleteclasses = async (req, res) => {
    try {
        const deletedClasses = await Class.deleteMany({ schoolName: req.params.id });
        if (deletedClasses.deletedCount === 0) {
            return res.send({ message: "No classes found to delete" });
        }
        const deletedStudents = await Student.deleteMany({ schoolName: req.params.id });
        const deletedSubjects = await Subject.deleteMany({ schoolName: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ schoolName: req.params.id });
        res.send(deletedClasses);
    } catch (error) {
        res.status(500).json(error);
    }
}

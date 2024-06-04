const express = require('express');
const router = express.Router();

const { adminRegister, Login, getAdmin } = require('../Controllers/AdminController');
const { StudentRegister, studentLogin, getStudents } = require('../Controllers/StudentController');
const { teacherRegister, teacherLogin, updateteach } = require('../Controllers/TeacherController');
const { createUpdate, getUpdate, deleteupdat } = require('../Controllers/UpdateController');
const { addclass, classList } = require('../Controllers/ClassController');
const { createSub, allSubjects } = require('../Controllers/SubjectController');
const { addReport, reportss, updateReport } = require('../Controllers/reportcontroller');

// Admin routes
router.get("/getadmin",getAdmin)
router.post('/admin', adminRegister);
router.post('/login', Login);

// Student routes
router.get("/getstud/:id",getStudents);
router.post('/reg', StudentRegister);
router.post('/studentlog', studentLogin);

//teacher Routes
router.post("/teachReg",teacherRegister);
router.post("/techlogin",teacherLogin)
router.patch("/teach",updateteach);
//class Routes
router.post("/addclass",addclass);
router.get("/getclass",classList)
//subject Routes
router.post("/createsub",createSub)
router.get("/getsub",allSubjects);
//report
router.post("/addreport",addReport);
router.get("/getreport",reportss);
router.patch("/update/:id",updateReport)

//update Routes
router.post("/addupdate",createUpdate);
router.get("/getupdate",getUpdate)
router.delete("/deleteupdate/:id",deleteupdat);

module.exports = router;
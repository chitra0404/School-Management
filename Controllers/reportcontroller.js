const ReportModel=require("../Models/reports");

module.exports.reportss=async (req, res) => {

    try {
      const reports = await ReportModel.find({});
      res.status(200).send(reports);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "Something went wrong" });
    }
  };

  module.exports.addReport=async(req,res)=>{
   
  try {
    const report = new ReportModel({...req.body});
    await report.save();
    res.send({ message: "Report successfully created", report });
  } catch (error) {
    res.send(error);
  }
  }


  module.exports.updateReport=async(req,res)=>{
    const id = req.params.reportId;
    const payload = req.body;
    try {
      const report = await ReportModel.findByIdAndUpdate({ _id: id }, payload);
      if (!report) {
        res.status(404).send({ msg: `Report with id ${id} not found` });
      }
      res.status(200).send(`Report with id ${id} updated`);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "Something went wrong, unable to Update." });
    }
  }

  module.exports.delete=async(req,res)=>{
    const id = req.params.reportId;
  try {
    const report = await ReportModel.findByIdAndDelete({ _id: id });
    if (!report) {
      res.status(404).send({ msg: `Report with id ${id} not found` });
    }
    res.status(200).send(`Report with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
  }
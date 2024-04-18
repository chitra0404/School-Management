const Update=require("../Models/update");

module.exports.getUpdate=async(req,res)=>{
    
        try{
        const update=await Update.find({})
        res.status(200).send({ status: "200", message: update });
    } catch (error) {
      console.log(error);
      res.status(200).send({ status: "500", message: error });
    }
    }


    module.exports.createUpdate=async(req,res)=>{
        const {title,details,date}=req.body;
        try{
            const update=new Update({title,details,date})
            await update.save();
            res.status(200).send({message:"created Successfully"})
        }catch(err){
            res.status(400).send({ error: "Something went wrong" });

        }
    }

    module.exports.deleteupdat=async (req, res) => {
        const id = req.params.noticeId;
        try {
          const notice = await Update.findByIdAndDelete({ _id: id });
          if (!notice) {
            res.status(404).send({ msg: `Notice with id ${id} not found` });
          }
          res.status(200).send(`Notice with id ${id} deleted`);
        } catch (error) {
          console.log(error);
          res.status(400).send({ error: "Something went wrong, unable to Delete." });
        }
      }
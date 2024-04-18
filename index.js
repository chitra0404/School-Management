const express=require("express");
const mongoose=require("mongoose");
const cors=require('cors');
const bodyParser = require('body-parser');
const Routes=require('./router/route');
const app=express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use("/app",Routes);


app.use(bodyParser.json({
  verify: (req, res, buf, encoding) => {
    console.log('Request body:', buf.toString());
  }
}));


//atlas Url
const url=process.env.ATLAS_URL;
//mongoose connect
mongoose.connect(url)
.then(()=>console.log("connect to mongodb"))
.catch(err=>console.log("error occured",err));
const port=3000;
app.listen(port,()=>console.log(`listening to port ${port}`));

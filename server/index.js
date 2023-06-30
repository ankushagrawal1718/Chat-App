const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
app.use(express.json);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('Db connection is Successful')
}).catch((e)=>{
    console.log(e.message)
})

app.get('/',(req,res)=>{
    res.send('Hello world');
})


app.listen(process.env.PORT,()=>{
    console.log(`our basic express appp is setup now on port ${process.env.PORT}`);
})
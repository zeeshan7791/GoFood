const mongoose = require('mongoose');
const mongoDB=async()=>{
   await mongoose.connection.on('mongodb://127.0.0.1:27017/GoFoodMern',{ useUnifiedTopology: true, useNewUrlParser: true },(err,res)=>{
   if(err){
    console.log("--",err)
   }    
   else{
       console.log('db connected successfully')
    }
    });
}

module.exports=mongoDB
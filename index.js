const express = require('express')
const app = express()
const port = 5000
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const routing = require('./routes/createuser');

dotenv.config();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// connect to db
mongoose.connect(
    process.env.DB_CONNECT ,
     { useUnifiedTopology: true, useNewUrlParser: true }
   );
mongoose.connection.on("connected",async(err,res) => {
  if(err){
    console.log("---",err)
  }
  else{
    console.log("connected to db");
    const fetched_data=await mongoose.connection.db.collection('food_items')
    // console.log(fetched_data,'fetched data--------')
    fetched_data.find({}).toArray(function(err,data){
      if(err){
        console.log(err,'here is error')
      }
      else{
        global.food_items=data
      }
    })
  }

});
app.use(express.json())
app.use('/api',require('./routes/createuser'))
app.use('/api',require('./routes/DisplayData'))
app.use('/api',require('./routes/OrderData'))

// mongoDB()
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example is listening on port ${port}`)
})

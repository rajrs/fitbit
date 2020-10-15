
const express  = require("express");
const app  =express();
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();
const port = process.env.PORT || 5000;


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
//console.log(connection);
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(cors());
app.use(express.json());

const exerciseRouter = require('./routes/exercise');
const userRouter = require('./routes/user') ;
app.use('/exercise',exerciseRouter);
app.use('/user',userRouter);
 

app.listen(port, ()=>{
    console.log('server is running on '+port);
})
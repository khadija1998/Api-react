const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const userRoute = require('./routes/auth');
const postRoute= require('./routes/posts')
//Connect to DB 
dotenv.config();
const db = process.env.db;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then(() => console.log('mongodb is connected'))
.catch((err) => console.log(err.message));
 const PORT =  process.env.PORT ||4000
app.listen(PORT, ()=>  console.log(`app running on ${PORT}`));

//Middleware
app.use(express.json())

//Route Middlewares
app.use('/api', userRoute);
app.use('/api/posts', postRoute);

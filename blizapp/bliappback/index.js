const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const cookieParser = require('cookie-parser');

//This is the mongoose connecting to mongodb
mongoose.connect('mongodb://127.0.0.1:8002/auth_api', {
    useNewUrlParser: true,
    useUnifiedTopology: true }, () => {
    console.log('Successfully Connected to Database!!')
})

//this is the web requesting and get portion
app = express()
//using cors
app.use(cors({
    credentials: true,
    origin: ['http://localhost:6247']
}))
//using the cookie parser to detach the cookie and use it on a response page.
app.use(cookieParser())
//make sure your server is using JSON
app.use(express.json())
//getting routes from route
const router = require('./routes/route')
app.use('/api', router)
//This is the port we are listening on 
app.listen(8001)

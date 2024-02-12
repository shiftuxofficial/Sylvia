const mongoose= require('mongoose');
const express = require('express');
const app = express();
const port = 1000;

const DB = 'mongodb+srv://prithwishchatterjee1277:pruth@cluster0.e2tnaao.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(DB,{
}).then(()=>{
  console.log("connected to DB")
}).catch((err)=> console.log('not connected'));


   



const { insertUser } = require('mongoose')
const insertDetails = (req,res) => {
    console.log(req.body);
    const userDetails = req.body;
    insertUser(userDetails);
    res.send(200);
}

module.exports = {insertDetails};
//Setting up mongoDB
const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb+srv://skwasimrazzak:wasim111@cluster0.ercckyr.mongodb.net/LoginData');

//Check Connection
connect.then(()=>{
    console.log("Database Connected Successfully");
})
.catch(()=>{
    console.log("Database cannot be connected");
})

//Create a schema
const LoginSchema= new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
});

//Collection Part
const collection= new mongoose.model("users", LoginSchema);

module.exports = collection;
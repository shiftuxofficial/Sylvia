const express = require("express")
const app = express();
var path = require('path');
const bcrypt= require('bcrypt');
const collection = require("./public/javascripts/configMongo")
//Setting up View Engine
app.set('view engine', 'ejs')

//Path Defined
app.get("/", (req, res) => {
    res.render("form.ejs",{
        accountHolder: req.currentusername
    });
})

app.get("/login", (req, res) => {
    res.render("login.ejs", {message: ""});
})

app.get("/register", (req, res) => {
    res.render("register.ejs", {message: ""});
})

app.get("/home", (req, res) => {
    res.render("home.ejs");
})

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

//Coverting Data into .json
app.use(express.json());

app.use(express.urlencoded({extended: false}));

/********************* Register User (MongoDB) *********************/
app.post("/register", async (req, res)=>{
    const data= {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    //check for existing User
    const existingUser = await collection.findOne({email: data.email});
    
    if(existingUser){
        res.render('register.ejs', { message: 'Email already in use' });
    }else if( data.email=="" || data.name=="" || data.password==""){
        res.render('register.ejs', { message: 'Please Fill up' });
    }else{

        //Hashing Password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password= hashedPassword;
        const userData = await collection.insertMany(data);
        res.redirect("/login");
    }
});

/********************* Login User (MongoDB) *********************/
app.post("/login", async (req, res)=>{
    try {
        const check = await collection.findOne({email: req.body.email});
        if(!check){
            res.render('login.ejs', {message: 'User not found'});
        }
        //Check Password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.redirect('/home');
        }else{
            res.render('login.ejs', {message: 'Incorrect Password'});
        }
    } catch {
        res.render('login.ejs', {message: 'Wrong Details'});
    }
});

//Static Path
app.use(express.static(path.join( __dirname, "public")));
app.listen(3000)
const express = require("express")
const app = express()
var path = require('path');


app.get("/", (req, res) => {
    res.render("form.ejs",{
        name: req.currentusername
    });
})

app.get("/login", (req, res) => {
    res.render("login.ejs");
})

app.get("/register", (req, res) => {
    res.render("register.ejs");
})

app.get("/home", (req, res) => {
    res.render("home.ejs");
})




app.use(express.static(path.join( __dirname, "public")));
app.listen(3000)
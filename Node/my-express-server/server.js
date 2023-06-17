const express = require('express');
const app = express();


app.get("/", function(req, res) {                           // "/" -> mean 'Homepage'
    res.send("<h1>Hello Mando and Grogu!</h1>");
});

app.get("/contact", function(req, res) {                    // 'Contact' page
    res.send("Contact me at: groguJedi@gmail.com");
});

app.get("/about", function(req, res) {                      // 'about' page
    res.send("My name is Grogu I am green little jedi.");
});

app.get("/data", function(req, res) {                       // 'data' page
    res.send("<ul><li><h2>Date</h2></li><li><h2>File Size</h2></li><li><h2>States</h2></li></ul>");
});

app.get("/hobbies", function(req, res) {
    res.send("My hobbies are tennis and swim.");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
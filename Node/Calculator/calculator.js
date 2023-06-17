const express = require('express');
const bodyParser = require("body-parser");                // aim to data retrieve from client


const app = express();
app.use(bodyParser.urlencoded({extended: true}));



// Home Page - Calculator
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    // console.log(req.body);
    var num1 = req.body.num1;                   // Client to Server
    var num2 = req.body.num2;                   // Client to Server
    var sum = parseInt(num1) + parseInt(num2);

    res.send("The result of the calculation: " + sum);    // Server to Client
});




// bmicalculator page
app.get("/bmicalculator", (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post('/bmicalculator', (req, res) => {
     var weight = parseFloat(req.body.weight);
     var height = parseFloat(req.body.height);

     var bmi = weight / (height*height);

     res.send("Your BMI is: " + bmi);
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
});


const express = require('express');
const bodyParser = require("body-parser");

const app = express();

//EJS
app.set('view engine', 'ejs');


//Bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// Adding CSS Stylesheet to Website
app.use(express.static("public"));


var items = ["Buy Food", "Shopping", "Workout"];
var workItems = [];

app.get('/', (req, res) => {

    var today = new Date();

    var options = {
        weekday : "long",
        day: "numeric",
        month: "long",
    };
    
    var day = today.toLocaleDateString("en-US", options);
    res.render('list', {listTitle: day, newListItems: items});
     
});




app.post('/', (req, res) => {

    var item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
        
    } else {
        items.push(item);
        res.redirect("/");
    }
    
});





app.get("/work", (req, res) => {
    res.render('list', {listTitle: "Work List", newListItems: workItems});
});


app.post('/work', (req, res) => {
    var item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})



app.listen(3000, () => {
    console.log('server is running on port 3000');
})


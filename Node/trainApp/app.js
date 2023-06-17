require('dotenv').config();
const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const bcrypt = require('bcrypt');
const saltRounds = 10;


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


let trainCollection;
let client;


// // Replace the uri string with your connection string.
const uri = `mongodb+srv://melih:${process.env.API_KEY}@cluster0.tokxl.mongodb.net/?retryWrites=true&w=majority`;



// Constructor
class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
};



async function run() {
    try {
      const client = new MongoClient(uri);
      const database = client.db('trainDB');
      trainCollection = database.collection('65001_Data');
  
  
      
      
      const insertManyResult = await trainCollection.insertOne(adminUser);
      console.log(`${insertManyResult.insertedCount} documents were inserted.`);
      
    } catch(e) {
      console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
    }
    
    finally {
      // Ensures that the client will close when you finish/error
     if (client) {
        await client.close();
      }
    }
  }
  
run().catch(console.dir);



app.get('/', (req, res) => {
    res.render('home');
});



app.get('/login', (req, res) => {
    res.render('login');
});


app.get('/register', (req, res) => {
    res.render('register');
});


app.post('/register', async function(req, res) {

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    
        const newUser = new User(req.body.username, hash);

        trainCollection.insertOne(newUser);

        res.render('login');
    });

});




app.post('/login', async function (req, res) {
    try {

        const username = req.body.username;
        const password = req.body.password;

        const userResult = await trainCollection.findOne({email: username});

        if (userResult) {
            bcrypt.compare(password, userResult.password, function(err, result) {
                // result == true
                res.render('data');
            });
            
        }
        else {
            res.render('login', {error: 'Invalid username or password' });
        }
    } catch (error) {
        console.log("An error occurred:", error);
        res.status(500).render('error', { error: 'An error occurred. Please try again later.' });
    }

});




app.listen(3000, function() {
    console.log("Server started on port 3000.");
});




require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const workItems = [];




let itemsCollection;
let findResult;
let client;

// // Replace the uri string with your connection string.
const uri = `mongodb+srv://melih:${process.env.API_K}@cluster0.tokxl.mongodb.net/?retryWrites=true&w=majority`;






async function run() {
  try {
    const client = new MongoClient(uri);
    const database = client.db('todolistDB');
    itemsCollection = database.collection('items');

    const firstItems = [
      {"_id": 1, name: "Welcome to your todolist"},
      {"_id": 2, name: "Hit the + button to add a new item"},
      {"_id": 3, name: "<-- Hit this to delete an item."}
    ];

    const insertManyResult = await itemsCollection.insertMany(firstItems);
    const ids = insertManyResult.insertedIds;

    findResult = await itemsCollection.find({}, {}).toArray(true);
    console.log(findResult);

    console.log(`${insertManyResult.insertedCount} documents were inserted.`);
    for (let id of Object.values(ids)) {
      console.log(`Inserted a document with id ${id}`);
    }

  } catch(e) {
    console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
    const ids = e.result.insertedIds;
    for (let id of Object.values(ids)) {
      console.log(`Processed a document with id ${id._id}`);
    }
    console.log(`Number of documents inserted: ${e.result.nInserted}`);
  }
  
  finally {
    // Ensures that the client will close when you finish/error
   if (client) {
      await client.close();
    }
  }
}

run().catch(console.dir);

  



app.get("/", async function(req, res) {
  try {
    const findResult = await itemsCollection.find({}, {}).toArray();
    console.log(findResult);
    res.render("list", { listTitle: "Today", newListItems: findResult });
  } catch (err) {
    console.log(err);
    res.render("list", { listTitle: "Today", newListItems: [] });
  }
});






// app.post("/", async function(req, res){

//   const itemName = req.body.newItem;

//   const itemCount = await itemsCollection.countDocuments();

//   const newId = itemCount + 1;


//   const newItemAdd = await itemsCollection.insertOne({ _id:newId, name: itemName});

//   res.redirect('/');

// });

app.post("/", async function(req, res) {
  const itemName = req.body.newItem;

  // Tüm belgeleri _id'ye göre sıralayarak en büyük _id değerini bulun
  const maxIdDocument = await itemsCollection.find().sort({ _id: -1 }).limit(1).toArray();
  const maxId = maxIdDocument.length > 0 ? maxIdDocument[0]._id : 0;

  const newId = maxId + 1;

  const newItemAdd = await itemsCollection.insertOne({ _id: newId, name: itemName });

  res.redirect('/');
});




app.post("/delete", async function(req, res) {
  const checkItemId = Number(req.body.checkbox);

  console.log(checkItemId);

  await itemsCollection.deleteOne({ _id: checkItemId} );

  res.redirect("/");
});






app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});












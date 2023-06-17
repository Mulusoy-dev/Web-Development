

// const uri = "mongodb+srv://melih:jm15vgZMLF4U4dFs@cluster0.tokxl.mongodb.net/?retryWrites=true&w=majority";



const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://melih:<password>@cluster0.tokxl.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema Init
const fruitsSchema = new mongoose.Schema ({
    name: String,
    rating: Number,
    review: String
});

// Model Init
const Fruit = mongoose.model('Fruit', fruitsSchema);


// Document Init
const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Solid as a fruit."
})


// Save opration
fruit.save().then(() => {
    console.log(fruit);

    // Data reading
    Fruit.find({}, (err, fruits) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(fruits);
            mongoose.connection.close();      // Close Connection

        }
    });

}).catch((err) => {
    console.log(err);
});






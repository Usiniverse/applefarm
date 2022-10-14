const mongoose = require('mongoose');

function connectDB() {
    return mongoose.connect("mongodb+srv://rkddbtls007:Asd20902!!@cluster0.obv4g.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = connectDB;
require('dotenv').config();

const mongoose = require('mongoose');

function connectDB() {
    return mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = connectDB;
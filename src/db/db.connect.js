/*
 * Connection to MongoDB
 */
const mongoose = require("mongoose");
const config = require("./db.config");
const connectDB = () => {
    return mongoose.connect(config.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
};

module.exports = connectDB;
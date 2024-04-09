// Load the Mongoose ORM
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Royreid3rd:mymongodbpassword@cluster0.28ltw2v.mongodb.net/');

module.exports = mongoose.connection;
const mongoose = require('mongoose');

// Connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/nodeauthentication_development');
const db = mongoose.connection;

// Error handling for database connection
db.on('error', console.error.bind(console, 'Error in connecting to the database:'));

// Successful database connection
db.once('open', function () {
    console.log('Successfully connected to the database');
});

module.exports = db;

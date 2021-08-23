const mongoose = require('mongoose');
const { Schema } = require('mongoose');
//Setting up the Schema so it can use the data from the front end and place it in the database
const userSchema = new Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cPassword: {
        type: String,
        required: true
    }
});
//Exporting the model as a schema so it can be used
module.exports = mongoose.model('User', userSchema)
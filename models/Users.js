const mongoose = require('mongoose')

//schema
const userSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: [true, `First name is required`]
    },
    lastName: {
        type: String,
        required: [true, `Last name is required`]
    },
    email: {
        type: String,
        required: [true, `Email is required`],
        unique: true
    },
    password: {
        type: String,
        required: [true, `Password is required`]
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})




//export the model
module.exports = mongoose.model(`User`, userSchema);
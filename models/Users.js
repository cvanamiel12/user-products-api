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
    },
    orders: [
        {
            userId: {
                type: String,
                required: [true, `userId is required`]
            },
            productId: {
                type: String,
                required: [true, `userId is required`]
            },
            totalAmount: {
                type: Number,
                required: [true, `Total amount is required`]
            }
           
        }
    ]
})




//export the model
module.exports = mongoose.model(`User`, userSchema);
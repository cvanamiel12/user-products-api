const mongoose = require('mongoose')

//schema
const productSchema = new mongoose.Schema ({
    productName: {
        type: String,
        required: [true, `First name is required`]
    },
    description: {
        type: String,
        required: [true, `Course description is required`]
    },
    price: {
        type: Number,
        required: [true, `Price is required`]
    },
    isOffered: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    }

})




//export the model
module.exports = mongoose.model(`Product`, productSchema);
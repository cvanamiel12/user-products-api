const mongoose = require('mongoose')

//schema
const orderSchema = new mongoose.Schema ({
    totalAmount: {
        type: Number,
        required: [true, `Total amount is required`]
    },
    purchasedOn: {
        type: Date,
        default: new Date()
    },
    userId: {
        type: String,
        required: [true, `User ID is required`]
    },
    productId: {
        type: String,
        required: [true, `Product ID is required`]
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
    // transactions:[{
    //     productId: {
    //         type: String,
    //         required: [true, `Product ID is required`]
    //     }
    // }]

})




//export the model
module.exports = mongoose.model(`Order`, orderSchema);
const Order = require ('./../models/Orders')
const Product = require ('./../models/Products')
const User = require('./../models/Users')
const {createToken} = require('./../auth');


//create order
module.exports.createOrder = async (data) => {

    const {userId, productId} = data
    //console.log("dataone", data)

    let price = await Product.findById(productId).then(result => {
        return result.price
    })
    //console.log("price", price)
    
    const newOrder = new Order({
        userId: userId,
        productId: productId,
        totalAmount: price

    })

   
    // return result
    
    return await newOrder.save().then (result => {
	// 	if(result){
	// 		return true
	// 	} else {
	// 		if(result == null){
	// 			return false
	// 		}
	// 	}
	// })
        //console.log("result", result)
      
        result.orders.push({userId: userId, productId: productId, totalAmount: price})
        return result.save()
        .then(order => order ? `Order added` : false)
    })


}


//get all orders
module.exports.getAllOrders = async () => {
    return await Order.find().then(result => result)
}

//retrieve authenticated user's orders
module.exports.getAnOrder = async () => {
    return await Order.findById(id).then((result, err) => {
        if (result) {
            return result
        } else {
            if (result == null) {
                return {message: `Order not found`}
            } else {
                return err
            }
        }
    })
}
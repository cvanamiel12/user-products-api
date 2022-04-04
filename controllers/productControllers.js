const Product = require ('./../models/Products')
const {createToken} = require('./../auth');

//get all products
module.exports.getAllProducts = async () => {
    return await Product.find().then(result => result)
}



//create a product  (admin only)

module.exports.create = async(reqBody) => {
    const {productName, description, price} = reqBody

let newProduct = new Product ({
    productName: productName,
    description: description,
    price: price
})

    return await newProduct.save().then((result, err) => result ? result :err)


}


//update product info (admin only)
module.exports.updateProduct = async (productId, reqBody) => {

	return await Product.findByIdAndUpdate(productId, {$set: reqBody}, {new:true}).then(result => result)
}

//archive product admin only
module.exports.archiveProduct = async (productId) => {

    return await Product.findByIdAndUpdate(productId, {$set: {isOffered: false}}, {new:true}).then(result => result)
}

//unarchive prduct
module.exports.unarchiveProduct = async (productId) => {

    return await Product.findByIdAndUpdate(productId, {$set: {isOffered: true}}, {new:true}).then(result => result)
}


//isOffered
module.exports.activeProducts = async () => {

	return await Product.find({isOffered:true}).then(result => result)
}

//delete
module.exports.deleteProduct = async (productId) => {

	return await Product.findByIdAndDelete(productId).then((result, err) => result ? true : err)
}

const express = require('express');
const router = express.Router();
const {verify, decode, verifyAdmin} = require('./../auth');

const {
    createOrder,
    getAllOrders,
    getAnOrder

} = require ('./../controllers/orderControllers')


//non-admin user checkout (create order)
router.post('/create', async (req, res) => {

    const data = {
        userId: req.body.userId,
        productId: req.body.productId,

    }
    //console.log("data",data)
    try {
        await createOrder(data).then(result => res.send (result))
    }catch (err) {
        res.status(500).json(err)
    }


})



//retrieve all orders (admin only)
router.get('/', verify, async (req, res) => {
    try {
        await getAllOrders().then(result => res.send(result))
    } catch (err) {
        res.status(500).json(err)
    }
})




//retrieve authenticated user's orders
router.get('/:orderId', async (req, res) => {

//console.log(req.params.orderId)

try {
    await getAnOrder(req.params.orderId).then(result => res.send (result))
    //console.log(result)

} catch(err){
    res.status(500).json(err)
}
})




module.exports = router
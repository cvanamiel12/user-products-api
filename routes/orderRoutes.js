const express = require('express');
const router = express.Router();

const {
    createOrder

} = require ('./../controllers/orderControllers')


//non-admin user checkout (create order)
router.post('/create', async (req, res) => {

    const data = {
        userId: req.body.userId,
        productId: req.body.productId,

    }
    console.log("data",data)
    try {
        await createOrder(data).then(result => res.send (result))
    }catch (err) {
        res.status(500).json(err)
    }


})




//retrieve authenticated user's orders





//retrieve all orders (admin only)








module.exports = router
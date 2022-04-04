const express = require('express');
const router = express.Router();

const {
    getAllProducts,
    create,
    updateProduct,
    archiveProduct,
    unarchiveProduct,
    activeProducts,
    deleteProduct


} = require('./../controllers/productControllers')

const {verify, decode, verifyAdmin} = require('./../auth');



//get all products
router.get('/', verify, async (req, res) => {
    try {
        await getAllProducts().then(result => res.send(result))
    } catch (err) {
        res.status(500).json(err)
    }
})



//get a single product 


//isOffered
router.get('/isOffered', verify, async (req, res) => {
	try{
		await activeProducts().then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})



//crete a product (admin only)
router.post('/create', verifyAdmin, async (req, res) => {
    try {
        create(req.body).then(result => res.send(result))
    } catch(err) {
        res.status(500).json(err)
    }
})






//update product info (admin only)
router.put('/:productId/update', verifyAdmin, async (req, res) => {
    //console.log(req.params.productId)

    try {
        await updateProduct(req.params.productId, req.body).then(result => res.send(result))
    }catch (err) {
        res.status(500).json(err)
    }

})



//archive product (admin only)
router.patch('/:productId/archive', verifyAdmin, async (req, res) => {

    try {
        await archiveProduct(req.params.productId).then (result => res.send(result))
    } catch (err){
        res.status(500).json(err)
    }
})


//unarchive
router.patch('/:productId/unarchive', verifyAdmin, async (req, res) => {

    try {
        await unarchiveProduct(req.params.productId).then (result => res.send(result))
    }catch (err) {
        res.status(500).json(err)
    }
})

//delete
router.delete('/:productId/delete-product', verifyAdmin, async (req, res) => {
	try{
		await deleteProduct(req.params.productId).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})












module.exports = router
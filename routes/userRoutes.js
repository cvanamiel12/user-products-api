const express = require('express');
const router = express.Router();


//import units of functions from userController module
const {
    getAllUsers,
    register,
    login,
    adminStatus


} = require('./../controllers/userControllers')

const {verify, decode, verifyAdmin} = require('./../auth');



//get all users
router.get('/', async (req, res) => {
    try {
        await getAllUsers().then(result => res.send(result))
    } catch (err) {
        res.status(500).json(err)
    }

})


//register a user
router.post('/register', async (req, res) => {
    
    try {
        await register(req.body).then(result => res.send (result))
    }catch (err) {
        res.status(500).json(err)
    }

})

//login the user
    //authentication phase
router.post('/login', (req, res) => {
    //console.log(req.body)
    try {
        login(req.body).then(result => res.send(result))
    }catch(err){
        res.status(500).json(error)
    }
})

//set user as admin (admin only)
router.patch('/isAdmin', verifyAdmin, async (req, res) => {
	try{
		await adminStatus(req.body).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}

})







module.exports = router

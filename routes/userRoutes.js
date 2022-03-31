const express = require('express');
const router = express.Router();


//import units of functions from userController module
const {
    getAllUsers,
    register,
    login,
    adminStatus,
    profile,
    checkEmail


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

//CHECK IF EMAIL ALREADY EXISTS
router.post('/email-exists', async (req, res) => {
	try{
		await checkEmail(req.body).then(result => res.send(result))

	}catch(error){
		res.status(500).json(error)
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

//RETRIEVE USER INFORMATION
router.get('/profile', verify, async (req, res) => {
	console.log(req.headers.authorization)
	const userId = decode(req.headers.authorization).id
	console.log(userId)

	try{
		profile(userId).then(result => res.send(result))

	}catch(err){
		res.status(500).json(err)
	}
})






module.exports = router

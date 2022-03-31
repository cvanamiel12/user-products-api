const CryptoJS = require("crypto-js");

//import models
const User = require('../models/Users');
const {createToken} = require('./../auth');



//get all users
module.exports.getAllUsers = async () => {
    return await User.find().then(result => result)
}

//CHECK IF EMAIL EXISTS
module.exports.checkEmail = async (reqBody) => {
	const {email} = reqBody

	return await User.findOne({email: email}).then((result, err) =>{
		if(result){
			return true
		} else {
			if(result == null){
				return false
			} else {
				return err
			}
		}
	})
}

//register a user
module.exports.register = async(reqBody) => {
    //console.log(reqBody)

    const  {firstName, lastName, email, password} = reqBody;
    const newUser = new User ({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: CryptoJS.AES.encrypt(password, process.env.SECRET_PASS).toString()
    })

    return await newUser.save().then(result => {
        if (result) {
            return true; 
        } else {
            if (result == null) {
                return false;
            }
        }
    })


}



//login user
module.exports.login = async (reqBody) => {
    return await User.findOne({email: reqBody.email}).then((result, err) => {
        if(result == null){
            return {message: `User does not exist.`}
        } else {
            if (result !== null){
                const decryptedPw = CryptoJS.AES.decrypt(result.password, process.env.SECRET_PASS).toString(CryptoJS.enc.Utf8);
                console.log(reqBody.password == decryptedPw)
                //check if pw is correct
                if(reqBody.password == decryptedPw){
                    //create a token for user
                    return{token: createToken(result)}
                } else {
                    return {auth: `Auth Failed!`}
                } 
                
            } else {
                return err
            }
        }
    })
}

//set user as admin (admin only)
module.exports.adminStatus = async (reqBody) => {
	const {email} = reqBody

	return await User.findOneAndUpdate({email: email}, {$set: {isAdmin: true}}, {new:true}).then((result, err) => result ? true : err)
}


//RETRIEVE USER INFORMATION
module.exports.profile = async (id) => {

	return await User.findById(id).then((result, err) => {
		if(result){
			return result
		}else{
			if(result == null){
				return {message: `user does not exist`}
			} else {
				return err
			}
		}
	})
}

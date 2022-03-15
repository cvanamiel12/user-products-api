const jwt = require('jsonwebtoken');


//sign
module.exports.createToken = (data) => {
    let userData = {
        id: data._id,
        email: data.email,
        isAdmin: data.isAdmin
    }
    return jwt.sign(userData, process.env.SECRET_PASS);
    

}

//verify

module.exports.verify = (req, res, next) => {
    const requestToken = req.headers.authorization
    //console.log(requestToken)


    if (typeof requestToken == "undefined") {
        res.status(401).send(`Token missing`)

    }else {
         //to remove the word 'bearer'
        const token = requestToken.slice(7, requestToken.length);
        //console.log(token);

        if (typeof token !== "undefined") {
            return jwt.verify(token, process.env.SECRET_PASS, (err, data) => {
                if (err) {
                    return res.send({auth:`auth failed`})

                }else{
                    //next() is after the verify function in userRoutes, which is async
                    next()
                }
            })
        }
    }
}

//decode
module.exports.decode = (bearerToken) => {
    const token = bearerToken.slice(7, bearerToken.length)
    //console.log(token)
    
    return jwt.decode(token);
}


//isAdmin access
module.exports.verifyAdmin = (req, res, next) => {
	const requestToken = req.headers.authorization
	// console.log(requestToken)
	
	if(typeof requestToken == "undefined"){
		res.status(401).send(`Token missing`)

	}else{
		const token = requestToken.slice(7, requestToken.length);
		// console.log(token)

		if(typeof token !== "undefined"){
			const admin = jwt.decode(token).isAdmin

			if(admin){
				return jwt.verify(token, process.env.SECRET_PASS, (err, data) => {
					if(err){
						return res.send({auth: `auth failed!`})

					} else{
						next()
					}
				})
			} else {
				res.status(403).send(`You are not authorized.`)
			}
			
		}
	}
}
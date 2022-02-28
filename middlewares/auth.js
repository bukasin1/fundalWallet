const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const days = process.env.JWT_DAYS
const db = require("../models"); // models path depend on your structure
const Users = db.users;

exports.signToken = (id, admin) => {
    return jwt.sign({ id, admin }, secret, {
        expiresIn: days,
    });
}

exports.authToken = async(req, res, next) => {
    try{
        console.log('entered auth')
        const token = req.cookies.fundalWalletToken
        if(token){
            const decoded = jwt.verify(token, secret)

            const user = await Users.findByPk(decoded.id)
            if (!user) {
                throw {
                    message : "Not authenticated"
                }
            }
            req.token = token
            req.user = user 
    
            next()
        }else{
            throw {
                message : "Not authenticated"
            }
        }
    }catch(error){
        console.log("auth error")
        res.status(301).send({
            error: "Auth error",
            message: `${error.message}`
        })
    }
}
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const loginRequired = async (req, res, next) => {
    const token = req.cookies['access-token']
    if(token){
        const validToken = await jwt.verify(token, process.env.JWT_SECRET)
        if(validToken){
            res.user = validToken.id
            next()
        }
        else{
            console.log('token expires')
            res.redirect('/user/login')
        }
    }
    else{
        console.log('token not found')
        res.redirect('/user/login')
        }    
    }
module.exports = loginRequired
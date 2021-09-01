const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const requireAuth = (req, res, next) =>{

    const token = req.cookies.jwt;


    //check jwt exists and is verified
    if(token){
        jwt.verify(token, jwtSecret, (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            } else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login');
    }
}

module.exports = { requireAuth };
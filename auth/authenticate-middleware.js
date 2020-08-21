const jwt = require('jsonwebtoken')
const secrets = require('../utils/secrets')

module.exports = (req, res, next) => {

  const token = req.headers.authorization
  if(token){
    jwt.verify(token, secrets.secret_JWT, (error, decodedToken)=>{
      if(error){
        //token not valid or was modified
        res.status(401).json({message: 'Token not valid'})
      } else {
        //token is good and we have info
        req.jwt = decodedToken // add token data to req obj

        next()
      }
    })
  } else {
    res.status(401).json({message: 'please provide credentials'})
  }
};

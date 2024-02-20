const { jwt_secret } = require("./config");
const jwt = require("jsonwebtoken");

function authMiddleware(req,res,next){
    const token=req.headers['authorization']
    const words=token.split(" ")
    const jwtToken=words[2]
    console.log(jwtToken);

    try {
        const decodedValue=jwt.verify(jwtToken,jwt_secret);

        //whenever you get the username, put that into the request object.
        req.email=decodedValue.email
        req.id=decodedValue.id
        next()
    } catch (error) {
        return res.status(403).json({msg:"Authentication Failed!"})
    }
}

module.exports={
    authMiddleware
}
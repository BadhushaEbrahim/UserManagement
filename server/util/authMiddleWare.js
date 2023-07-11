const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")


const protect = asyncHandler((async(req,res,next)=>{
   try {
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        let token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decodec = jwt.verify(token,"secret123")
        console.log(decodec);
        next()
    }else{
        res.status(401).json("Token Not Found")
    }
   } catch (error) {
    console.log(error);
    res.status(401).json("Invalid Token")
   }
}))

module.exports = protect;
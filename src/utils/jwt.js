import jwt from "jsonwebtoken"

export const JWT_PRIVATE_KEY = "secreto"

export const createToken = (user) => jwt.sign(user, JWT_PRIVATE_KEY, {expiresIn:"24h"})

export const authenticationToken = (req, res, next) => {
    const authHeader = req.header["authorization"]
    if(!authHeader) res.status(401).json({status: "error", err: "not authenticated" }) 
     const token = authHeader.split(" ")[1]
    jwt.verify(token, JWT_PRIVATE_KEY, (err, userDecoded)=>{
        if(err) res.status(401).json({status: "error", err: "not authenticated" })
        req.user = userDecoded
    next()
    })

}
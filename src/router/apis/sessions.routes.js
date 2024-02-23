import { Router } from 'express'
import UserDaoMongo from '../../daos/Mongo/userDaoMongo.js'
import { IsValidPassword, createHash } from '../../utils/hashpassword.js'
import { createToken } from '../../utils/jwt.js'
import passportCall from '../../passport-jwt/passportCall.middleware.js'
import authorization from '../../passport-jwt/authorization.middleware.js'


const sessionsRouter = Router()
const userManager = new UserDaoMongo

sessionsRouter.post("/register", async (req, res) => {
  const {first_name, last_name, email, password} = req.body
  const user = await userManager.getUser({email})
  if(user) res.status(401).send({status:"error", message: "Usuario Ya Existente"})
  const newUser = {
first_name,
last_name,
email,
password: createHash(password)
}

const result = await userManager.createUser(newUser)
const token = createToken({
  id : result._id 
})

res.cookie("token", token, {
  maxAge: 60*60*1000*24,
  httpOnly: true
}).send({
  status: "succes",
  message: "register succes",
  payload: result
})

})


sessionsRouter.post("/login", async (req, res) => {
  const {email, password} = req.body
  const user = await userManager.getUser({email})
  if(!user) res.status(401).send({status:"error", message: "Usuario No Existente"})
  
  if(!IsValidPassword(password, {password: user.password })) res.status(401).send({status:"error", message: "Contraseña Incorrecta"})

  const token = createToken({
    id : user._id,
    email: user.email,
    role: user.role
  })
  
  res.cookie("token", token, {
    maxAge: 60*60*1000*24,
    httpOnly: true
  }).send({
    status: "succes",
    message: "login succes"
  })
})


sessionsRouter.post("/logout", (req, res) => {
  res.send("exit logout")
})

sessionsRouter.get("/current", [passportCall("jwt"), authorization(["USER"])] ,(req, res) => {
  res.send("datos sensibles")
})
    



export default sessionsRouter

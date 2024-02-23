 const authorization = roleArray => {
    return async (req, res, next) => {
        try{
            if(!req.user) return res.status(401).send({status: "error", message: "unauthorized"})
          //  if(req.use.role.toUpperCase() === role) return res.status(403).send({status:"error", message: "not permissions"})
            if(!roleArray.includes(req.user.role.toUpperCase())) return res.status(403).send({status:"error", message: "not permissions"})
next()
        } catch (error) {
next(error)
        }
    }
}
export default authorization
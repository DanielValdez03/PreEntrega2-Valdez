function authentication(req, res, next) {
     
    if(req.session.username !== 'fede' || !req.session.admin ) {
        return res.status(401).send('error de autenticación')
    } 
    next()

}

export default authentication
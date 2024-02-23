import passport from "passport"
import passport_jwt from "passport-jwt"

const JSWstrategy = passport_jwt.Strategy
const ExtractJWT = passport_jwt.ExtractJwt

const initializePassport = () => {
    const cookieExtractor = (req) => {
        let token = null
        if(req && req.cookies){
            token = req.cookies["token"]
        } 
        return token
       }

    passport.use("jwt", new JSWstrategy({
jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
secretOrKey: "secreto"
    }, async (jwt_payload, done)=>{
        console.log("jwt passport config: ", jwt_payload )
        return done(null, jwt_payload)
    }))
}
export default initializePassport

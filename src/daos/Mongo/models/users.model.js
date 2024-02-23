import {model, Schema} from "mongoose";
import moongoosePaginate from "mongoose-paginate-v2"
const usersCollection = "Users"
const usersSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["user", 'user_premium', "admin"],
        default: "user"
    }

})
usersSchema.plugin(moongoosePaginate)
const usersModel = model(usersCollection, usersSchema)

export default usersModel
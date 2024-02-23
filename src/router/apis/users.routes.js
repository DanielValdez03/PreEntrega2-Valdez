import { Router } from "express";
import UserController from "../../controllers/users.controller.js";

const userRouter = Router()
const {
    getUser,
    createUser,
    updateUser,
    deleteUser
} = new UserController()

userRouter.get("/", getUser)

userRouter.post('/', createUser)

userRouter.put('/:uid', updateUser)

userRouter.delete('/:uid', deleteUser)

export default userRouter

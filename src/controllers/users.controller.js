import UserDaoMongo from "../daos/Mongo/userDaoMongo.js";
import { UserDto } from "../dtos/userDto.js";
import { createHash } from "../utils/hashpassword.js";

class UserController {
  constructor() {
    this.userManager = new UserDaoMongo()
  }

  getUser = async (req, res) => {
    const users = await this.userManager.get();
    res.send({
      status: "succes",
      payload: users,
    });
  };

  createUser = async (req, res) => {
    let {first_name, last_name, email, password} = req.body
   password =  createHash(password)
    const newUser = new UserDto({first_name, last_name, email, password})
    console.log(newUser)
    const result = await this.userManager.create(newUser);
    res.status(201).send({
      status: "succes",
      payload: result,
    });
  };

  updateUser = async (req, res) => {
    const { uid } = req.params;
    const userUpdate = req.body;
    const result = await this.userManager.update({ _id: uid }, userUpdate);
    res.status(201).send({
      status: "succes",
      payload: result,
    });};

    deleteUser = async (req, res) => {
      const { userId } = req.params;
      const userEliminate = await this.userManager.delete({ _id: userId })
      res.status(200).send({ message: "Usuario borrado", payload: userEliminate });
    };
  
}

export default UserController;

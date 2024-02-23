import usersModel from "./models/users.model.js";

class UserDaoMongo {
  constructor() {
    this.usersModel = usersModel;
  }
  getsUserPaginate = async (limit = 10, page = 1) =>
    await this.usersModel.paginate({}, { limit, page, lean: true });
  get = async() => await this.usersModel.find({});
  getBy = async (filter) => await this.usersModel.findOne(filter);
  create = async (newUser) => await this.usersModel.create(newUser);
  update = async (uid, newUser) =>
    await this.usersModel.updateOne({ _id: uid }, newUser);
  delete = async (uid) => await this.usersModel.deleteOne({ _id: uid });
}

export default UserDaoMongo

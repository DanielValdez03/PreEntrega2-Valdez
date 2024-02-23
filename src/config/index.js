import dotenv from "dotenv";
import program from "../utils/commander.js";
import { MongoSingleton } from "../utils/mongoSingleton.js";

const {mode} = program.opts()
console.log("Mode Config:", mode)
dotenv.config({
  path: mode === "production" ? "./.env.production" : "./.env.development"
})

export const configObject = {
  PORT: process.env.PORT || 8080,
  mongo_url: process.env.MONGO_URL,
  jwt_secret_key:process.env.JWT_SECRET_KEY
}
// Conexión con Mongo Atlas
export const connectDB = async () => {
 // await connect(
 //   process.env.MONGO_URL
 // );
 MongoSingleton.getInstance(process.env.MONGO_URL)
 // console.log("base de datos conectada");
};



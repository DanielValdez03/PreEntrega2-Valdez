// Importamos Express
import express from "express";
import { engine } from "express-handlebars";
import * as path from "path";
import __dirname from "./utils.js";
import { configObject, connectDB } from "./config/index.js";
import viewsRouter from "./router/views.routes.js";
import appRouter from "./router/apis/index.routes.js";
import cookies from "cookie-parser";
import session, { Session } from "express-session";
import MongoStore from "connect-mongo"
import initializePassport from "./passport-jwt/passport.config.js";
import passport from "passport";
import cors from "cors"
// Instanciamos la app de Express con la que manejaremos el servidor
const app = express();
// puerto donde correrá nuestro servidor
const puerto = configObject.PORT;
// Conexion a Atlas
connectDB();

// Le decimos a nuestra app que utilizaremos el formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "views"));
app.use("/", express.static(__dirname + "/public"));
initializePassport()
app.use(passport.initialize())

app.use(cookies());
app.use(session({
     store: MongoStore.create({
       mongoUrl: "mongodb+srv://daniagus1612:racingclub32@cluster0.qnozhpb.mongodb.net/c55625?retryWrites=true&w=majority",
       mongoOptions:{
         useNewUrlParser: true,
         useUnifiedTopology: true
       }
     }),
    secret: 'secreto',
    saveUninitialized: true,
    resave: false,
  })
);
app.use(cors())

app.use("/", viewsRouter);
app.use("/", appRouter);



const server = app.listen(puerto, () => {
  console.log(`Servidor funcionando en puerto: ${puerto} `);
});

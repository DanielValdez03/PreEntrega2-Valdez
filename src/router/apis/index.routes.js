import { Router } from "express";
import productRouter from "./products.routes.js";
import cartRouter from "./carts.routes.js";
import sessionsRouter from "./sessions.routes.js";
import userRouter from "./users.routes.js";
const appRouter = Router();

appRouter.use("/api/products", productRouter);
appRouter.use("/api/carts", cartRouter);
appRouter.use("/api/users", userRouter);
appRouter.use("/api/sessions", sessionsRouter);

export default appRouter;

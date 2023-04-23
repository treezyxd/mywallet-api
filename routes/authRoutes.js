import { Router } from "express";
import userValidate from "../middlewares/userValidate";

const authRouter = Router();

authRouter.post("/", loginUser);
authRouter.post("/cadastro", signUpUser);

export default authRouter;
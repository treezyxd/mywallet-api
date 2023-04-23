import { Router } from "express";
import { signUpUser, loginUser } from "../controllers/AuthController.js";
import { loginUserSchema, registerUserSchema } from "../schemas/authSchemas.js";
import userValidate from "../middlewares/userValidate.js";

const authRouter = Router();

authRouter.post("/", userValidate(loginUserSchema), loginUser);
authRouter.post("/cadastro", userValidate(registerUserSchema), signUpUser);

export default authRouter;
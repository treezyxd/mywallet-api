import { Router } from "express";
import { entryTransaction, getTransactions } from "../controllers/ActionControllers.js";
import { sessionValidate } from "../middlewares/sessionValidate.js";
import userValidate from "../middlewares/userValidate.js";
import { entryTransactionSchema } from "../schemas/actionSchemas.js"

const actionRouter = Router();

actionRouter.get("/home", sessionValidate, getTransactions);
actionRouter.post("/nova-entrada", sessionValidate, userValidate(entryTransactionSchema), entryTransaction);

export default actionRouter;
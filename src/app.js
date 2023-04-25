import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import actionRouter from "./routes/actionRoutes.js";
import authRouter from "./routes/authRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(actionRouter);
app.use(authRouter);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
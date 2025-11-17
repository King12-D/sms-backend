import express from "express";
import { createServer } from "http";
import authRouter from "./modules/auth/auth.routes";
import { appRouter } from "./modules/routes";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Authentication routes
app.use("/api/v1", appRouter);

app.get("/health", (_, res) => {
  res.status(200).json({ message: "Server is healthy" });
});
export default server;

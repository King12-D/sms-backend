import express from "express";
import { createServer } from "http";
import { connectDB } from "./common/db";
import authRouter from "./modules/auth/auth.routes";

connectDB();

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", authRouter);
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server runing on PORT ${PORT}`);
});

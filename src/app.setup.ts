import express from "express";
import cors from "cors";
import { createServer } from "http";
import { appRouter } from "./modules/routes";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Allow frontend access
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Authentication routes
app.use("/api/v1", appRouter);

app.get("/health", (_, res) => {
  res.status(200).json({ message: "Server is healthy" });
});
export default server;

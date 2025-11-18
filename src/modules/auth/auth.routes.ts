import express from "express";
import { login, signUp } from "./auth.controller";

const router = express.Router();

router.post("/create", signUp);
router.post("/login", login);

export const authRoute = router;
